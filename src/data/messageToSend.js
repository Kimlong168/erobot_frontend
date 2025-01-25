import checkSocialMedia from "@/utils/checkSocialMedia";
import { getCurrentTime } from "@/utils/getCurrentTime";
const baseUrl = process.env.NEXT_PUBLIC_DASHBOARD_URL;

const orderMessage = (orderId, formData, totalPrice) => {
  return `===== *New Order* =====

Order ID: \`${orderId}\`

Date: *${new Date().toLocaleString()}*

Update Status: [Order Details](${baseUrl}/orderDetail/${orderId})

----------------------------------

${formData.fullName ? `Name: *${formData.fullName}*` : ""}

${formData.phoneNumber ? `Phone: *${formData.phoneNumber}*` : ""}

${formData.address ? `Address: *${formData.address}*` : ""}

${
  formData.paymentMethod
    ? `Status: *${formData.paymentMethod === "khqr" ? "Paid" : "Pending"}*`
    : ""
}

${
  formData.paymentMethod
    ? `Payment Method: *${formData.paymentMethod.toUpperCase()}*`
    : ""
}

${formData.md5 ? `MD5: \`${formData.md5}\`` : "MD5: *None*"}

${
  formData.telegram
    ? `${checkSocialMedia(formData.telegram)}: *${formData.telegram}*`
    : "Contact Link: *None*"
}

${formData.message ? `Remark: *${formData.message}*` : "Remark: *None*"}

----------------------------------

💰 *Total*: *${totalPrice} $*

----------------------------------`;
};

const buyNowMessage = (orderId, formData, totalPrice, orderDetail) => {
  return `===== *New Order (Buy now)* =====

Order ID: \`${orderId}\`

Date: *${new Date().toLocaleString()}*

Update Status: [Order Details](${baseUrl}/orderDetail/${orderId})

----------------------------------

${orderDetail.productName} (${orderDetail.quantity} x ${orderDetail.price} $)

----------------------------------

${formData.fullName ? `Name: *${formData.fullName}*` : ""}

${formData.phoneNumber ? `Phone: *${formData.phoneNumber}*` : ""}

${formData.address ? `Address: *${formData.address}*` : ""}

${
  formData.paymentMethod
    ? `Payment Method: *${formData.paymentMethod.toUpperCase()}*`
    : ""
}

${formData.md5 ? `MD5: \`${formData.md5}\`` : "MD5: *None*"}

${
  formData.telegram
    ? `${checkSocialMedia(formData.telegram)}: *${formData.telegram}*`
    : "Contact Link: *None*"
}

${formData.message ? `Remark: *${formData.message}*` : "Remark: *None*"}

----------------------------------

💰 *Total*: *${totalPrice} $*

----------------------------------`;
};

const contactMessage = (formData) => {
  return `===== *New Message* =====

*Date:* ${getCurrentTime()}

${formData.fullname ? `*Name:* ${formData.fullname}\n` : ""}
${
  formData.socialMediaLink
    ? `*Social Media:* [${checkSocialMedia(formData.socialMediaLink)}](${
        formData.socialMediaLink
      })\n`
    : ""
}
${formData.phone ? `*Phone Number:* ${formData.phone}\n` : ""}
${formData.address ? `*Address:* ${formData.address}\n` : ""}
${
  formData.email
    ? `*Email:* [${formData.email}](mailto:${formData.email})\n`
    : ""
}
${formData.description ? `*Message:*\n${formData.description}\n` : ""}
  `;
};

const invitationMessage = (link, amount, name) => {
  return `🌟 **Erobot ${amount == 1 ? "1$" : "Donation"} Challenge** 🌟
  \n🙏🏼Hello ${name ? name : "friend"}!, Let's support **ERobot Cambodia**
  \n👉Click the link to donate: ${link}
  \nEvery contribution counts, and your generosity makes a difference. Thank you! 💖`;
};

export { orderMessage, buyNowMessage, contactMessage, invitationMessage };
