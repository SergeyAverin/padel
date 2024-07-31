import React, { useState } from "react";

import UserPhoto from "@molecules/account/UserPhoto";

import TestPhoto from "@assets/TestPhoto.png";
import AddIcon from "@assets/AddTagIcon.svg?react";

export const AddTextUserInMatch: React.FC = () => {
  const [value, setValue] = useState("");
  return (
    <div
      // onClick={() => selectUser(item.telegram_user_id)}
      className="flex bg-bg p-3 rounded-2xl mt-5 items-center"
    >
      <div className="w-[72px] h-[72px]">
        <UserPhoto avatar={TestPhoto} />
      </div>
      <div className="ml-5 ">
        <input
          className="bg-bg border-b-2 border-grey mb-5 mt-2 text-24px h-[50px]"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
        ></input>
        <div className="border-2 p-1 pl-3 rounded-full border-highlight  w-[130px] text-center flex items-center justify-center">
          <AddIcon stroke="#fff" />
          <div>add user</div>
        </div>
      </div>
    </div>
  );
};
