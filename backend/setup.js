#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 Fixify.AI WhatsApp Backend Setup\n');

const questions = [
  {
    key: 'TWILIO_ACCOUNT_SID',
    question: 'Enter your Twilio Account SID: ',
    required: true
  },
  {
    key: 'TWILIO_AUTH_TOKEN',
    question: 'Enter your Twilio Auth Token: ',
    required: true
  },
  {
    key: 'GEMINI_API_KEY',
    question: 'Enter your Google Gemini API Key: ',
    required: true
  },
  {
    key: 'PORT',
    question: 'Enter server port (default: 3000): ',
    required: false,
    default: '3000'
  }
];

async function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question.question, (answer) => {
      if (question.required && !answer.trim()) {
        console.log('❌ This field is required!');
        resolve(askQuestion(question));
      } else {
        resolve(answer.trim() || question.default || '');
      }
    });
  });
}

async function setup() {
  const envVars = {};
  
  for (const question of questions) {
    const answer = await askQuestion(question);
    if (answer) {
      envVars[question.key] = answer;
    }
  }
  
  // Validate that we have Gemini API key
  if (!envVars.GEMINI_API_KEY) {
    console.log('\n⚠️  Warning: No Gemini API key provided. Image analysis will not work.');
    console.log('You can add it later to the .env file.');
  }
  
  // Create .env file
  const envContent = Object.entries(envVars)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');
  
  fs.writeFileSync('.env', envContent);
  
  console.log('\n✅ Setup complete!');
  console.log('📁 Created .env file with your configuration');
  console.log('\n🚀 Next steps:');
  console.log('1. Run: npm install');
  console.log('2. Run: npm start');
  console.log('3. Configure your Twilio webhook URL to point to your server');
  console.log('\n📖 Check README.md for detailed instructions');
  
  rl.close();
}

setup().catch(console.error);
