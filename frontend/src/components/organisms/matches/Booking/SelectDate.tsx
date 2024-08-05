import React, { useEffect, useState } from "react";
import BookingStore from "@store/booking";
import Select from "@atoms/Select";

import { Label } from "@atoms/index";
import { observer } from "mobx-react-lite";
import { extractDayAndMonth, getNext14Days } from "@utils/dateUtils";

interface Option {
  value: string;
  label: string;
}
export const SelectDate: React.FC = observer(() => {
  const dates = getNext14Days().map((item) => ({
    label: item,
    value: item,
  }));
  const [selectedDate, setSelectedDate] = useState<Option>(dates[0]);
  // useEffect(() => {
  //   setSelectedDate(dates[0]);
  //   BookingStore.selectDate(dates[0].value);
  // }, []);
  // useEffect(() => {
  //   const d = extractDayAndMonth(selectedDate.value);
  //   console.log(1);
  //   BookingStore.getMatchByDay(Number(BookingStore.selectedClubId), d[0], d[1]);
  // }, [selectedDate]);
  const handleChangeDateOption = (option: Option) => {
    if (option) {
      BookingStore.selectDate(option.value);
    }
    setSelectedDate(option);
    if (BookingStore.selectedClubId && option) {
      const d = extractDayAndMonth(option.value);
      console.log(2);
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
          <Label>Select the date when to create the match:</Label>

          <Select
            defaultValue={selectedDate}
            onChange={handleChangeDateOption}
            options={dates}
            placeholder="Select date"
          />
        </>
      )}
    </div>
  );
});
