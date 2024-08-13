import React from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";

import { Button, ButtonVariant, Input } from "@atoms/index";

import CloseIcon from "@assets/CloseIcon.svg?react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCity,
  setIsOpenPanel,
  setName,
} from "@redux/features/clubFilterSlice";
import {
  citySelector,
  isOpenPanelSelector,
  nameSelector,
} from "@redux/selectors/clubFilterSelectors";

const ClubFiltersComponent: React.FC = () => {
  const dispatch = useDispatch();
  const isOpenPanel = useSelector(isOpenPanelSelector);
  const city = useSelector(citySelector);
  const name = useSelector(nameSelector);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setIsOpenPanel(false));
  };
  return (
    <div
      className={classNames(
        "fixed left-0 bg-primary text-fg w-full h-full z-10 transition-all",
        {
          "top-0": isOpenPanel,
          "top-[100%]": !isOpenPanel,
        }
      )}
    >
      <div className="pt-[70px] pl-5 pr-5 z-20 relative">
        <div
          className="absolute right-[40px] top-[40px]"
          onClick={() => dispatch(setIsOpenPanel(false))}
        >
          <CloseIcon stroke="#fff" />
        </div>
        <form className=" mx-auto" onSubmit={onSubmit}>
          <div className="mt-5">
            {/* <Label htmlFor="name">Name</Label> */}
            <Input
              name="name"
              value={name}
              requirement={false}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                dispatch(setName(e.target.value))
              }
            />
          </div>
          <div className="mt-5">
            {/* <Label htmlFor="city">City</Label> */}
            <Input
              name="city"
              value={city}
              requirement={false}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                dispatch(setCity(e.target.value))
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
};

export const ClubFilters = () => {
  return ReactDOM.createPortal(
    <ClubFiltersComponent />,
    document.querySelector("#filter") as Element
  );
};
