import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";

import { Button, ButtonVariant, Input } from "@atoms/index";

import CloseIcon from "@assets/CloseIcon.svg?react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCity,
  setIsAwaitSearch,
  setIsOpenPanel,
  setName,
} from "@redux/features/clubFilterSlice";
import { isOpenPanelSelector } from "@redux/selectors/clubFilterSelectors";
import { baseApi } from "@redux/baseApi";
import { TAGS } from "@redux/tags";
import SelectCountry from "@molecules/core/SelectCountry";
import { SelectCity } from "@molecules/core/SelectCity/SelectCity";

const ClubFiltersComponent: React.FC = () => {
  const dispatch = useDispatch();
  const isOpenPanel = useSelector(isOpenPanelSelector);
  const [localCity, setLocalCity] = useState("");
  const [localName, setLocalName] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setIsAwaitSearch(true));
    dispatch(baseApi.util.invalidateTags([TAGS.CLUB]));
    dispatch(setName(localName));
    dispatch(setCity(localCity));
    dispatch(setIsOpenPanel(false));
  };

  const [country, setCountry] = useState("");

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
              value={localName}
              requirement={false}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setLocalName(e.target.value);
              }}
            />
          </div>
          <div className="mt-5">
            <SelectCountry country={country} setCountry={setCountry} />
          </div>
          <div className="mt-5">
            <SelectCity
              city={localCity}
              selectedCountry={country}
              setCity={setLocalCity}
            />
            {/* <Label htmlFor="city">City</Label> */}
            {/* <Input
              name="city"
              value={localCity}
              requirement={false}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setLocalCity(e.target.value);
              }}
            /> */}
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
