import React, { useState } from "react";
import { Link } from "react-router-dom";

import NavigationButton from "@molecules/core/NavigationButton";

import { useCloseOnClickOutItem } from "./hooks/useCloseOnClickOutItem";
// import AuthStore from "@store/account/auth";

import ClubIcon from "@assets/ClubsIcon.svg?react";
import MatchIcon from "@assets/MatchIcon.svg?react";
import FriendsIcon from "@assets/FriendsIcon.svg?react";
import ProfileIcon from "@assets/ProfileIcon.svg?react";
import AddIcon from "@assets/AddIcon.svg?react";

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClick = () => {
    setIsOpen((prev) => !prev);
    navigator.vibrate(30);
  };

  const ref = useCloseOnClickOutItem(setIsOpen);

  // const permission =
  //   AuthStore.authUser?.status == "club_admin" ||
  //   AuthStore.authUser?.status == "super_admin";
  const permission = true;

  return (
    <div className="bg-primary p-5 z-20 flex items-center justify-center fixed bottom-0 left-0 w-full shadow-md">
      <div className="w-full flex justify-around items-end">
        <NavigationButton
          href="/profile"
          icon={<ProfileIcon />}
          text="Profile"
        />
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
          {isOpen && (
            <div className="absolute mb-5 bottom-[100%] left-1/2 -translate-x-1/2 bg-amber-500">
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
        <NavigationButton href="/matches" icon={<MatchIcon />} text="Matches" />
        <NavigationButton href="/clubs" icon={<ClubIcon />} text="Clubs" />
      </div>
    </div>
  );
};