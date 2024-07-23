import React, { useState } from "react";
import BookingStore from "@store/booking";
import Select, { SingleValue } from "react-select";
import { Label } from "@atoms/index";
import { observer } from "mobx-react-lite";

interface Option {
  value: string;
  label: string;
}
export const SelectDate: React.FC = observer(() => {
  const [selectedDate, setSelectedDate] = useState<SingleValue<Option>>(null);

  const handleChangeDateOption = (option: SingleValue<Option>) => {
    if (option) {
      BookingStore.selectDate(option.value);
    }
    setSelectedDate(option);
    if (BookingStore.selectedClubId && option) {
      const d = extractDayAndMonth(option.value);
      BookingStore.getMatchByDay(
        Number(BookingStore.selectedClubId),
        d[0],
        d[1]
      );
    }
  };

  return (
    <div className="mt-5">
      {BookingStore.selectedClubId && (
        <>
          <Label>Select date:</Label>

          <Select
            defaultValue={selectedDate}
            onChange={handleChangeDateOption}
            options={getNext14Days().map((item) => ({
              label: item,
              value: item,
            }))}
          />
        </>
      )}
    </div>
  );
});

function getNext14Days(): string[] {
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

function extractDayAndMonth(dateString: string): [number, number] {
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
