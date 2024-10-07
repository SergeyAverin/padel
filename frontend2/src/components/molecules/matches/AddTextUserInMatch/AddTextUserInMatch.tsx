import React, { useState } from "react";

import UserPhoto from "@molecules/user/UserPhoto";

import TestPhoto from "@assets/TestPhoto.png";
import { useAddTextUserMutation } from "@redux/api/addUserInMatchApi";
import { useDispatch, useSelector } from "react-redux";
import { closePanel } from "@redux/features/addUserInMatch";
import {
  indexSelector,
  matchIdSelector,
} from "@redux/selectors/addUserInMatch";
import {
  changeIsOpenPanel,
  setUserInMatch,
} from "@redux/features/creaetMatchSlice";
import { userIndexSelector } from "@redux/selectors/createMatchSelectors";
// import AddUserStore from "@store/matches/addUserInMatch";

interface IAddTextUserInMatchProps {
  isMatchCreator?: boolean;
}

export const AddTextUserInMatch: React.FC<IAddTextUserInMatchProps> = ({
  isMatchCreator = false,
}) => {
  const [value, setValue] = useState("");
  const [addUserInMatch] = useAddTextUserMutation();
  const dispatch = useDispatch();
  const matchId = useSelector(matchIdSelector);
  const index = useSelector(isMatchCreator ? userIndexSelector : indexSelector);

  const selectUser = () => {
    if (isMatchCreator == false) {
      dispatch(closePanel());
      addUserInMatch({
        match_id: matchId as number,
        text_user: value,
        user_indx: index as number,
      });
    } else {
      dispatch(changeIsOpenPanel(false));
      dispatch(
        setUserInMatch({
          index: index as number,
          value: value,
        })
      );
    }
    // AddUserStore.toggleIsOpen();
    // AddUserStore.setUser(value, true);
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
