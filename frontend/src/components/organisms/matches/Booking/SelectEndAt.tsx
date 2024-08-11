import { Label } from "@atoms/index";
import {
  addOneAndHalfHours,
  compareTimes,
  getHoursInRange,
} from "@utils/timeUtils";
import React, { useEffect, useState } from "react";
import Select from "@atoms/Select";
import BookingStore from "@store/matches/booking";
import { observer } from "mobx-react-lite";

interface Option {
  value: string;
  label: string;
}
export const SelectEndAt: React.FC = observer(() => {
  const [selectedEndOption, setSelectedEndOption] = useState<Option>({
    label: String(BookingStore.selectClub),
    value: String(BookingStore.endAt),
  });
  useEffect(() => {
    setSelectedEndOption({
      label: String(BookingStore.endAt),
      value: String(BookingStore.endAt),
    });
  }, [BookingStore.endAt]);

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

  useEffect(() => {
    const filteredTimeRange = timeRange.filter((i) => {
      if (compareTimes(BookingStore.startAt, i)) {
        return false;
      } else {
        return true;
      }
    });
    const p = filteredTimeRange.map((time) => ({ value: time, label: time }));
    setTimeRangeOpen(p);
  }, [BookingStore.startAt]);

  useEffect(() => {
    const newValue = addOneAndHalfHours(BookingStore.startAt);
    const time = timeRangeOpen.find((i) => i.value == newValue);
    if (time) {
      setSelectedEndOption(time);
    }
  }, [BookingStore.startAt]);

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
            options={timeRangeOpen}
            defaultValue={selectedEndOption}
            onChange={handleChangeEndOption}
            placeholder="Select start match"
          />
        </>
      )}
    </div>
  );
});
