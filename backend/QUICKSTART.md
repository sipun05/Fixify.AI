# 🚀 Quick Start Guide - Fixify.AI WhatsApp Integration

## What This Does

When users send photos via WhatsApp, the system:
1. **AI Analysis** - Classifies issues as Civil/Electrical/Water using Gemini Flash
2. **GPS Location** - Automatically captures location from phone
3. **Nearby Notifications** - Alerts people at +918555085585, +919949607909 for verification
4. **Technician Assignment** - Assigns work to technician at +918341140216
5. **Real-time Updates** - Everyone gets notified with photo, location, and issue details

## 5-Minute Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Quick Setup (Interactive)
```bash
npm run setup
```
This will ask for your API keys and create a `.env` file.

### 3. Start Server
```bash
npm start
```

### 4. Test It
```bash
npm run test:complete  # Test complete flow
npm run test:gemini    # Test AI analysis
npm test              # Test basic webhook
```

## Required API Keys

### Twilio (Required)
1. Go to [console.twilio.com](https://console.twilio.com)
2. Get Account SID and Auth Token
3. Set up WhatsApp Sandbox

### AI Analysis

#### Google Gemini Flash
- Fast and accurate image analysis
- Get key from [aistudio.google.com](https://aistudio.google.com)
- Free tier available with generous limits

## Webhook Configuration

1. **For Testing (Local)**:
   ```bash
   # Install ngrok
   npm install -g ngrok
   
   # Expose local server
   ngrok http 3000
   
   # Use the ngrok URL in Twilio webhook settings
   ```

2. **For Production**:
   - Deploy to Railway, Heroku, or your server
   - Use your domain: `https://yourdomain.com/webhook`

## Example WhatsApp Conversation

```
User: [Sends photo of broken pipe with GPS location]
Bot: 📸 Image received! Analyzing the problem type... Please wait a moment.

Bot: 💧 WATER/PLUMBING ISSUE DETECTED

📋 Category: Water Supply/Plumbing Problem
🔍 Analysis: Detected broken water pipe with visible leak and water damage

✅ Actions Taken:
• Issue categorized as water/plumbing problem
• Nearby people notified for verification
• Plumbing specialist assigned to your case
• Coordinating with water department if needed

💧 Water shortage? Reply with "SHORTAGE" for priority handling.

---

Nearby Person (+918555085585) receives:
🚨 ISSUE VERIFICATION NEEDED
📋 Category: WATER
🔍 Issue: Detected broken water pipe with visible leak
📞 Reported by: whatsapp:+919876543210
📍 Location: 17.4065, 78.4772
🗺️ Maps: https://maps.google.com/?q=17.4065,78.4772
📸 Photo: [image URL]
Reply with: "VERIFIED", "FALSE", or "URGENT"

---

Technician (+918341140216) receives:
💧 WORK ASSIGNMENT - PLUMBING/WATER
👨‍🔧 You have been assigned to handle this water issue.
📋 Issue: Detected broken water pipe with visible leak
📞 Reported by: whatsapp:+919876543210
📍 Location: 17.4065, 78.4772
🗺️ Maps: https://maps.google.com/?q=17.4065,78.4772
📸 Issue Photo: [image URL]
Reply with "ACCEPT" to confirm assignment.
```

## Commands Users Can Send

- **Photos** → Automatic analysis and classification
- `help` or `start` → Welcome message and instructions
- `urgent` or `emergency` → Priority handling
- Any other text → Prompts to send photo

## File Structure

```
backend/
├── example.cjs          # Main webhook server
├── package.json         # Dependencies
├── .env.example         # Environment template
├── setup.js            # Interactive setup
├── test-webhook.js     # Testing script
├── README.md           # Detailed documentation
└── QUICKSTART.md       # This file
```

## Troubleshooting

### Server won't start?
- Check if port 3000 is available
- Verify `.env` file exists with correct values

### Webhook not receiving messages?
- Check Twilio webhook URL configuration
- Ensure server is publicly accessible (use ngrok for testing)

### Image analysis not working?
- Verify API keys are correct
- Check API quotas/limits
- Look at server logs for errors

### Need help?
- Check the detailed [README.md](README.md)
- Look at server logs: `npm run dev` (shows detailed logs)
- Test individual components: `npm test`

## Next Steps

1. **Test with real photos** via WhatsApp
2. **Deploy to production** server
3. **Integrate with your existing** Fixify.AI dashboard
4. **Add database storage** for issue tracking
5. **Implement user authentication** and case management

## Production Checklist

- [ ] Environment variables set
- [ ] HTTPS enabled
- [ ] Rate limiting implemented
- [ ] Error monitoring setup
- [ ] Database integration
- [ ] User authentication
- [ ] Backup and recovery plan
