export function getNext14Days(): string[] {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

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

  const result: string[] = [];
  const today = new Date();

  for (let i = 0; i < 14; i++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + i);

    const day = currentDate.getDate();
    const dayOfWeek = daysOfWeek[currentDate.getDay()];
    const month = months[currentDate.getMonth()];

    result.push(`${day} ${dayOfWeek} ${month}`);
  }

  return result;
}

export function extractDayAndMonth(dateString: string): [number, number] {
  // Split the input string into parts
  const parts = dateString.split(" ");

  // Extract the day as a number
  const day = parseInt(parts[0], 10);

  // Define an object to map month names to their corresponding numbers
  const monthMap: { [key: string]: number } = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
  };

  // Extract the month name
  const monthName = parts[2];

  // Get the month number from the map
  const month = monthMap[monthName];

  // Return the day and month as an array
  return [day, month];
}
