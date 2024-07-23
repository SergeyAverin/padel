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

export function extractTime(input: string): string {
  // Создаем объект Date из входной строки
  const date = new Date(input);

  // Получаем часы и минуты
  const hours = String(date.getHours()).padStart(2, "0"); // Получаем часы в формате 2 цифры
  const minutes = String(date.getMinutes()).padStart(2, "0"); // Получаем минуты в формате 2 цифры

  // Формируем строку в формате 'HH:MM'
  return `${hours}:${minutes}`;
}
