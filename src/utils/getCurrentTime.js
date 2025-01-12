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

export { getCurrentTime };
