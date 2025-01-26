import axios from "axios";
const botToken = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_GENERAL_CHAT_ID;
const sendTelegramMessage = async (message, topic_id) => {
  try {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    if (topic_id) {
      console.log("topic_id", topic_id);
      await axios.post(url, {
        chat_id: chatId,
        text: message,
        message_thread_id: topic_id,
        parse_mode: "Markdown",
      });
    } else {
      await axios.post(url, {
        chat_id: chatId,
        text: message,
        parse_mode: "Markdown",
      });
    }

    console.log("Message sent successfully");
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

const sendTelegramImage = async (downloadURL, caption, topic_id) => {
  const form = new FormData();
  form.append("chat_id", chatId);
  // url of image to send
  form.append("photo", downloadURL);
  // caption for the image
  form.append("caption", caption);
  // mark down
  form.append("parse_mode", "Markdown");
  // topic
  if (topic_id) {
    form.append("message_thread_id", topic_id);
  }

  try {
    await axios.post(
      `https://api.telegram.org/bot${botToken}/sendPhoto`,
      form,
      {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${form._boundary}`,
        },
      }
    );
  } catch (error) {
    console.error("Error sending image:", error);
  }
};

export { sendTelegramMessage, sendTelegramImage };
