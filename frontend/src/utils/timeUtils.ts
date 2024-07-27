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
