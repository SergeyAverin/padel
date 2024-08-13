import React, { useEffect, useState } from "react";
import classNames from "classnames";

import CloseIcon from "@assets/CloseIcon.svg?react";

interface IHelpBanner extends React.PropsWithChildren {
  localStorageKey: string;
  isInNavigation?: boolean;
}

export const HelpBanner: React.FC<IHelpBanner> = ({
  localStorageKey,
  children,
  isInNavigation = false,
}) => {
  const [isShow, setIsShow] = useState(true);
  const [isDisable, setIsDisable] = useState(true);
  useEffect(() => {
    if (!localStorage.getItem(localStorageKey)) {
      setIsDisable(false);
    }
  }, []);
  const onClose = () => {
    setIsShow(false);
    localStorage.setItem(localStorageKey, "true");
  };
  useEffect(() => {
    if (!isShow) {
      setTimeout(() => {
        setIsDisable(true);
      }, 200);
    }
  }, [isShow]);
  return (
    <>
      {!isDisable && (
        <div
          className={classNames("flex justify-center items-center", {
            "transition-opacity duration-200 opacity-100": isShow,
            "transition-opacity duration-200 opacity-0": !isShow,
          })}
        >
          <div
            className={classNames("p-5 mt-5 bg-primary rounded-2xl shadow-md", {
              "relative w-full mx-auto": !isInNavigation,
              "fixed z-10 bottom-[100px] w-[90%] mx-auto": isInNavigation,
            })}
          >
            <div className=" absolute right-5 top-5" onClick={onClose}>
              <CloseIcon stroke="#fff" />
            </div>
            <div className="text-[16px] w-[90%]">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};
