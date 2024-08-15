import { Label } from "@atoms/index";
import Select from "@atoms/Select";
import { Option } from "@atoms/Select/selectOption";
import { useGetClubByIdQuery } from "@redux/api/clubApi";
import { selectStartDate } from "@redux/features/creaetMatchSlice";
import { clubIdSelector } from "@redux/selectors/createMatchSelectors";
import { getHoursInRange } from "@utils/timeUtils";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const SelectStartAt: React.FC = () => {
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
      dispatch(selectStartDate(selectedDate.value));
    }
  }, [selectedDate]);
  return (
    <div>
      <Label>Match start at:</Label>

      <Select
        defaultValue={selectedDate}
        onChange={handleChangeDateOption}
        options={options}
        placeholder="Match start at"
        isLoading={isLoading}
      />
    </div>
  );
};
