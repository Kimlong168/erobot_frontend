const getFormatedDate = (inputDate) => {
  const options = { year: "numeric", month: "long", day: "2-digit" };
  const formattedDate = new Date(inputDate).toLocaleDateString(
    "en-US",
    options
  );
  return formattedDate;
};

export const getLongMonth = (dateString) => {
  const shortToLongMonths = {
    Jan: "January",
    Feb: "February",
    Mar: "March",
    Apr: "April",
    May: "May",
    Jun: "June",
    Jul: "July",
    Aug: "August",
    Sep: "September",
    Oct: "October",
    Nov: "November",
    Dec: "December",
  };

  const [shortMonth, day, year] = dateString.split(" ");
  const longMonth = shortToLongMonths[shortMonth];
  return `${longMonth} ${day.replace(",", "")}, ${year}`;
};

export default getFormatedDate;
