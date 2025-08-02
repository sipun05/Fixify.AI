const axios = require('axios');

// Test webhook with sample WhatsApp message data
async function testWebhook() {
  const webhookUrl = 'http://localhost:3000/webhook';
  
  console.log('🧪 Testing Fixify.AI WhatsApp Webhook\n');
  
  // Test 1: Text message
  console.log('📝 Test 1: Text message');
  try {
    const textResponse = await axios.post(webhookUrl, {
      Body: 'help',
      From: 'whatsapp:+1234567890',
      To: 'whatsapp:+0987654321',
      NumMedia: '0'
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    console.log('✅ Text message test passed');
    console.log('Response:', textResponse.data);
  } catch (error) {
    console.log('❌ Text message test failed:', error.message);
  }
  
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Test 2: Image message (simulated)
  console.log('📸 Test 2: Image message (simulated)');
  try {
    const imageResponse = await axios.post(webhookUrl, {
      Body: '',
      From: 'whatsapp:+1234567890',
      To: 'whatsapp:+0987654321',
      NumMedia: '1',
      MediaUrl0: 'https://example.com/test-image.jpg',
      MediaContentType0: 'image/jpeg',
      MessageSid: 'test-message-sid-123'
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    console.log('✅ Image message test passed');
    console.log('Response:', imageResponse.data);
  } catch (error) {
    console.log('❌ Image message test failed:', error.message);
  }
  
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Test 3: Health check
  console.log('🏥 Test 3: Health check');
  try {
    const healthResponse = await axios.get('http://localhost:3000/health');
    console.log('✅ Health check passed');
    console.log('Response:', healthResponse.data);
  } catch (error) {
    console.log('❌ Health check failed:', error.message);
  }
  
  console.log('\n🎉 Testing complete!');
  console.log('\n📝 Notes:');
  console.log('- Make sure your server is running on port 3000');
  console.log('- Image analysis will only work with valid API keys');
  console.log('- For real testing, use actual Twilio webhook calls');
}

// Check if server is running
async function checkServer() {
  try {
    await axios.get('http://localhost:3000/health');
    return true;
  } catch (error) {
    return false;
  }
}

async function main() {
  const serverRunning = await checkServer();
  
  if (!serverRunning) {
    console.log('❌ Server is not running on port 3000');
    console.log('Please start the server first: npm start');
    process.exit(1);
  }
  
  await testWebhook();
}

main().catch(console.error);
