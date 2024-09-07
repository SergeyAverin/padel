import React, { useEffect, useState } from "react";
import Select from "@atoms/Select";

import { Label } from "@atoms/index";
import { observer } from "mobx-react-lite";
import { useAuthUser } from "@hooks/useAuthUser";
import { useDispatch } from "react-redux";
import {
  selectLvlEndAction,
  selectLvlStartAction,
} from "@redux/features/creaetMatchSlice";

interface Option {
  value: string;
  label: string;
}
const options = [
  { label: "0", value: "0" },
  { label: "0.5", value: "0.5" },
  { label: "1", value: "1" },
  { label: "1.5", value: "1.5" },
  { label: "2", value: "2" },
  { label: "2.5", value: "2.5" },
  { label: "3", value: "3" },
  { label: "3.5", value: "3.5" },
  { label: "4", value: "4" },
  { label: "4.5", value: "4.5" },
  { label: "5", value: "5" },
  { label: "5.5", value: "5.5" },
  { label: "6", value: "6" },
  { label: "6.5", value: "6.5" },
  { label: "7", value: "7" },
  { label: "7.5", value: "7.5" },
  { label: "8", value: "8" },
  { label: "8.5", value: "8.5" },
  { label: "9", value: "9" },
  { label: "9.5", value: "9.5" },
  { label: "10", value: "10" },
];
export const SelectMatchLvl: React.FC = observer(() => {
  const [selectMinLvl, setSelectMinLvl] = useState<Option>(options[0]);
  const [selextMaxLvl, setSelectMaxLvl] = useState<Option>(options[0]);
  const discpatch = useDispatch();

  const handleChangMinLvlOption = (option: Option) => {
    if (option) {
      setSelectMinLvl(option);
      discpatch(selectLvlStartAction(String(option.value)));
    }
  };

  const handleChangMaxLvlOption = (option: Option) => {
    if (option) {
      setSelectMaxLvl(option);
      discpatch(selectLvlEndAction(String(option.value)));
    }
  };

  const user = useAuthUser();
  useEffect(() => {
    if (user) {
      setSelectMinLvl({
        label: String(user.lvl - 0.5),
        value: String(user.lvl - 0.5),
      });

      discpatch(selectLvlStartAction(String(user.lvl - 0.5)));
      discpatch(selectLvlEndAction(String(user.lvl + 0.5)));

      setSelectMaxLvl({
        label: String(user.lvl + 0.5),
        value: String(user.lvl + 0.5),
      });
    }
  }, [user]);

  return (
    <div className="mt-5">
      <>
        <Label>Select the level of the game:</Label>

        <div className="flex  mt-2">
          <Select
            defaultValue={selectMinLvl}
            onChange={handleChangMinLvlOption}
            options={options}
            placeholder="Select min lvl"
          />
          <div className="text-[24px] ml-5 mr-5">-</div>
          <Select
            defaultValue={selextMaxLvl}
            onChange={handleChangMaxLvlOption}
            options={options}
            placeholder="Select max lvl"
          />
        </div>
        <div className="mt-5">
          The game level determines what level a user must have to participate
          in a game. The default game level is ±0.5 of your level, but you can
          specify a different range.
        </div>
      </>
    </div>
  );
});
