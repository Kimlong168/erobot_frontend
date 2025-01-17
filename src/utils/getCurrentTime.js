const getCurrentTime = () => {
  const now = new Date();
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return now.toLocaleString("en-US", options); // Adjust locale as needed
};

function getCurrentTimeForDonor() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Month is zero-indexed
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export { getCurrentTime, getCurrentTimeForDonor };
