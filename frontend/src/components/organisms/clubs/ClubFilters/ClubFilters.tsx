import React from "react";
import ReactDOM from "react-dom";
import { observer } from "mobx-react-lite";
import classNames from "classnames";
import ClubFilterStore from "@store/clubFilter";

const ClubFiltersComponent: React.FC = observer(() => {
  return (
    <div
      className={classNames(
        "fixed left-0 bg-primary text-fg w-full h-full z-10 transition-all",
        {
          "top-0": ClubFilterStore.isOpen,
          "top-[100%]": !ClubFilterStore.isOpen,
        }
      )}
    >
      <div className="pt-[70px] pl-5 z-20 relative">
        <div
          className="absolute right-[40px] top-[40px]"
          onClick={() => ClubFilterStore.toggleIsOpen()}
        >
          X
        </div>
        filter
      </div>
    </div>
  );
});

export const ClubFilters = () => {
  return ReactDOM.createPortal(
    <ClubFiltersComponent />,
    document.querySelector("#filter") as Element
  );
};
