import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import NavigationButton from "@molecules/core/NavigationButton";

import { useCloseOnClickOutItem } from "./hooks/useCloseOnClickOutItem";
// import AuthStore from "@store/account/auth";

import ClubIcon from "@assets/ClubsIcon.svg?react";
import MatchIcon from "@assets/MatchIcon.svg?react";
import FriendsIcon from "@assets/FriendsIcon.svg?react";
import ProfileIcon from "@assets/ProfileIcon.svg?react";
import AddIcon from "@assets/AddIcon.svg?react";
import classNames from "classnames";
import { useAuthUser } from "@hooks/useAuthUser";

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClick = () => {
    setIsDisable(true);

    setIsOpen((prev) => !prev);
    navigator.vibrate(30);
  };

  const ref = useCloseOnClickOutItem(setIsOpen);

  const user = useAuthUser();
  const permission =
    user?.status == "club_admin" || user?.status == "super_admin";

  const [isDisable, setIsDisable] = useState(false);
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setIsDisable(false);
      }, 200);
    }
  }, [isOpen]);

  return (
    <>
      {user && (
        <div className="bg-primary p-5 z-20 flex items-center justify-center animate-fade-in fixed bottom-0 left-0 w-full shadow-md">
          <div className="w-full flex justify-around items-end">
            <NavigationButton href="/" icon={<ProfileIcon />} text="Profile" />
            <NavigationButton
              href="/friends"
              icon={<FriendsIcon />}
              text="Friends"
            />
            <div
              className="flex self-center  justify-start  items-center cursor-pointer relative"
              onClick={onClick}
              ref={ref}
            >
              {isDisable && (
                <div
                  className={classNames(
                    "absolute animate-fade-in mb-5 bottom-[100%] left-1/2 -translate-x-1/2 bg-amber-500",
                    {
                      "transition-opacity duration-200 opacity-100": isOpen,
                      "transition-opacity duration-200 opacity-0": !isOpen,
                    }
                  )}
                >
                  {permission && (
                    <Link to={"/create/club"}>
                      <div className="bg-primary p-5 rounded-2xl mb-3 w-[160px] text-center shadow-md">
                        Add club
                      </div>
                    </Link>
                  )}
                  <Link to={"/create/match"}>
                    <div className="bg-primary p-5 rounded-2xl mb-3 w-[160px] text-center shadow-md">
                      Add match
                    </div>
                  </Link>
                </div>
              )}
              <AddIcon stroke="#fff" />
            </div>
            <NavigationButton
              href="/matches"
              icon={<MatchIcon />}
              text="Matches"
            />
            <NavigationButton href="/clubs" icon={<ClubIcon />} text="Clubs" />
          </div>
        </div>
      )}
    </>
  );
};
