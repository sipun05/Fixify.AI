# Fixify.AI WhatsApp Backend

This backend service handles WhatsApp integration through Twilio and provides AI-powered image analysis to classify infrastructure problems into civil, electrical, or water-related categories.

## Features

- 📱 WhatsApp integration via Twilio
- 🤖 AI-powered image analysis using Google Gemini Flash
- 🏗️ Automatic classification into Civil, Electrical, or Water categories
- 📸 Image processing and analysis
- 🚨 Priority handling for urgent cases
- 💬 Interactive chat responses

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Configuration

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Fill in your API credentials in `.env`:

```env
# Twilio Configuration
TWILIO_ACCOUNT_SID=your_actual_twilio_account_sid
TWILIO_AUTH_TOKEN=your_actual_twilio_auth_token

# AI API Key - Google Gemini Flash
GEMINI_API_KEY=your_actual_gemini_api_key

# Server Configuration
PORT=3000
```

### 3. Get API Keys

#### Twilio Setup:
1. Sign up at [Twilio Console](https://console.twilio.com/)
2. Get your Account SID and Auth Token from the dashboard
3. Set up WhatsApp Sandbox or get approved for WhatsApp Business API
4. Configure webhook URL: `https://your-domain.com/webhook`

#### Google Gemini API:
1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Create a new API key
3. Ensure you have access to Gemini 1.5 Flash model
4. Copy the API key for your .env file

### 4. Run the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

### 5. Configure Twilio Webhook

1. In Twilio Console, go to WhatsApp Sandbox settings
2. Set webhook URL to: `https://your-domain.com/webhook`
3. Set HTTP method to POST
4. Save configuration

## API Endpoints

### POST /webhook
Main WhatsApp webhook endpoint that handles:
- Text messages
- Image messages
- Media analysis and classification

### GET /health
Health check endpoint that returns server status.

## How It Works

1. **User sends image** via WhatsApp
2. **Webhook receives** the message and media
3. **Image is downloaded** and converted to buffer array
4. **AI analyzes** the image using Google Gemini Flash
5. **Classification** happens into one of three categories:
   - 🏗️ **Civil**: Construction, structural, road issues
   - ⚡ **Electrical**: Power, wiring, electrical equipment
   - 💧 **Water**: Plumbing, water supply, drainage
6. **Response sent** back to user with category and next steps

## Message Flow Examples

### Image Analysis Flow:
```
User: [Sends photo of broken road]
Bot: 📸 Image received! Analyzing the problem type... Please wait a moment.
Bot: 🏗️ CIVIL ENGINEERING ISSUE DETECTED
     📋 Category: Construction/Structural Problem
     🔍 Analysis: Detected road damage with visible cracks
     ✅ Next Steps: A civil engineer will be assigned...
```

### Text Commands:
- `help` or `start` - Shows welcome message and instructions
- `urgent` or `emergency` - Marks case as priority
- Any other text - Prompts user to send an image

## Deployment

### Using Railway/Heroku:
1. Connect your GitHub repository
2. Set environment variables in the platform
3. Deploy the backend folder
4. Update Twilio webhook URL with your deployed URL

### Using Docker:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## Troubleshooting

### Common Issues:

1. **Webhook not receiving messages**:
   - Check Twilio webhook URL configuration
   - Ensure server is publicly accessible
   - Verify HTTPS is used for production

2. **Image analysis failing**:
   - Check API keys are correct
   - Verify API quotas/limits
   - Check network connectivity

3. **Server errors**:
   - Check environment variables
   - Verify all dependencies are installed
   - Check server logs for detailed errors

### Testing Locally:

Use ngrok to expose local server:
```bash
ngrok http 3000
```

Then use the ngrok URL as your Twilio webhook URL.

## Security Notes

- Never commit `.env` file to version control
- Use HTTPS in production
- Validate webhook requests from Twilio
- Implement rate limiting for production use
- Store sensitive data securely

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request
