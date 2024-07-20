import React from "react";
import ReactDOM from "react-dom";
import { observer } from "mobx-react-lite";
import classNames from "classnames";
import AddUserStore from "@store/addUserInMatch";
import FriendStore from "@store/friends";
import { IUser } from "@schemas/user";

const AddUserInMatchPanel: React.FC = observer(() => {
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
          X
        </div>
        {AddUserStore.index}
        {FriendStore.friends.map((item) => (
          <div onClick={() => selectUser(item.telegram_user_id)}>
            {item.username}
          </div>
        ))}
      </div>
    </div>
  );
});

export const AddUserPanel = () => {
  return ReactDOM.createPortal(
    <AddUserInMatchPanel />,
    document.querySelector("#add-user-panel") as Element
  );
};
