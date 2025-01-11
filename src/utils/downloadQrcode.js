import html2canvas from "html2canvas";

const downloadQrcode = (data) => {
  const elementId = `erobot_khqr`;
  const element = document.querySelector(`#${elementId}`);

  if (!element) {
    console.error(`Element with ID #${elementId} not found.`);
    return;
  }

  html2canvas(element, {
    backgroundColor: "#ffffff", // Set background explicitly to white
  }).then((canvas) => {
    const a = document.createElement("a");

    a.href = canvas.toDataURL("image/png");
    console.log(a.href, "and", a);
    a.download = `erobot_khqr_${data.amount}_${data.currency}.png`;
    a.click();
  });
};

export default downloadQrcode;
