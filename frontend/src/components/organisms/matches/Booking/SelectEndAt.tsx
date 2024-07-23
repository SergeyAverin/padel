import { Label } from "@atoms/index";
import { getHoursInRange } from "@utils/timeUtils";
import React, { useState } from "react";
import Select, { SingleValue } from "react-select";
import BookingStore from "@store/booking";
import { observer } from "mobx-react-lite";

interface Option {
  value: string;
  label: string;
}
export const SelectEndAt: React.FC = observer(() => {
  const [selectedEndOption, setSelectedEndOption] =
    useState<SingleValue<Option>>(null);
  const timeRange = getHoursInRange("08:00", "18:00");
  const options = timeRange.map((time) => ({ value: time, label: time }));

  const handleChangeEndOption = (option: SingleValue<Option>) => {
    if (option) {
      BookingStore.selectEndAt(option.value);
    }
    setSelectedEndOption(option);
  };
  return (
    <div className="mt-5">
      {BookingStore.selectedData && BookingStore.selectedClubId && (
        <>
          <Label>Time End</Label>

          <Select
            options={options}
            defaultValue={selectedEndOption}
            onChange={handleChangeEndOption}
          />
        </>
      )}
    </div>
  );
});
