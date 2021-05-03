const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const monthEnds = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const parseDate = (date) => {
  const year = date.getFullYear();
  const month =
    String(date.getMonth() + 1).length === 1
      ? "0" + String(date.getMonth() + 1)
      : date.getMonth() + 1;
  const day =
    String(date.getDate() + 1).length === 1
      ? "0" + String(date.getDate())
      : date.getDate();

  return `${year}-${month}-${day}`;
};

const getFormattedDate = (dateObject = null) => {
  const date = dateObject ?? new Date();
  const day = days[date.getDay()];
  const dt = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hour = date.getHours();
  let mins = date.getMinutes();
  mins = String(mins).length === 1 ? "0" + String(mins) : mins;

  const value = dateObject
    ? `${day} ${dt} ${month} ${year}`
    : `${day} ${dt} ${month} ${year} ${hour}:${mins}`;
  return value;
};

const getCountdown = (monthEnding) => {
  const now = new Date().getTime();

  if (monthEnding > now) {
    const difference = monthEnding - now;
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    minutes = String(minutes).length === 1 ? "0" + String(minutes) : minutes;
    seconds = String(seconds).length === 1 ? "0" + String(seconds) : seconds;
    const countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    return countdown;
  }
};

export { days, months, monthEnds, getCountdown, getFormattedDate, parseDate };
