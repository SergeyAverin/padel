export function getHoursInRange(startTime: string, endTime: string): string[] {
  const [startHours, startMinutes] = startTime.split(":").map(Number);
  const [endHours, endMinutes] = endTime.split(":").map(Number);

  const hours: string[] = [];

  let currentHours = startHours;
  let currentMinutes = startMinutes;

  while (true) {
    hours.push(
      `${currentHours.toString().padStart(2, "0")}:${currentMinutes
        .toString()
        .padStart(2, "0")}`
    );

    currentMinutes += 60;
    currentHours++;

    if (
      currentHours > endHours ||
      (currentHours === endHours && currentMinutes >= endMinutes)
    ) {
      break;
    }

    if (currentMinutes >= 60) {
      currentHours++;
      currentMinutes -= 60;
    }
  }

  return hours;
}
