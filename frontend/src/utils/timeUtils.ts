export function getHoursInRange(startTime: string, endTime: string): string[] {
  const timeSlots: string[] = [];

  // Функция для преобразования времени в минуты
  const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  // Функция для преобразования минут обратно в строку времени
  const minutesToTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
  };

  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);

  for (let minutes = startMinutes; minutes <= endMinutes; minutes += 30) {
    timeSlots.push(minutesToTime(minutes));
  }

  return timeSlots;
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

export function addOneAndHalfHours(time: string): string {
  // Разделяем строку по символу ':'
  const parts = time.split(":");

  // Преобразуем каждую часть в число
  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);

  // Преобразуем время в общее количество минут
  const totalMinutes = hours * 60 + minutes + 90; // Добавляем 90 минут

  // Вычисляем новые часы и минуты
  const newHours = Math.floor(totalMinutes / 60) % 24; // Учитываем 24-часовой формат
  const newMinutes = totalMinutes % 60;

  // Форматируем результат в строку "часы:минуты"
  return `${newHours.toString().padStart(2, "0")}:${newMinutes
    .toString()
    .padStart(2, "0")}`;
}

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

export function compareTimes(time1: string, time2: string): boolean {
  const minutes1 = timeToMinutes(time1);
  const minutes2 = timeToMinutes(time2);

  if (minutes1 > minutes2) {
    return true; // time1 больше time2
  } else if (minutes1 < minutes2) {
    return false; // time1 меньше time2
  } else {
    return false; // время одинаковое
  }
}
