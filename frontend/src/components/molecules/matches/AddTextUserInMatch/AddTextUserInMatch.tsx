import React, { useState } from "react";

import UserPhoto from "@molecules/account/UserPhoto";

import TestPhoto from "@assets/TestPhoto.png";
import AddUserStore from "@store/matches/addUserInMatch";

export const AddTextUserInMatch: React.FC = () => {
  const [value, setValue] = useState("");
  const selectUser = () => {
    AddUserStore.toggleIsOpen();
    AddUserStore.setUser(value, true);
  };
  return (
    <div className="flex bg-bg p-3 rounded-2xl mt-5 items-center">
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
          <div className="mr-3">+</div>
          <div onClick={() => selectUser()}>add user</div>
        </div>
      </div>
    </div>
  );
};
