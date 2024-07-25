import { Label } from "@atoms/index";
import { getHoursInRange } from "@utils/timeUtils";
import React, { useState } from "react";
import Select from "@atoms/Select";
import BookingStore from "@store/booking";
import { observer } from "mobx-react-lite";

interface Option {
  value: string;
  label: string;
}
export const SelectStartAt: React.FC = observer(() => {
  const [selectedStartOption, setSelectedStartOption] = useState<Option>(null);
  const timeRange = getHoursInRange("08:00", "18:00");
  const options = timeRange.map((time) => ({ value: time, label: time }));

  const handleChangeStartOption = (option: Option) => {
    if (option) {
      BookingStore.selectStartAt(option.value);
    }
    setSelectedStartOption(option);
  };
  return (
    <div className="mt-5">
      {BookingStore.selectedData && BookingStore.selectedClubId && (
        <>
          <Label>Time start</Label>

          <Select
            options={options}
            defaultValue={selectedStartOption}
            onChange={handleChangeStartOption}
            placeholder="Select end match"
          />
        </>
      )}
    </div>
  );
});
