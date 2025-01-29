import axios from "axios";
const botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
const chatId = process.env.NEXT_PUBLIC_TELEGRAM_GENERAL_CHAT_ID;
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
    sendTelegramMessage(caption, topic_id);
  }
};

const sendTelegramBase64Image = async (base64Image, caption, topic_id) => {
  // Remove the prefix 'data:image/png;base64,' if present
  const base64Data = base64Image.split(",")[1];

  // Ensure base64 string is properly padded
  const padding =
    base64Data.length % 4 === 0 ? "" : "=".repeat(4 - (base64Data.length % 4));
  const paddedBase64 = base64Data + padding;

  // Convert the padded base64 string to a Blob
  const blob = new Blob([new Uint8Array(Buffer.from(paddedBase64, "base64"))], {
    type: "image/png",
  });

  const form = new FormData();

  form.append("chat_id", chatId);

  // Send the image as a Blob
  form.append("photo", blob, "image.png"); // Specify any file name

  // Optional: Caption for the image
  form.append("caption", caption);

  // Optional: Markdown formatting
  form.append("parse_mode", "Markdown");

  if (topic_id) {
    form.append("message_thread_id", topic_id);
  }

  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${botToken}/sendPhoto`,
      form,
      {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${form._boundary}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error sending image to Telegram:", error);
    sendTelegramMessage(caption, topic_id);
    throw error;
  }
};

export { sendTelegramMessage, sendTelegramImage, sendTelegramBase64Image };
