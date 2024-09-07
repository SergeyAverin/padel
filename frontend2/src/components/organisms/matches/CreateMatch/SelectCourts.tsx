import { Label } from "@atoms/index";
import Select from "@atoms/Select";
import { Option } from "@atoms/Select/selectOption";
import { useGetCourtsQuery } from "@redux/api/courtApi";
import { selectCourt, setIsShowNext } from "@redux/features/creaetMatchSlice";
import { clubIdSelector } from "@redux/selectors/createMatchSelectors";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const SelectCourt: React.FC = () => {
  const clubId = useSelector(clubIdSelector) as number;
  const { data, isLoading } = useGetCourtsQuery(clubId);
  const options = data
    ? data.map((court) => ({ label: court.name, value: String(court.id) }))
    : [];
  const [court, setCourt] = useState(options[0]);
  const handleChagneCourt = (option: Option) => {
    if (option) {
      setCourt(option);
    }
  };
  useEffect(() => {
    if (!isLoading) {
      if (options.length > 0) {
        setCourt(options[0]);
      }
    }
  }, [isLoading]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (court) {
      dispatch(selectCourt(court.value));
      dispatch(setIsShowNext(true));
    } else {
      dispatch(setIsShowNext(false));
    }
  }, [court]);
  return (
    <div>
      {data && data.length != 0 && !isLoading && (
        <>
          <Label>Choose a club where to create a game :</Label>
          <Select
            defaultValue={court}
            onChange={handleChagneCourt}
            options={options}
            placeholder="Select court"
            isLoading={isLoading}
          />
        </>
      )}
      {data && data.length == 0 && !isLoading && (
        <div className="bg-primary p-5 rounded-2xl shadow-md mt-5">
          <div className="text-[24px] mb-1 ">⚠️</div>
          You can't form a club in this club as the club doesn't have a
          registered court.
        </div>
      )}
    </div>
  );
};
