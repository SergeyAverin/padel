import React from "react";
import ReactDOM from "react-dom";
import { observer } from "mobx-react-lite";
import classNames from "classnames";
import AddUserStore from "@store/addUserInMatch";

const AddUserInMatchPanel: React.FC = observer(() => {
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
        <div>s</div>
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
