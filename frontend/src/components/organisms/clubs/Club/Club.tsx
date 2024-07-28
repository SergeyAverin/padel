import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { Button, ButtonVariant } from "@atoms/index";
import Bookmark from "@molecules/clubs/Bookmark";
import { IClub } from "@schemas/club";
import ClubStore from "@store/club";
import style from "./Club.module.sass";

import AddressIcon from "@assets/AddressIcon.svg?react";
import { Link } from "react-router-dom";
import { shortenString } from "@utils/shoringString";

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
        <div className={style.club}>
          <h2 className="text-[16px] font-bold absolute bottom-5  left-2">
            {shortenString(club.name, 20)}
          </h2>
        </div>
        <img
          src={club.avatar}
          className="absolute w-[100%] h-[120px] object-contain "
        />
      </div>
      <div className="flex  justify-between p-4 pt-[135px]">
        <div className="flex w-full  items-center">
          <AddressIcon />
          <div className="text-[12px] font-medium ml-[1px]">
            {shortenString(club.city, 20)}
          </div>
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
