const getDays = (selectedDays) => {
  let days = "";
  for (let key in selectedDays) {
    if (selectedDays[key] === true) {
      if (key === "weekDays") key = "Week Days";
      days += key + "/";
    }
  }
  if (days.charAt(days.length - 1) === "/") {
    days = days.slice(0, -1);
  }
  return days;
};

export default getDays;
