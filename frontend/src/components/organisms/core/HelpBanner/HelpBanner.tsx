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
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem(localStorageKey)) {
      setIsShow(true);
    }
  }, []);
  const onClose = () => {
    setIsShow(false);
    localStorage.setItem(localStorageKey, "true");
  };
  return (
    <>
      {isShow && (
        <div className="flex justify-center items-center">
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
