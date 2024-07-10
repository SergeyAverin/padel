import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { Button, ButtonVariant } from "@atoms/index";
import Bookmark from "@molecules/clubs/Bookmark";
import { IClub } from "@schemas/club";
import ClubStore from "@store/club";

import AddressIcon from "@assets/AddressIcon.svg?react";
import { Link } from "react-router-dom";

interface IClubProps {
  club: IClub;
}

export const Club: React.FC<IClubProps> = observer(({ club }) => {
  useEffect(() => {
    ClubStore.getIsBookmark(club.id);
  }, []);
  return (
    <div className="rounded-2xl  bg-primary">
      <div className="relative">
        <img src={club.avatar} className="absolute" />
        <h2 className="text-[16px] font-bold absolute top-[100%] left-0">
          {club.name}
        </h2>
      </div>
      <div className="flex  justify-between p-4 pt-[135px]">
        <div className="flex w-full  items-center">
          <AddressIcon />
          <div className="text-[12px] font-medium ml-3">{club.address}</div>
        </div>
        <div>
          {ClubStore.bookmarks.has(club.id) && <Bookmark clubId={club.id} />}
        </div>
      </div>
      <div className="p-3">
        <Link to={`/clubs/${club.id}`}>
          <Button variant={ButtonVariant.OUTLINED}>Show more</Button>
        </Link>
      </div>
    </div>
  );
});
