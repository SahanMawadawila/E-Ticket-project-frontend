import dayjs from "dayjs";

function subtractTime(time1, time2) {
  // Parse the time strings into dayjs objects
  let date1 = dayjs(time1, "HH:mm");
  let date2 = dayjs(time2, "HH:mm");

  // If date2 is before date1, assume it's on the next day
  if (date2.isBefore(date1)) {
    date2 = date2.add(1, "day");
  }

  // Subtract the two times to get the difference in milliseconds
  const diff = date2.diff(date1);

  // Convert the difference to hours and minutes
  const hours = Math.floor(diff / 1000 / 60 / 60);
  const minutes = Math.floor((diff / 1000 / 60) % 60);

  // Return the difference as a string in the format "HH:mm"
  return `${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }`;
}

export default subtractTime;
