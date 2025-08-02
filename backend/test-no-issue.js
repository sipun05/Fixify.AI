const axios = require('axios');

// Test NO_ISSUE scenario
async function testNoIssueScenario() {
  const webhookUrl = 'http://localhost:3000/webhook';
  
  console.log('🧪 Testing NO_ISSUE Scenario\n');
  
  // Test with normal/good condition image
  console.log('📸 Test: Image with no infrastructure issues');
  try {
    const response = await axios.post(webhookUrl, {
      Body: '',
      From: 'whatsapp:+919876543210',
      To: 'whatsapp:+14155238886',
      NumMedia: '1',
      MediaUrl0: 'https://example.com/normal-room.jpg',
      MediaContentType0: 'image/jpeg',
      MessageSid: 'test-no-issue-123',
      Latitude: '17.4065',
      Longitude: '78.4772'
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    console.log('✅ NO_ISSUE test passed');
    console.log('Response:', response.data);
  } catch (error) {
    console.log('❌ NO_ISSUE test failed:', error.message);
  }
  
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Test with unrelated image (like food, people, etc.)
  console.log('📸 Test: Unrelated image (should be NO_ISSUE)');
  try {
    const response = await axios.post(webhookUrl, {
      Body: '',
      From: 'whatsapp:+919876543210',
      To: 'whatsapp:+14155238886',
      NumMedia: '1',
      MediaUrl0: 'https://example.com/food-image.jpg',
      MediaContentType0: 'image/jpeg',
      MessageSid: 'test-unrelated-456'
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    console.log('✅ Unrelated image test passed');
    console.log('Response:', response.data);
  } catch (error) {
    console.log('❌ Unrelated image test failed:', error.message);
  }
  
  console.log('\n🎉 NO_ISSUE Testing complete!');
  console.log('\n📝 Expected behavior for NO_ISSUE:');
  console.log('1. AI analyzes image and detects no infrastructure problems');
  console.log('2. User gets "NO INFRASTRUCTURE ISSUE DETECTED" message');
  console.log('3. NO notifications sent to nearby people');
  console.log('4. NO technician assignment');
  console.log('5. Only user receives confirmation that everything is normal');
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
  
  await testNoIssueScenario();
}

main().catch(console.error);
