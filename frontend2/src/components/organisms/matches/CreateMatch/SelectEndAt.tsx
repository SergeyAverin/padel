import { Label } from "@atoms/index";
import Select from "@atoms/Select";
import { Option } from "@atoms/Select/selectOption";
import { useGetClubByIdQuery } from "@redux/api/clubApi";
import { selectEndDate } from "@redux/features/creaetMatchSlice";
import {
  clubIdSelector,
  startAtSelector,
} from "@redux/selectors/createMatchSelectors";
import { addOneAndHalfHours, getHoursInRange } from "@utils/timeUtils";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const SelectEndAt: React.FC = () => {
  const clubId = useSelector(clubIdSelector);
  const { data, isLoading } = useGetClubByIdQuery(String(clubId));

  const opeing = data ? data.opening : "00:00";
  const closing = data ? data.closing : "00:00";
  const timeRange = getHoursInRange(opeing, closing);
  const options = timeRange.map((time) => ({ value: time, label: time }));

  const [selectedDate, setSelectedDate] = useState<Option>(options[0]);
  const dispatch = useDispatch();
  const handleChangeDateOption = (option: Option) => {
    if (option) {
      setSelectedDate(option);
    }
  };
  useEffect(() => {
    if (selectedDate) {
      dispatch(selectEndDate(selectedDate.value));
    }
  }, [selectedDate]);

  const startAt = useSelector(startAtSelector);
  useEffect(() => {
    if (startAt) {
      const newValue = addOneAndHalfHours(startAt);
      const time = options.find((i) => i.value == newValue);
      if (time) {
        setSelectedDate(time);
      }
    }
  }, [startAt]);
  return (
    <div>
      <Label>Game end at:</Label>

      <Select
        defaultValue={selectedDate}
        onChange={handleChangeDateOption}
        options={options}
        placeholder="Game start at"
        isLoading={isLoading}
      />
    </div>
  );
};
