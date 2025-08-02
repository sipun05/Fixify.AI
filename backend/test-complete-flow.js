const axios = require('axios');

// Test complete flow with image and location
async function testCompleteFlow() {
  const webhookUrl = 'http://localhost:3000/webhook';
  
  console.log('🧪 Testing Complete Fixify.AI Flow\n');
  
  // Test with image and GPS location
  console.log('📸 Test: Image with GPS location');
  try {
    const response = await axios.post(webhookUrl, {
      Body: '',
      From: 'whatsapp:+919876543210',
      To: 'whatsapp:+14155238886',
      NumMedia: '1',
      MediaUrl0: 'https://example.com/pothole-image.jpg',
      MediaContentType0: 'image/jpeg',
      MessageSid: 'test-message-sid-123',
      Latitude: '17.4065',
      Longitude: '78.4772'
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    console.log('✅ Complete flow test passed');
    console.log('Response:', response.data);
  } catch (error) {
    console.log('❌ Complete flow test failed:', error.message);
  }
  
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Test location only
  console.log('📍 Test: Location sharing only');
  try {
    const locationResponse = await axios.post(webhookUrl, {
      Body: '',
      From: 'whatsapp:+919876543210',
      To: 'whatsapp:+14155238886',
      NumMedia: '0',
      Latitude: '17.4065',
      Longitude: '78.4772'
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    console.log('✅ Location sharing test passed');
    console.log('Response:', locationResponse.data);
  } catch (error) {
    console.log('❌ Location sharing test failed:', error.message);
  }
  
  console.log('\n🎉 Testing complete!');
  console.log('\n📝 Expected behavior:');
  console.log('1. Image analysis with Gemini Flash');
  console.log('2. Notifications sent to nearby people:');
  console.log('   - +918555085585');
  console.log('   - +919949607909');
  console.log('3. Work assignment sent to technician:');
  console.log('   - +919502895881');
  console.log('4. Location included in all notifications');
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
  
  await testCompleteFlow();
}

main().catch(console.error);
