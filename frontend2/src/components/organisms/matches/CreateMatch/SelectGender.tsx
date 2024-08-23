import { selectGender } from "@redux/features/creaetMatchSlice";
import { Gender } from "@schemas/user";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const SelectGender: React.FC = () => {
  const [selectedGender, setSelectetGender] = useState(Gender.ANY);
  const discpatch = useDispatch();

  useEffect(() => {
    discpatch(selectGender(Gender.ANY));
  }, []);

  const onClick = (gender: Gender) => {
    setSelectetGender(gender);
    discpatch(selectGender(gender));
  };

  return (
    <>
      <div className="text-[18px]">Select gender:</div>

      <div className="flex mt-3">
        <div
          className={classNames("text-[16px]", {
            "text-highlight border-b-2 border-highlight":
              selectedGender == Gender.ANY,
          })}
          onClick={() => onClick(Gender.ANY)}
        >
          Any
        </div>
        <div
          className={classNames("ml-5  text-[16px]", {
            "text-highlight border-b-2 border-highlight":
              selectedGender == Gender.MAN,
          })}
          onClick={() => onClick(Gender.MAN)}
        >
          Man
        </div>
        <div
          className={classNames("ml-5 text-[16px]", {
            "text-highlight border-b-2 border-highlight":
              selectedGender == Gender.WOMAN,
          })}
          onClick={() => onClick(Gender.WOMAN)}
        >
          Woman
        </div>
      </div>
    </>
  );
};
