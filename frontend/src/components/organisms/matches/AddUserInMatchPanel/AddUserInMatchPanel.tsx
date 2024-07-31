import React from "react";
import { observer } from "mobx-react-lite";
import classNames from "classnames";
import AddUserStore from "@store/addUserInMatch";
import FriendStore from "@store/friends";
import UserPhoto from "@molecules/account/UserPhoto";

import CloseIcon from "@assets/CloseIcon.svg?react";
import AddTextUserInMatch from "@molecules/matches/AddTextUserInMatch";

interface IAddUserInMatchPanelProps {
  matchId: number;
}
const AddUserInMatchPanel: React.FC<IAddUserInMatchPanelProps> = observer(
  () => {
    const selectUser = (user_id: string) => {
      AddUserStore.toggleIsOpen();
      AddUserStore.setUser(user_id);
    };
    return (
      <div
        className={classNames(
          "fixed left-0 bg-primary text-fg w-full h-full z-10 transition-all",
          {
            "top-0": AddUserStore.isOpen,
            "top-[100%]": !AddUserStore.isOpen,
          }
        )}
      >
        <div className="pt-[70px] pl-5 pr-5 z-20 relative">
          <div
            className="absolute right-[40px] top-[40px]"
            onClick={() => AddUserStore.toggleIsOpen()}
          >
            <CloseIcon stroke="#fff" />
          </div>
          <div
            onClick={() => selectUser("-1")}
            className="flex bg-bg p-3 rounded-2xl items-center mt-5"
          >
            <div className="w-[72px] h-[72px]">
              <div className="w-[72px] h-[72px] border-2 border-highlight text-highlight rounded-full border-dashed flex justify-center items-center">
                +
              </div>
            </div>
            <div>
              <div className="text-[18px] ml-3">Empty</div>
            </div>
          </div>
          <div className="mt-5 mb-5">
            <AddTextUserInMatch />
          </div>
          {FriendStore.friends.map((item) => (
            <div
              onClick={() => selectUser(item.telegram_user_id)}
              key={item.id}
              className="flex bg-bg p-3 rounded-2xl mt-5 items-center"
            >
              <div className="w-[72px] h-[72px]">
                <UserPhoto avatar={item.avatar} lvl={item.lvl} />
              </div>
              <div>
                <div className="text-[24px] ml-3">{item.username}</div>
                <div className="text-[14px] ml-3">{item.first_name}</div>
                <div className="text-[14px] ml-3">{item.last_name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
);
interface IAddUserPanelProps {
  matchId: number;
}
export const AddUserPanel: React.FC<IAddUserPanelProps> = ({ matchId }) => {
  // return ReactDOM.createPortal(
  //   <AddUserInMatchPanel matchId={matchId} />,
  //   document.querySelector("#add-user-panel") as Element
  // );
  return <AddUserInMatchPanel matchId={matchId} />;
};
