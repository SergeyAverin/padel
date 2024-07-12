import React, { useState } from "react";

import NavigationButton from "@molecules/NavigationButton";

import ClubIcon from "@assets/ClubsIcon.svg?react";
import MatchIcon from "@assets/MatchIcon.svg?react";
import FriendsIcon from "@assets/FriendsIcon.svg?react";
import ProfileIcon from "@assets/ProfileIcon.svg?react";
import AddIcon from "@assets/AddIcon.svg?react";
import { Link } from "react-router-dom";

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClick = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className="bg-primary p-5 flex items-center justify-center fixed bottom-0 left-0 w-full">
      <div className="w-full flex justify-around items-end">
        <NavigationButton href="/clubs" icon={<ClubIcon />} text="Clubs" />
        <NavigationButton href="/matches" icon={<MatchIcon />} text="Matches" />

        <div
          className="flex self-center  justify-start  items-center cursor-pointer relative"
          onClick={onClick}
        >
          {isOpen && (
            <div className="absolute mb-5 bottom-[100%] left-1/2 -translate-x-1/2 bg-amber-500">
              <Link to={"/create/club"}>
                <div className="bg-primary p-5 rounded-2xl mb-3 w-[160px] text-center">
                  Add club
                </div>
              </Link>
              {/* <Link to={"/create/match"}>
                <div className="bg-primary p-5 rounded-2xl mb-3 w-[160px] text-center">
                  Add match
                </div>
              </Link> */}
            </div>
          )}
          <AddIcon />
        </div>
        <NavigationButton
          href="/friends"
          icon={<FriendsIcon />}
          text="Friends"
        />
        <NavigationButton
          href="/profile"
          icon={<ProfileIcon />}
          text="Profile"
        />
      </div>
    </div>
  );
};
