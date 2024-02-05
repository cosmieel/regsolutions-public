const getDateString = function ({ rawDate, isYearCropped = false }) {
  const dateObject = new Date(rawDate);
  let date = dateObject.getDate();
  let month = dateObject.getMonth() + 1;
  let year = dateObject.getFullYear();

  if (date < 10) {
    date = `0${date}`;
  }

  if (month < 10) {
    month = `0${month}`;
  }

  if (isYearCropped) {
    year = year.toString().slice(2, 4);
  }

  const dateString = `${date}.${month}.${year}`;

  return dateString;
};

export { getDateString };
