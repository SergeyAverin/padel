import { Label } from "@atoms/index";
import { addOneAndHalfHours, getHoursInRange } from "@utils/timeUtils";
import React, { useEffect, useState } from "react";
import Select from "@atoms/Select";
import BookingStore from "@store/booking";
import { observer } from "mobx-react-lite";

interface Option {
  value: string;
  label: string;
}
export const SelectStartAt: React.FC = observer(() => {
  const timeRange = getHoursInRange(BookingStore.opening, BookingStore.closing);
  const options = timeRange.map((time) => ({ value: time, label: time }));
  const [timeRangeOpen, setTimeRangeOpen] = useState(options);
  useEffect(() => {
    const timeRange = getHoursInRange(
      BookingStore.opening,
      BookingStore.closing
    );
    const p = timeRange.map((time) => ({ value: time, label: time }));
    setTimeRangeOpen(p);
  }, [BookingStore.opening, BookingStore.closing]);

  const [selectedStartOption, setSelectedStartOption] = useState<Option>(
    options[0]
  );

  const handleChangeStartOption = (option: Option) => {
    if (option) {
      BookingStore.selectStartAt(option.value);
      console.log(addOneAndHalfHours(option.value));
      BookingStore.selectEndAt(addOneAndHalfHours(option.value));
    }
    setSelectedStartOption(option);
  };

  useEffect(() => {
    console.log("start");
    console.log(BookingStore.breakPoints);
    BookingStore.breakPoints.map((point) => {
      console.log(`${point.startAt - 2} ${point.endAt - 3}`);
    });
  }, []);

  return (
    <div className="mt-5">
      {BookingStore.selectedData && BookingStore.selectedClubId && (
        <>
          <Label>Time start</Label>

          <Select
            options={timeRangeOpen}
            defaultValue={selectedStartOption}
            onChange={handleChangeStartOption}
            placeholder="Select end match"
          />
        </>
      )}
    </div>
  );
});
