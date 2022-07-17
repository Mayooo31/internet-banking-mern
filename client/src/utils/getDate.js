export const getDate = (movDate, time = false) => {
  const daysLeft = Math.round(
    Math.abs(new Date(movDate) - new Date()) / (1000 * 60 * 60 * 24)
  );

  const date = new Date(movDate);
  const day = `${date.getDate()}`.padStart(2, 0);
  const month = `${date.getMonth() + 1}`.padStart(2, 0);
  const year = date.getFullYear();

  if (time === "month") {
    const month = `${date.getMonth() + 1}`;
    return month;
  }

  if (time) {
    const hour = `${date.getHours()}`.padStart(2, 0);
    const minute = `${date.getMinutes()}`.padStart(2, 0);
    const second = `${date.getSeconds()}`.padStart(2, 0);

    return `${day}.${month}.${year} ${hour}:${minute}:${second}`;
  }

  if (daysLeft === 0) return "Today";
  if (daysLeft === 1) return "Yesterday";
  if (daysLeft <= 14) return `${daysLeft} days ago`;

  const currentTime = `${day}.${month}.${year}`;
  return currentTime;
};
