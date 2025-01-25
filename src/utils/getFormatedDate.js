const getFormatedDate = (inputDate) => {
  const options = { year: "numeric", month: "long", day: "2-digit" };
  const formattedDate = new Date(inputDate).toLocaleDateString(
    "en-US",
    options
  );
  return formattedDate;
};

export default getFormatedDate;
