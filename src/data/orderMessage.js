import checkSocialMedia from "@/utils/checkSocialMedia";

const orderMessage = (baseUrl, orderId, formData, totalPrice) => {
  return `===== *New Order* =====

Order id: \`${orderId}\`

Date: *${new Date().toLocaleString()}*

Update Status: [Order Details](${baseUrl}/orderDetail/${orderId})

----------------------------------

${formData.fullName ? `Name: *${formData.fullName}*` : ""}

${formData.phoneNumber ? `Phone: *${formData.phoneNumber}*` : ""}

${formData.address ? `Address: *${formData.address}*` : ""}

${formData.email ? `Email: *${formData.email}*` : "Email: *No Email Provided*"}

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

export { orderMessage };
