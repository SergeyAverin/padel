import React from "react";

import NavigationButton from "@molecules/NavigationButton";

import ClubIcon from "@assets/ClubsIcon.svg?react";
import MatchIcon from "@assets/MatchIcon.svg?react";
import FriendsIcon from "@assets/FriendsIcon.svg?react";
import ProfileIcon from "@assets/ProfileIcon.svg?react";

export const Navigation: React.FC = () => {
  return (
    <div className="bg-primary p-5 flex items-center justify-center fixed bottom-0 left-0 w-full">
      <div className="w-full flex justify-around items-end">
        <NavigationButton href="/clubs" icon={<ClubIcon />} text="profile" />
        <NavigationButton href="/matches" icon={<MatchIcon />} text="profile" />
        <NavigationButton
          href="/friends"
          icon={<FriendsIcon />}
          text="friends"
        />
        <NavigationButton
          href="/profile"
          icon={<ProfileIcon />}
          text="profile"
        />
      </div>
    </div>
  );
};
