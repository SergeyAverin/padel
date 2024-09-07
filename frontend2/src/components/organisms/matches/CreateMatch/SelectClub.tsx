import { Label } from "@atoms/index";
import Select from "@atoms/Select";
import { Option } from "@atoms/Select/selectOption";
import { useGetClubsToCreatMatchQuery } from "@redux/api/createMatchApi";
import { selectClub, setIsShowNext } from "@redux/features/creaetMatchSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const SelectClub: React.FC = () => {
  const { data, isLoading } = useGetClubsToCreatMatchQuery();
  const dispatch = useDispatch();
  let options: Array<Option> = [];
  const [selectedClub, setSelectedClub] = useState<Option>(options[0]);
  if (data) {
    options = data.map((club) => ({
      label: club.name,
      value: String(club.id),
    }));
  }

  useEffect(() => {
    if (!isLoading) {
      if (options.length > 0) {
        setSelectedClub(options[0]);
      }
    }
  }, [isLoading]);
  const handleChangeClubOption = (option: Option) => {
    setSelectedClub(option);
  };
  useEffect(() => {
    if (selectedClub) {
      dispatch(selectClub(Number(selectedClub.value)));
      dispatch(setIsShowNext(true));
    } else {
      dispatch(setIsShowNext(false));
    }
  }, [selectedClub]);
  return (
    <div>
      <Label>Choose a club where to create a game :</Label>

      <Select
        options={options}
        defaultValue={selectedClub}
        placeholder="Select club"
        isLoading={isLoading}
        onChange={handleChangeClubOption}
      ></Select>

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
