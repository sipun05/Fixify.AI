# 🔧 Troubleshooting Guide - WhatsApp Notifications

## 🚨 Messages Not Being Sent to Technician/Nearby People

### Quick Diagnosis

Run this command to test your setup:
```bash
npm run test:notifications
```

This will test:
- ✅ Twilio credentials
- ✅ Available phone numbers
- ✅ Send test messages to all contacts

### Common Issues & Solutions

#### 1. **Error 63016: Number not registered for WhatsApp Sandbox**

**Problem**: The phone numbers (+918555085585, +919949607909, +919502895881) are not registered with your Twilio WhatsApp Sandbox.

**Solution**:
1. Go to [Twilio Console > WhatsApp Sandbox](https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn)
2. Note your sandbox number (usually +1 415 523 8886)
3. Ask each person to send this message to the sandbox number:
   ```
   join <your-sandbox-keyword>
   ```
4. They should receive a confirmation message

**How to find your sandbox keyword**:
- Go to Twilio Console > WhatsApp Sandbox
- Look for "Sandbox Participants" section
- Your keyword is shown there (e.g., "join happy-dog")

#### 2. **Error 21211: Invalid "To" phone number**

**Problem**: Phone number format is incorrect.

**Solution**: Ensure numbers are in international format:
- ✅ Correct: `+918555085585`
- ❌ Wrong: `8555085585` or `918555085585`

#### 3. **Error 21614: "From" number not verified**

**Problem**: Your Twilio account is in trial mode and the "from" number isn't verified.

**Solutions**:
- **Option A**: Upgrade to paid Twilio account
- **Option B**: Use WhatsApp Sandbox number: `whatsapp:+14155238886`

#### 4. **Messages sent but not received**

**Problem**: Messages show as "sent" in logs but users don't receive them.

**Possible causes**:
- Users haven't joined WhatsApp Sandbox
- WhatsApp is blocked/restricted in user's region
- User's WhatsApp settings block business messages

**Solution**:
1. Check message status in Twilio Console
2. Ensure all users have joined sandbox
3. Test with a known working number first

### Step-by-Step Testing

#### Step 1: Test Twilio Connection
```bash
npm run test:notifications
```

Look for:
```
✅ Twilio credentials valid
   Account SID: ACxxxxx
   Account Status: active
```

#### Step 2: Check Available Numbers
Look for output like:
```
📞 Available phone numbers:
   +14155238886 (WhatsApp Sandbox)
```

#### Step 3: Test Message Sending
Look for:
```
✅ Test message sent to +918555085585
   Message SID: SMxxxxx
   Status: queued
```

If you see errors, check the error codes below.

### Error Code Reference

| Error Code | Description | Solution |
|------------|-------------|----------|
| 63016 | Number not in sandbox | Register number with sandbox |
| 21211 | Invalid phone number | Check number format (+country code) |
| 21614 | From number not verified | Use sandbox number or upgrade account |
| 21408 | Permission denied | Check account permissions |
| 20003 | Authentication failed | Check Account SID and Auth Token |

### Manual Testing

#### Test 1: Send Direct Message
```javascript
// Add this to test-notifications.js and run it
const result = await twilioClient.messages.create({
  body: 'Test message from Fixify.AI',
  from: 'whatsapp:+14155238886',
  to: 'whatsapp:+918555085585'
});
console.log('Message SID:', result.sid);
```

#### Test 2: Check Message Status
```javascript
// Check if message was delivered
const message = await twilioClient.messages('SMxxxxx').fetch();
console.log('Status:', message.status);
console.log('Error Code:', message.errorCode);
console.log('Error Message:', message.errorMessage);
```

### WhatsApp Sandbox Setup

#### For Each Contact Person:

1. **+918555085585** (Nearby Person 1):
   - Send: `join <your-sandbox-keyword>` to `+14155238886`
   - Wait for confirmation message

2. **+919949607909** (Nearby Person 2):
   - Send: `join <your-sandbox-keyword>` to `+14155238886`
   - Wait for confirmation message

3. **+918341140216** (Technician):
   - Send: `join <your-sandbox-keyword>` to `+14155238886`
   - Wait for confirmation message

### Production Setup (No Sandbox)

For production without sandbox limitations:

1. **Apply for WhatsApp Business API**:
   - Go to Twilio Console > WhatsApp
   - Apply for WhatsApp Business API approval
   - This removes the sandbox restrictions

2. **Get Approved WhatsApp Number**:
   - Purchase a Twilio phone number
   - Enable WhatsApp on that number
   - Use that as your "from" number

### Debug Mode

Enable detailed logging by adding this to your `.env`:
```env
DEBUG=true
NODE_ENV=development
```

Then check server logs when testing:
```bash
npm run dev  # Shows detailed logs
```

### Still Having Issues?

1. **Check Twilio Console Logs**:
   - Go to Twilio Console > Monitor > Logs
   - Look for failed message attempts

2. **Verify Account Status**:
   - Ensure Twilio account is active
   - Check account balance (for paid accounts)

3. **Test with Your Own Number**:
   - Add your own WhatsApp number to test
   - Verify you can receive messages

4. **Contact Support**:
   - If all else fails, contact Twilio support
   - Provide error codes and message SIDs

### Quick Fix Checklist

- [ ] Twilio credentials are correct in `.env`
- [ ] All phone numbers are in international format (+country code)
- [ ] All contacts have joined WhatsApp Sandbox
- [ ] Sandbox keyword is correct
- [ ] Account has sufficient balance (if paid)
- [ ] WhatsApp is working on recipient devices
- [ ] No network/firewall blocking Twilio API calls

Run `npm run test:notifications` after each fix to verify!
