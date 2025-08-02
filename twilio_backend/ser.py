from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, MessageHandler, filters, ContextTypes

# Dummy ML function
def analyze_image(image_url):
    return "Pothole detected"

# Dummy website upload
def upload_to_website(file_path):
    print(f"[UPLOAD] Uploaded: {file_path}")

# Dummy notification
def notify_nearby(issue="Pothole detected"):
    print(f"[NOTIFY] Sent alert: {issue}")

# Start Command
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("Hi! 👋 Please upload a photo of the issue.")

# Handle Image
async def handle_image(update: Update, context: ContextTypes.DEFAULT_TYPE):
    photo = update.message.photo[-1]  # Get highest resolution image
    file = await context.bot.get_file(photo.file_id)
    file_path = f"downloaded_{photo.file_id}.jpg"
    await file.download_to_drive(file_path)

    # Simulate ML + Upload + Notify
    issue = analyze_image(file_path)
    upload_to_website(file_path)
    notify_nearby(issue)

    await update.message.reply_text(f"✅ Issue reported: {issue}. Our team has been notified.")

# Catch-all for text
async def fallback(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("Please send an image to report an issue.")

# Run the bot
def main():
    app = ApplicationBuilder().token("8222035538:AAHjEsflpIdgfs3Z-lUK3KldVK-gFikhe44").build()

    app.add_handler(CommandHandler("start", start))
    app.add_handler(MessageHandler(filters.PHOTO, handle_image))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, fallback))

    print("Bot is running...")
    app.run_polling()

if __name__ == "__main__":
    main()
