const axios = require('axios');
require('dotenv').config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Test function to verify Gemini API integration
async function testGeminiAPI() {
  console.log('🧪 Testing Gemini Flash API Integration\n');
  
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key') {
    console.log('❌ GEMINI_API_KEY not found in .env file');
    console.log('Please run: npm run setup');
    process.exit(1);
  }
  
  // Create a simple test image (1x1 red pixel in base64)
  const testImageBase64 = '/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A8A';
  
  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: `This is a test image. Please respond with "TEST_SUCCESS" if you can see this image.`
          },
          {
            inline_data: {
              mime_type: "image/jpeg",
              data: testImageBase64
            }
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.1,
      topK: 32,
      topP: 1,
      maxOutputTokens: 100,
    }
  };

  try {
    console.log('📡 Sending test request to Gemini API...');
    
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
      const result = response.data.candidates[0].content.parts[0].text;
      console.log('✅ Gemini API test successful!');
      console.log('📝 Response:', result);
      console.log('\n🎉 Your Gemini integration is working correctly!');
      console.log('🚀 You can now start the WhatsApp bot with: npm start');
    } else {
      console.log('❌ Unexpected response format from Gemini API');
      console.log('Response:', JSON.stringify(response.data, null, 2));
    }
  } catch (error) {
    console.log('❌ Gemini API test failed');
    
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Error:', error.response.data);
      
      if (error.response.status === 400) {
        console.log('\n💡 Common fixes:');
        console.log('- Check if your API key is correct');
        console.log('- Ensure Gemini API is enabled in your Google Cloud project');
        console.log('- Verify you have access to Gemini 1.5 Flash model');
      } else if (error.response.status === 403) {
        console.log('\n💡 API key might be invalid or doesn\'t have proper permissions');
      }
    } else {
      console.log('Error:', error.message);
    }
    
    process.exit(1);
  }
}

// Test classification functionality
async function testClassification() {
  console.log('\n🔍 Testing classification logic...');
  
  const testPrompt = `Analyze this image and classify it into one of these categories:
  1. CIVIL - Construction issues, building problems, road damage, structural issues, cracks in walls/buildings, potholes, broken pavements
  2. ELECTRICAL - Power lines, electrical equipment, wiring issues, transformers, electrical hazards, broken poles, electrical faults
  3. WATER - Plumbing issues, water leaks, drainage problems, water supply issues, sewage problems, broken pipes, water logging
  4. NO_ISSUE - If the image shows no infrastructure problems, normal conditions, or unrelated content

  Respond with only the category name (CIVIL, ELECTRICAL, WATER, or NO_ISSUE) followed by a brief description of what you see in the image.
  Format: CATEGORY: Description

  Important: Only classify as CIVIL, ELECTRICAL, or WATER if there is a clear problem or issue visible. If everything looks normal or there are no infrastructure issues, use NO_ISSUE.`;

  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: testPrompt
          },
          {
            inline_data: {
              mime_type: "image/jpeg",
              data: '/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A8A'
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

  try {
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
      const result = response.data.candidates[0].content.parts[0].text;
      console.log('✅ Classification test successful!');
      console.log('📝 Classification result:', result);
      
      // Parse the result to check format
      const [category, ...descriptionParts] = result.split(':');
      const description = descriptionParts.join(':').trim();
      
      console.log('🏷️  Parsed category:', category.trim());
      console.log('📄 Parsed description:', description);
    }
  } catch (error) {
    console.log('❌ Classification test failed:', error.message);
  }
}

async function main() {
  await testGeminiAPI();
  await testClassification();
}

main().catch(console.error);
