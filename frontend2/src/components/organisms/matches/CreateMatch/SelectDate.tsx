import { Label } from "@atoms/index";
import Select from "@atoms/Select";
import { Option } from "@atoms/Select/selectOption";
import { selectDate, setIsShowNext } from "@redux/features/creaetMatchSlice";
import { getNext14Days } from "@utils/dateUtils";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const SelectDate: React.FC = () => {
  const dates = getNext14Days().map((item) => ({
    label: item,
    value: item,
  }));
  const [selectedDate, setSelectedDate] = useState<Option>(dates[0]);
  const dispatch = useDispatch();
  const handleChangeDateOption = (option: Option) => {
    if (option) {
      setSelectedDate(option);
    }
  };
  useEffect(() => {
    if (selectedDate) {
      dispatch(selectDate(selectedDate.value));
      dispatch(setIsShowNext(true));
    }
  }, [selectedDate]);
  return (
    <div>
      <Label>Select the date when to create the game:</Label>

      <Select
        defaultValue={selectedDate}
        onChange={handleChangeDateOption}
        options={dates}
        placeholder="Select date"
      />
    </div>
  );
};
