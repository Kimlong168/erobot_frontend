import axios from "axios";
const sendTelegramMessage = async (message, topic_id) => {
  const botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
  const chatId = process.env.NEXT_PUBLIC_TELEGRAM_GENERAL_CHAT_ID;

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

export { sendTelegramMessage };
