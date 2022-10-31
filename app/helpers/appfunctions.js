export default function getRoutineArray(selectedDay) {
  switch (selectedDay) {
    case "Morning":
      return [
        {
          time: "morning",
          active: false,
        },
      ];
    case "Night":
      return [
        {
          time: "night",
          active: false,
        },
      ];
    case "Thrice":
      return [
        {
          time: "night",
          active: false,
        },
        {
          time: "morning",
          active: false,
        },
        {
          time: "evening",
          active: false,
        },
      ];
    default:
      return [
        {
          time: "morning",
          active: false,
        },
        {
          time: "night",
          active: false,
        },
      ];
  }
}

export function getCurrentDay() {
  const monthNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return monthNames[new Date().getDay()];
}

export function getCheckList(item, time) {
  return item.selectedDays
    .filter((d1) => d1.day == getCurrentDay())[0]
    .isMedicineTaken.filter((v) => v.time == time);
}
