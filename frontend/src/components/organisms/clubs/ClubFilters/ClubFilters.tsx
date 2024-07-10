import React from "react";
import ReactDOM from "react-dom";
import { observer } from "mobx-react-lite";
import classNames from "classnames";
import ClubStore from "@store/club";
import ClubFilterStore from "@store/clubFilter";
import { Button, ButtonVariant, Input, Label } from "@atoms/index";

const ClubFiltersComponent: React.FC = observer(() => {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    ClubStore.getClubs();
    ClubFilterStore.toggleIsOpen();
  };
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
        <form className="w-[250px]" onSubmit={onSubmit}>
          <div className="mt-5">
            <Label htmlFor="name">Name</Label>
            <Input
              name="name"
              value={ClubFilterStore.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                ClubFilterStore.changeName(e.target.value)
              }
            />
          </div>
          <div className="mt-5">
            <Label htmlFor="city">City</Label>
            <Input
              name="city"
              value={ClubFilterStore.city}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                ClubFilterStore.changeCity(e.target.value)
              }
            />
          </div>
          <div className="mt-5">
            <Button variant={ButtonVariant.OUTLINED} type="submit">
              Submit
            </Button>
          </div>
        </form>
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
