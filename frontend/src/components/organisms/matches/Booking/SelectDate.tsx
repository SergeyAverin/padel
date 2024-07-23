import React, { useState } from "react";
import BookingStore from "@store/booking";
import Select, { SingleValue } from "react-select";
import { Label } from "@atoms/index";
import { observer } from "mobx-react-lite";
import { extractDayAndMonth, getNext14Days } from "@utils/dateUtils";

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
