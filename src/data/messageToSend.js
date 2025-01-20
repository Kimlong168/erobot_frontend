import checkSocialMedia from "@/utils/checkSocialMedia";
import { getCurrentTime } from "@/utils/getCurrentTime";

const orderMessage = (baseUrl, orderId, formData, totalPrice) => {
  return `===== *New Order* =====

Order id: \`${orderId}\`

Date: *${new Date().toLocaleString()}*

Update Status: [Order Details](${baseUrl}/orderDetail/${orderId})

----------------------------------

${formData.fullName ? `Name: *${formData.fullName}*` : ""}

${formData.phoneNumber ? `Phone: *${formData.phoneNumber}*` : ""}

${formData.address ? `Address: *${formData.address}*` : ""}

${
  formData.paymentMethod
    ? `Payment Method: *${formData.paymentMethod.toUpperCase()}*`
    : ""
}

${formData.md5 ? `MD5: *\`${formData.md5}\`` : ""}

${
  formData.telegram
    ? `${checkSocialMedia(formData.telegram)}: *${formData.telegram}*`
    : "Contact Link: *No Contact Link Provided*"
}

${
  formData.message
    ? `Remark: *${formData.message}*`
    : "Remark: *No Remark Provided*"
}

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

export { orderMessage, contactMessage, invitationMessage };
