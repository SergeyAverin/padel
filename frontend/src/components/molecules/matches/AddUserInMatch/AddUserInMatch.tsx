import { IMatch } from "@schemas/match";
import AuthStore from "@store/auth";
import AddUserInMatchStore from "@store/addUserInMatch";
import React from "react";

interface IAddUserInMatchProps {
  match: IMatch;
}

export const AddUserInMatch: React.FC<IAddUserInMatchProps> = ({ match }) => {
  const addUser = () => {
    AddUserInMatchStore.toggleIsOpen();
  };
  const joinInMatch = () => {
    alert(match.id);
  };
  const onClick = () => {
    if (AuthStore.authUser && match.owner_id == AuthStore.authUser.id) {
      addUser();
      alert(AuthStore.authUser.id);
    } else {
      alert(AuthStore.authUser?.id);
      joinInMatch();
    }
  };
  return (
    <>
      <div className="flex flex-col justify-center p-2" onClick={onClick}>
        <div className="w-[60px] h-[60px] border-2 border-highlight text-highlight rounded-full border-dashed flex justify-center items-center">
          +
        </div>
        <div className="text-[12px] text-center mt-2">1</div>
        <div className="text-[12px] text-center mt-1">1</div>
      </div>
    </>
  );
};
