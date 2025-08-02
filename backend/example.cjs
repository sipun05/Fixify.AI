const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { MessagingResponse } = require('twilio').twiml;
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Environment variables (you should set these in your .env file)
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || 'your_twilio_account_sid';
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || 'your_twilio_auth_token';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'your_gemini_api_key';

// Contact numbers for notifications
const NEARBY_PEOPLE = ['+918555085585', '+919949607909']; // Verification contacts
const TECHNICIAN_NUMBER = '+918341140216'; // Technician contact

// Function to format phone number for WhatsApp
function formatWhatsAppNumber(phoneNumber) {
  // Remove any existing whatsapp: prefix
  let cleanNumber = phoneNumber.replace('whatsapp:', '');

  // Ensure it starts with +
  if (!cleanNumber.startsWith('+')) {
    cleanNumber = '+' + cleanNumber;
  }

  return cleanNumber;
}

// Initialize Twilio client
const twilio = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// Function to download image and convert to buffer
async function downloadImageAsBuffer(imageUrl) {
  try {
    const response = await axios.get(imageUrl, {
      auth: {
        username: TWILIO_ACCOUNT_SID,
        password: TWILIO_AUTH_TOKEN
      },
      responseType: 'arraybuffer'
    });

    return Buffer.from(response.data);
  } catch (error) {
    console.error('Error downloading image:', error);
    throw error;
  }
}

// Function to analyze image using Gemini Flash
async function analyzeImageWithGemini(imageBuffer, mimeType = 'image/jpeg') {
  try {
    // Convert buffer to base64
    const base64Image = imageBuffer.toString('base64');

    // Ensure we have a valid mime type
    const validMimeType = mimeType.startsWith('image/') ? mimeType : 'image/jpeg';

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `Analyze this image and classify it into one of these categories:
              1. CIVIL - Construction issues, building problems, road damage, structural issues, cracks in walls/buildings, potholes, broken pavements
              2. ELECTRICAL - Power lines, electrical equipment, wiring issues, transformers, electrical hazards, broken poles, electrical faults
              3. WATER - Plumbing issues, water leaks, drainage problems, water supply issues, sewage problems, broken pipes, water logging
              4. NO_ISSUE - If the image shows no infrastructure problems, normal conditions, or unrelated content

              Respond with only the category name (CIVIL, ELECTRICAL, WATER, or NO_ISSUE) followed by a brief description of what you see in the image.
              Format: CATEGORY: Description

              Important: Only classify as CIVIL, ELECTRICAL, or WATER if there is a clear problem or issue visible. If everything looks normal or there are no infrastructure issues, use NO_ISSUE.`
            },
            {
              inline_data: {
                mime_type: validMimeType,
                data: base64Image
              }
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.1,
        topK: 32,
        topP: 1,
        maxOutputTokens: 300,
      }
    };

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data.candidates && response.data.candidates[0] && response.data.candidates[0].content) {
      return response.data.candidates[0].content.parts[0].text;
    } else {
      throw new Error('No valid response from Gemini API');
    }
  } catch (error) {
    console.error('Gemini API Error:', error.response?.data || error.message);
    return 'ERROR: Unable to analyze image';
  }
}

// Function to send notification to nearby people for verification
async function notifyNearbyPeople(category, description, location, imageUrl, reporterNumber) {
  const notifications = [];

  for (const phoneNumber of NEARBY_PEOPLE) {
    try {
      console.log(`📤 Attempting to send notification to ${phoneNumber}...`);

      let locationText = 'Location not available';
      if (location && location.latitude && location.longitude) {
        locationText = `📍 Location: ${location.latitude}, ${location.longitude}\n🗺️ Maps: https://maps.google.com/?q=${location.latitude},${location.longitude}`;
      }

      const message = `🚨 **ISSUE VERIFICATION NEEDED**\n\n` +
                     `📋 **Category:** ${category}\n` +
                     `🔍 **Issue:** ${description}\n` +
                     `📞 **Reported by:** ${reporterNumber}\n\n` +
                     `${locationText}\n\n` +
                     `📸 **Photo:** ${imageUrl}\n\n` +
                     `✅ **Action Required:**\n` +
                     `Please verify this issue and confirm if it needs immediate attention.\n\n` +
                     `Reply with:\n` +
                     `• "VERIFIED" - Issue confirmed\n` +
                     `• "FALSE" - Not a real issue\n` +
                     `• "URGENT" - Needs immediate attention`;

      console.log(`📝 Message content: ${message.substring(0, 100)}...`);
      console.log(`📞 From: whatsapp:+14155238886`);
      console.log(`📞 To: whatsapp:${phoneNumber}`);

      const result = await twilio.messages.create({
        body: message,
        from: 'whatsapp:+14155238886', // WhatsApp Sandbox number
        to: `whatsapp:${formatWhatsAppNumber(phoneNumber)}`
      });

      notifications.push({ phone: phoneNumber, status: 'sent', sid: result.sid });
      console.log(`✅ Notification sent successfully to ${phoneNumber}, SID: ${result.sid}`);
    } catch (error) {
      console.error(`❌ Failed to send notification to ${phoneNumber}:`);
      console.error(`   Error code: ${error.code}`);
      console.error(`   Error message: ${error.message}`);
      console.error(`   Full error:`, error);
      notifications.push({ phone: phoneNumber, status: 'failed', error: error.message, code: error.code });
    }
  }

  return notifications;
}

// Function to assign technician
async function assignTechnician(category, description, location, imageUrl, reporterNumber) {
  try {
    console.log(`👨‍🔧 Attempting to assign technician ${TECHNICIAN_NUMBER}...`);

    let locationText = 'Location not available';
    if (location && location.latitude && location.longitude) {
      locationText = `📍 Location: ${location.latitude}, ${location.longitude}\n🗺️ Maps: https://maps.google.com/?q=${location.latitude},${location.longitude}`;
    }

    let categoryEmoji = '🔧';
    let specialization = 'General';

    switch (category.toUpperCase()) {
      case 'CIVIL':
        categoryEmoji = '🏗️';
        specialization = 'Civil Engineering';
        break;
      case 'ELECTRICAL':
        categoryEmoji = '⚡';
        specialization = 'Electrical';
        break;
      case 'WATER':
        categoryEmoji = '💧';
        specialization = 'Plumbing/Water';
        break;
    }

    const message = `${categoryEmoji} **WORK ASSIGNMENT - ${specialization.toUpperCase()}**\n\n` +
                   `👨‍🔧 **Technician Assignment**\n` +
                   `You have been assigned to handle this ${category.toLowerCase()} issue.\n\n` +
                   `📋 **Issue Details:**\n` +
                   `• Category: ${category}\n` +
                   `• Problem: ${description}\n` +
                   `• Reported by: ${reporterNumber}\n\n` +
                   `${locationText}\n\n` +
                   `📸 **Issue Photo:** ${imageUrl}\n\n` +
                   `⚠️ **Action Required:**\n` +
                   `1. Review the issue details and photo\n` +
                   `2. Contact the reporter if needed\n` +
                   `3. Visit the location to assess the problem\n` +
                   `4. Report back with status updates\n\n` +
                   `📞 **Need help?** Reply with "SUPPORT" for assistance.\n` +
                   `✅ **Accept job?** Reply with "ACCEPT" to confirm assignment.`;

    console.log(`📝 Technician message content: ${message.substring(0, 100)}...`);
    console.log(`📞 From: whatsapp:+14155238886`);
    console.log(`📞 To: whatsapp:${TECHNICIAN_NUMBER}`);

    const result = await twilio.messages.create({
      body: message,
      from: 'whatsapp:+14155238886', // WhatsApp Sandbox number
      to: `whatsapp:${formatWhatsAppNumber(TECHNICIAN_NUMBER)}`
    });

    console.log(`✅ Work assignment sent successfully to technician ${TECHNICIAN_NUMBER}, SID: ${result.sid}`);
    return { status: 'sent', sid: result.sid, technician: TECHNICIAN_NUMBER };
  } catch (error) {
    console.error(`❌ Failed to assign technician ${TECHNICIAN_NUMBER}:`);
    console.error(`   Error code: ${error.code}`);
    console.error(`   Error message: ${error.message}`);
    console.error(`   Full error:`, error);
    return { status: 'failed', error: error.message, code: error.code, technician: TECHNICIAN_NUMBER };
  }
}

// Function to extract location from message (if provided)
function extractLocation(message) {
  // Look for GPS coordinates in the message
  const gpsRegex = /(-?\d+\.?\d*),\s*(-?\d+\.?\d*)/;
  const match = message.match(gpsRegex);

  if (match) {
    return {
      latitude: parseFloat(match[1]),
      longitude: parseFloat(match[2])
    };
  }

  return null;
}





// Main webhook handler
app.post('/webhook', async (req, res) => {
  const twiml = new MessagingResponse();

  try {
    const message = req.body.Body;
    const from = req.body.From;
    const numMedia = parseInt(req.body.NumMedia) || 0;
    const latitude = req.body.Latitude;
    const longitude = req.body.Longitude;

    console.log(`WhatsApp message from ${from}: ${message}`);
    console.log(`Number of media attachments: ${numMedia}`);

    if (numMedia > 0) {
      // Handle image message
      const mediaUrl = req.body.MediaUrl0;
      const mediaContentType = req.body.MediaContentType0;

      console.log(`Received media: ${mediaContentType} from ${mediaUrl}`);

      if (mediaContentType && mediaContentType.startsWith('image/')) {
        try {
          // Send immediate acknowledgment
          twiml.message('📸 Image received! Analyzing the problem type... Please wait a moment.');

          // Download image and analyze with Gemini Flash
          let analysisResult;
          try {
            console.log('Downloading image and converting to buffer...');
            const imageBuffer = await downloadImageAsBuffer(mediaUrl);
            console.log('Analyzing image with Gemini Flash...');
            analysisResult = await analyzeImageWithGemini(imageBuffer, mediaContentType);
          } catch (error) {
            console.error('Gemini analysis failed:', error);
            analysisResult = 'ERROR: Unable to analyze image';
          }

          // Parse the analysis result
          const [category, ...descriptionParts] = analysisResult.split(':');
          const description = descriptionParts.join(':').trim();

          // Extract location from GPS data or message
          let location = null;
          if (latitude && longitude) {
            location = {
              latitude: parseFloat(latitude),
              longitude: parseFloat(longitude)
            };
            console.log(`📍 GPS location received: ${latitude}, ${longitude}`);
          } else {
            location = extractLocation(message || '');
            if (location) {
              console.log(`📍 Location extracted from message: ${location.latitude}, ${location.longitude}`);
            }
          }

          // Create response message based on category
          let responseMessage = '';
          let emoji = '';

          switch (category.trim().toUpperCase()) {
            case 'CIVIL':
              emoji = '🏗️';
              responseMessage = `${emoji} **CIVIL ENGINEERING ISSUE DETECTED**\n\n` +
                              `📋 **Category:** Construction/Structural Problem\n` +
                              `🔍 **Analysis:** ${description}\n\n` +
                              `✅ **Actions Taken:**\n` +
                              `• Issue categorized as civil engineering problem\n` +
                              `• Nearby people notified for verification\n` +
                              `• Civil engineer assigned to your case\n` +
                              `• You will receive updates on repair timeline\n\n` +
                              `📞 **Need immediate help?** Reply with "URGENT" for priority handling.`;
              break;

            case 'ELECTRICAL':
              emoji = '⚡';
              responseMessage = `${emoji} **ELECTRICAL ISSUE DETECTED**\n\n` +
                              `📋 **Category:** Electrical/Power Problem\n` +
                              `🔍 **Analysis:** ${description}\n\n` +
                              `⚠️ **Safety Notice:** Please maintain safe distance from electrical equipment\n\n` +
                              `✅ **Actions Taken:**\n` +
                              `• Issue categorized as electrical problem\n` +
                              `• Nearby people notified for verification\n` +
                              `• Qualified electrician assigned to your case\n` +
                              `• Priority given due to safety concerns\n\n` +
                              `🚨 **Emergency?** Reply with "EMERGENCY" for immediate response.`;
              break;

            case 'WATER':
              emoji = '💧';
              responseMessage = `${emoji} **WATER/PLUMBING ISSUE DETECTED**\n\n` +
                              `📋 **Category:** Water Supply/Plumbing Problem\n` +
                              `🔍 **Analysis:** ${description}\n\n` +
                              `✅ **Actions Taken:**\n` +
                              `• Issue categorized as water/plumbing problem\n` +
                              `• Nearby people notified for verification\n` +
                              `• Plumbing specialist assigned to your case\n` +
                              `• Coordinating with water department if needed\n\n` +
                              `💧 **Water shortage?** Reply with "SHORTAGE" for priority handling.`;
              break;

            case 'NO_ISSUE':
              emoji = '✅';
              responseMessage = `${emoji} **NO INFRASTRUCTURE ISSUE DETECTED**\n\n` +
                              `📋 **Analysis Result:** No Problem Found\n` +
                              `🔍 **Details:** ${description}\n\n` +
                              `✅ **Good News!**\n` +
                              `• No infrastructure problems detected in the image\n` +
                              `• Everything appears to be in normal condition\n` +
                              `• No action required at this time\n\n` +
                              `📸 **Need to report a different issue?** Send another photo.\n` +
                              `📞 **Have concerns?** Reply with "HELP" for assistance.`;

              // For NO_ISSUE, we don't send notifications to nearby people or technician
              // Just send the response to the user and log it
              await twilio.messages.create({
                body: responseMessage,
                from: 'whatsapp:+14155238886',
                to: from
              });

              console.log(`✅ No issue detected for ${from}: ${description}`);
              return; // Exit early, no notifications needed

            default:
              emoji = '🔍';
              responseMessage = `${emoji} **ISSUE ANALYSIS COMPLETE**\n\n` +
                              `📋 **Status:** Image analyzed but category unclear\n` +
                              `🔍 **Analysis:** ${description}\n\n` +
                              `✅ **Actions Taken:**\n` +
                              `• Manual review initiated\n` +
                              `• Nearby people notified for verification\n` +
                              `• Suitable technician will be assigned after review\n` +
                              `• You'll be contacted within 24 hours\n\n` +
                              `📞 **Need help?** Reply with "HELP" for assistance.`;
          }

          // Send the analysis result to the reporter
          await twilio.messages.create({
            body: responseMessage,
            from: 'whatsapp:+14155238886', // WhatsApp Sandbox number
            to: from
          });

          // Send notifications to nearby people for verification
          console.log('📡 Sending notifications to nearby people...');
          const nearbyNotifications = await notifyNearbyPeople(
            category.trim(),
            description,
            location,
            mediaUrl,
            from
          );

          // Assign technician
          console.log('👨‍🔧 Assigning technician...');
          const technicianAssignment = await assignTechnician(
            category.trim(),
            description,
            location,
            mediaUrl,
            from
          );

          // Log the complete process
          console.log(`✅ Issue processing complete for ${from}:`);
          console.log(`   Category: ${category} - ${description}`);
          console.log(`   Nearby notifications: ${nearbyNotifications.length} sent`);
          console.log(`   Technician assignment: ${technicianAssignment.status}`);

        } catch (error) {
          console.error('Error analyzing image:', error);
          twiml.message('❌ Sorry, there was an error analyzing your image. Please try again or contact support.');
        }
      } else {
        twiml.message('📷 Please send an image of the problem you want to report. We can analyze photos to determine if it\'s a civil, electrical, or water-related issue.');
      }
    } else if (latitude && longitude && !numMedia) {
      // Handle location-only messages
      twiml.message(`📍 **LOCATION RECEIVED**\n\n` +
                   `Thank you for sharing your location!\n` +
                   `📍 Coordinates: ${latitude}, ${longitude}\n` +
                   `🗺️ Maps: https://maps.google.com/?q=${latitude},${longitude}\n\n` +
                   `📸 **Next step:** Please send a photo of the issue you want to report.\n\n` +
                   `Your location will be automatically included with your report.`);
    } else if (message) {
      // Handle text messages
      const messageText = message.toLowerCase().trim();

      if (messageText.includes('help') || messageText.includes('start')) {
        twiml.message(`🤖 **Welcome to Fixify.AI WhatsApp Service!**\n\n` +
                     `📸 **How it works:**\n` +
                     `1. Send a photo of any infrastructure problem\n` +
                     `2. Share your location (optional but recommended)\n` +
                     `3. Our AI will analyze and categorize it as:\n` +
                     `   🏗️ Civil (construction/structural)\n` +
                     `   ⚡ Electrical (power/wiring)\n` +
                     `   💧 Water (plumbing/supply)\n` +
                     `4. Nearby people get notified for verification\n` +
                     `5. Technician gets assigned automatically\n\n` +
                     `📍 **For better service, share your location with the photo!**\n` +
                     `📷 **Send a photo now to get started!**`);
      } else if (messageText.includes('urgent') || messageText.includes('emergency')) {
        twiml.message(`🚨 **PRIORITY REQUEST RECEIVED**\n\n` +
                     `Your case has been marked as urgent. Our team will contact you within 2 hours.\n\n` +
                     `📞 **Emergency Contacts:**\n` +
                     `• Fire: 101\n` +
                     `• Police: 100\n` +
                     `• Medical: 108\n\n` +
                     `Stay safe! 🙏`);
      } else if (messageText.includes('location') || messageText.includes('gps')) {
        twiml.message(`📍 **LOCATION SHARING**\n\n` +
                     `To share your location:\n` +
                     `1. Tap the attachment (📎) button\n` +
                     `2. Select "Location"\n` +
                     `3. Choose "Send your current location"\n\n` +
                     `Or send coordinates in format: latitude,longitude\n` +
                     `Example: 17.4065, 78.4772\n\n` +
                     `📸 Then send your photo for issue reporting!`);
      } else {
        twiml.message(`👋 Hello! I'm Fixify.AI assistant.\n\n` +
                     `📸 Please send a photo of the problem you want to report.\n\n` +
                     `I can identify:\n` +
                     `🏗️ Civil engineering issues\n` +
                     `⚡ Electrical problems\n` +
                     `💧 Water/plumbing issues\n\n` +
                     `📍 **Tip:** Share your location for faster response!\n` +
                     `Type "LOCATION" for help with GPS sharing.\n` +
                     `Type "HELP" for more information.`);
      }
    } else {
      twiml.message('📷 Please send an image of the problem you want to report, or type "HELP" for assistance.');
    }

  } catch (error) {
    console.error('Webhook error:', error);
    twiml.message('❌ Sorry, there was an error processing your request. Please try again.');
  }

  res.type('text/xml').send(twiml.toString());
});

// Health check endpoint
app.get('/health', (_, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
const PORT =  3000;
app.listen(PORT, () => {
  console.log(`🚀 Fixify.AI WhatsApp Bot running on port ${PORT}`);
  console.log(`📱 Webhook URL: http://localhost:${PORT}/webhook`);
  console.log(`🔧 Make sure to configure your Twilio webhook URL`);
});
