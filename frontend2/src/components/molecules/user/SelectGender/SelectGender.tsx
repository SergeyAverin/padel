import { useAuthUser } from "@hooks/useAuthUser";
import { Gender } from "@schemas/user";
import classNames from "classnames";
import React, { useState } from "react";

interface SelectGenderProps {
  setGender: (gender: Gender) => void;
}

export const SelectGender: React.FC<SelectGenderProps> = ({ setGender }) => {
  const user = useAuthUser();
  const [selectedGender, setSelectetGender] = useState(user?.gender as Gender);
  const onClick = (gender: Gender) => {
    setSelectetGender(gender);
    setGender(gender);
  };

  return (
    <>
      <div className="text-[18px]">Select gender:</div>
      <div className="flex mt-3 items-center">
        <div
          className={classNames("text-[16px] p-3", {
            "bg-highlight rounded-2xl text-bg": selectedGender == Gender.MAN,
          })}
          onClick={() => onClick(Gender.MAN)}
        >
          Man
        </div>
        <div
          className={classNames("ml-5 text-[16px] p-3", {
            "bg-highlight rounded-2xl text-bg": selectedGender == Gender.WOMAN,
          })}
          onClick={() => onClick(Gender.WOMAN)}
        >
          Woman
        </div>
      </div>
    </>
  );
};
