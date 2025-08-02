const twilio = require('twilio');
require('dotenv').config();

// Environment variables
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;

// Contact numbers
const NEARBY_PEOPLE = ['+918555085585', '+919949607909'];
const TECHNICIAN_NUMBER = '+918341140216';

// Initialize Twilio client
const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

async function testTwilioCredentials() {
  console.log('🔐 Testing Twilio Credentials...\n');
  
  if (!TWILIO_ACCOUNT_SID || TWILIO_ACCOUNT_SID === 'your_twilio_account_sid') {
    console.log('❌ TWILIO_ACCOUNT_SID not found in .env file');
    return false;
  }
  
  if (!TWILIO_AUTH_TOKEN || TWILIO_AUTH_TOKEN === 'your_twilio_auth_token') {
    console.log('❌ TWILIO_AUTH_TOKEN not found in .env file');
    return false;
  }
  
  try {
    // Test credentials by fetching account info
    const account = await twilioClient.api.accounts(TWILIO_ACCOUNT_SID).fetch();
    console.log(`✅ Twilio credentials valid`);
    console.log(`   Account SID: ${account.sid}`);
    console.log(`   Account Status: ${account.status}`);
    console.log(`   Account Name: ${account.friendlyName}`);
    return true;
  } catch (error) {
    console.log('❌ Invalid Twilio credentials');
    console.log(`   Error: ${error.message}`);
    return false;
  }
}

async function testWhatsAppNumbers() {
  console.log('\n📱 Testing WhatsApp Numbers...\n');
  
  try {
    // Get available WhatsApp senders
    const incomingPhoneNumbers = await twilioClient.incomingPhoneNumbers.list();
    const whatsappNumbers = incomingPhoneNumbers.filter(number => 
      number.capabilities.sms && number.phoneNumber
    );
    
    console.log('📞 Available phone numbers:');
    whatsappNumbers.forEach(number => {
      console.log(`   ${number.phoneNumber} (${number.friendlyName})`);
    });
    
    // Check if any numbers support WhatsApp
    console.log('🔍 Checking WhatsApp support for available numbers...');

    // For now, use WhatsApp Sandbox as the regular phone number doesn't support WhatsApp
    console.log('⚠️  Regular phone numbers found, but WhatsApp requires special setup.');
    console.log('   Using WhatsApp Sandbox number: whatsapp:+14155238886');
    console.log('   💡 To use your own number for WhatsApp, you need to:');
    console.log('      1. Apply for WhatsApp Business API approval');
    console.log('      2. Enable WhatsApp on your Twilio number');

    return 'whatsapp:+14155238886';
  } catch (error) {
    console.log('⚠️  Could not fetch phone numbers, using sandbox number');
    console.log(`   Error: ${error.message}`);
    return 'whatsapp:+14155238886';
  }
}

async function sendTestNotifications(fromNumber) {
  console.log('\n📤 Sending Test Notifications...\n');
  
  const testMessage = `🧪 **TEST NOTIFICATION FROM FIXIFY.AI**\n\n` +
                     `This is a test message to verify WhatsApp integration.\n\n` +
                     `📋 Category: TEST\n` +
                     `🔍 Issue: Testing notification system\n` +
                     `📍 Location: Test Location\n\n` +
                     `If you receive this message, the integration is working!\n\n` +
                     `Reply with "TEST OK" to confirm.`;
  
  // Test nearby people notifications
  console.log('👥 Testing nearby people notifications...');
  for (const phoneNumber of NEARBY_PEOPLE) {
    try {
      console.log(`📤 Sending test to ${phoneNumber}...`);
      
      const result = await twilioClient.messages.create({
        body: testMessage,
        from: fromNumber,
        to: `whatsapp:${phoneNumber}`
      });
      
      console.log(`✅ Test message sent to ${phoneNumber}`);
      console.log(`   Message SID: ${result.sid}`);
      console.log(`   Status: ${result.status}`);
    } catch (error) {
      console.log(`❌ Failed to send test to ${phoneNumber}`);
      console.log(`   Error code: ${error.code}`);
      console.log(`   Error message: ${error.message}`);
      
      if (error.code === 63016) {
        console.log(`   💡 This number may not be registered for WhatsApp Sandbox`);
        console.log(`   💡 Ask the user to send "join <sandbox-keyword>" to ${fromNumber.replace('whatsapp:', '')}`);
      }
    }
  }
  
  // Test technician notification
  console.log('\n👨‍🔧 Testing technician notification...');
  try {
    console.log(`📤 Sending test to technician ${TECHNICIAN_NUMBER}...`);
    
    const techMessage = `🧪 **TEST WORK ASSIGNMENT FROM FIXIFY.AI**\n\n` +
                       `This is a test work assignment to verify integration.\n\n` +
                       `📋 Category: TEST\n` +
                       `🔍 Issue: Testing technician assignment\n` +
                       `📍 Location: Test Location\n\n` +
                       `If you receive this message, the integration is working!\n\n` +
                       `Reply with "TEST OK" to confirm.`;
    
    const result = await twilioClient.messages.create({
      body: techMessage,
      from: fromNumber,
      to: `whatsapp:${TECHNICIAN_NUMBER}`
    });
    
    console.log(`✅ Test message sent to technician ${TECHNICIAN_NUMBER}`);
    console.log(`   Message SID: ${result.sid}`);
    console.log(`   Status: ${result.status}`);
  } catch (error) {
    console.log(`❌ Failed to send test to technician ${TECHNICIAN_NUMBER}`);
    console.log(`   Error code: ${error.code}`);
    console.log(`   Error message: ${error.message}`);
    
    if (error.code === 63016) {
      console.log(`   💡 This number may not be registered for WhatsApp Sandbox`);
      console.log(`   💡 Ask the technician to send "join <sandbox-keyword>" to ${fromNumber.replace('whatsapp:', '')}`);
    }
  }
}

async function main() {
  console.log('🧪 Fixify.AI Notification System Test\n');
  console.log('=' .repeat(50));
  
  // Test 1: Credentials
  const credentialsValid = await testTwilioCredentials();
  if (!credentialsValid) {
    console.log('\n❌ Cannot proceed without valid Twilio credentials');
    console.log('Please run: npm run setup');
    process.exit(1);
  }
  
  // Test 2: WhatsApp numbers
  const fromNumber = await testWhatsAppNumbers();
  
  // Test 3: Send notifications
  await sendTestNotifications(fromNumber);
  
  console.log('\n' + '=' .repeat(50));
  console.log('🎉 Test Complete!');
  console.log('\n📝 Next Steps:');
  console.log('1. Check if test messages were received');
  console.log('2. If using Sandbox, ensure all numbers are registered');
  console.log('3. For production, set up WhatsApp Business API');
  console.log('\n💡 Common Issues:');
  console.log('• Error 63016: Number not registered for WhatsApp Sandbox');
  console.log('• Error 21211: Invalid "To" phone number');
  console.log('• Error 21614: "From" number not verified for trial account');
}

main().catch(console.error);
