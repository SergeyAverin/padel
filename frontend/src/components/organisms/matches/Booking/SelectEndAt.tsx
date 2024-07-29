import { Label } from "@atoms/index";
import { getHoursInRange } from "@utils/timeUtils";
import React, { useEffect, useState } from "react";
import Select from "@atoms/Select";
import BookingStore from "@store/booking";
import { observer } from "mobx-react-lite";

interface Option {
  value: string;
  label: string;
}
export const SelectEndAt: React.FC = observer(() => {
  const [selectedEndOption, setSelectedEndOption] = useState<Option>({
    label: String(BookingStore.endAt),
    value: String(BookingStore.endAt),
  });
  useEffect(() => {
    setSelectedEndOption({
      label: String(BookingStore.endAt),
      value: String(BookingStore.endAt),
    });
  }, [BookingStore.endAt]);

  const timeRange = getHoursInRange("08:00", "18:00");
  const options = timeRange.map((time) => ({ value: time, label: time }));

  const handleChangeEndOption = (option: Option) => {
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
            placeholder="Select start match"
          />
        </>
      )}
    </div>
  );
});
