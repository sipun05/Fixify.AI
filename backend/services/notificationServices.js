const admin = require('../config/firebase');

async function sendPushNotification(
  token,
  title,
  body
) {

  try {

    await admin.messaging().send({
      token,
      notification: {
        title,
        body
      }
    });

    console.log('Notification sent');

  } catch (error) {

    console.log(error.message);

  }
}

module.exports = {
  sendPushNotification
};