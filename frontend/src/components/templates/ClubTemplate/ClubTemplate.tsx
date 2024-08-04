import React from "react";
import { observer } from "mobx-react-lite";

import {
  Button,
  ButtonVariant,
  Heading,
  HeadingVariant,
  Spinner,
} from "@atoms/index";
import ClubStore from "@store/club";

import Tabs from "@molecules/Tabs";
import { Link } from "react-router-dom";
import ClubMatches from "@organisms/clubs/ClubMatches";
import ClubPhotos from "@organisms/clubs/ClubPhotos";
import AuthStore from "@store/auth";
import { shortenString } from "@utils/shoringString";
import Bookmark from "@molecules/clubs/Bookmark";

import AddressIcon from "@assets/AddressIcon.svg?react";
import FlagIcon from "@assets/ClubsIcon.svg?react";
import ClockIcon from "@assets/ClockIcon.svg?react";

export const ClubTemplate: React.FC = observer(() => {
  const tabs = [
    {
      to: "#match",
      text: "match",
      content: (
        <div className="pt-[50px]">
          <ClubMatches />
        </div>
      ),
    },
    {
      to: "#photos",
      text: "Photos",
      content: (
        <div className="pt-[50px]">
          <ClubPhotos />
        </div>
      ),
    },
  ];
  const permission =
    AuthStore.authUser?.id == ClubStore.openedClub?.owner_id ||
    AuthStore.authUser?.status == "super_admin";
  return (
    <>
      {ClubStore.openedClub ? (
        <div className="p-5 pb-[350px]">
          <div className="mb-5">
            <Heading variant={HeadingVariant.H1}>
              {shortenString(ClubStore.openedClub?.name, 24)}
            </Heading>
          </div>
          <div className="flex justify-between">
            <div>
              <div className="flex w-full  items-center">
                <AddressIcon />
                <div className="text-[12px] font-medium ml-3">
                  {shortenString(ClubStore.openedClub?.address, 54)}
                </div>
              </div>

              <div className="flex w-full  items-center">
                <FlagIcon />
                <div className="text-[12px] font-medium ml-3">
                  {shortenString(ClubStore.openedClub?.country, 54)}{" "}
                  {shortenString(ClubStore.openedClub?.city, 54)}
                </div>
              </div>
            </div>
            <Bookmark clubId={ClubStore.openedClub.id} />
          </div>
          <div className="flex justify-between">
            <div className="flex w-full  items-center">
              <ClockIcon />
              <div className="text-[12px] font-medium ml-3">
                {ClubStore.openedClub.opening}-{ClubStore.openedClub.closing}
              </div>
            </div>
          </div>

          <Link to={`/edit/club/${ClubStore.openedClub.id}`}>
            <div className="w-[150px] mt-5 mb-5">
              {permission && (
                <Button variant={ButtonVariant.OUTLINED}>Edit</Button>
              )}
            </div>
          </Link>

          <Tabs subTab={tabs} />
        </div>
      ) : (
        <div>
          <Spinner />
        </div>
      )}
    </>
  );
});
