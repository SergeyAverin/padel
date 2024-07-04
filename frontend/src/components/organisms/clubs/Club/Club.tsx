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
    <div className="rounded-2xl p-4 bg-primary">
      <h2 className="text-[16px] font-bold">{club.name}</h2>
      <div className="flex mt-5  justify-between">
        <div className="flex w-full  items-center">
          <AddressIcon />
          <div className="text-[12px] font-medium ml-3">{club.address}</div>
        </div>
        <div>
          {ClubStore.bookmarks.has(club.id) && <Bookmark clubId={club.id} />}
        </div>
      </div>
      <div className="mt-5">
        <Link to={`/clubs/${club.id}`}>
          <Button variant={ButtonVariant.OUTLINED}>Show more</Button>
        </Link>
      </div>
    </div>
  );
});
