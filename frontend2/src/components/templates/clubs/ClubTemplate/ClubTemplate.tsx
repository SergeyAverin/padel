import React from "react";

import AddressIcon from "@assets/AddressIcon.svg?react";
import FlagIcon from "@assets/ClubsIcon.svg?react";
import ClockIcon from "@assets/ClockIcon.svg?react";
import {
  Button,
  ButtonVariant,
  Heading,
  HeadingVariant,
  Spinner,
} from "@atoms/index";
import { shortenString } from "@utils/shoringString";
import Bookmark from "@molecules/clubs/Bookmark";
import { Link, useParams } from "react-router-dom";
import Tabs from "@molecules/core/Tabs";
import { useAuthUser } from "@hooks/useAuthUser";
import { useGetClubByIdQuery } from "@redux/api/clubApi";
import { Country } from "country-state-city";
import ClubPhotos from "@organisms/clubs/ClubPhotos";

export const ClubTemplate: React.FC = () => {
  const { clubId } = useParams();
  const { data, isLoading } = useGetClubByIdQuery(clubId as string);
  const tabs = [
    {
      to: "#match",
      text: "match",
      content: <div className="pt-[50px]">{/* <ClubMatches /> */}</div>,
    },
    {
      to: "#photos",
      text: "Photos",
      content: (
        <div className="pt-[50px]">
          <ClubPhotos clubId={clubId as string} />
        </div>
      ),
    },
  ];
  const authUser = useAuthUser;
  const permission = true;
  // authUser?.id == ClubStore.openedClub?.owner_id ||
  // authUser?.status == "super_admin";
  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && data ? (
        <div className="p-5 pb-[350px]">
          <div className="mb-5">
            <Heading variant={HeadingVariant.H1}>
              {shortenString(data.name, 24)}
            </Heading>
          </div>
          <div className="flex justify-between">
            <div>
              <div className="flex w-full  items-center">
                <AddressIcon />
                <div className="text-[12px] font-medium ml-3">
                  {shortenString(data.address, 54)}
                </div>
              </div>

              <div className="flex w-full  items-center">
                <FlagIcon />
                <div className="text-[12px] font-medium ml-3">
                  {shortenString(
                    Country.getCountryByCode(data.country)?.name,
                    54
                  )}{" "}
                  {shortenString(data.city, 54)}
                </div>
              </div>
            </div>
            <Bookmark clubId={data.id} />
          </div>
          <div className="flex justify-between">
            <div className="flex w-full  items-center">
              <ClockIcon />
              <div className="text-[12px] font-medium ml-3">
                {data.opening}-{data.closing}
              </div>
            </div>
          </div>

          <Link to={`/edit/club/${data.id}`}>
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
};
