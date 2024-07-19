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

import AddressIcon from "@assets/AddressIcon.svg?react";
import Tabs from "@molecules/Tabs";
import { Link } from "react-router-dom";
import ClubMatches from "@organisms/clubs/ClubMatches";
import ClubPhotos from "@organisms/clubs/ClubPhotos";

export const ClubTemplate: React.FC = observer(() => {
  const tabs = [
    {
      to: "#match",
      text: "match",
      content: <ClubMatches />,
    },
    {
      to: "#photos",
      text: "Photos",
      content: <ClubPhotos />,
    },
  ];
  return (
    <>
      {ClubStore.openedClub ? (
        <div className="p-5">
          <Heading variant={HeadingVariant.H1}>
            {ClubStore.openedClub?.name}
          </Heading>
          <div className="flex w-full  items-center">
            <AddressIcon />
            <div className="text-[12px] font-medium ml-3">
              {ClubStore.openedClub?.address}
            </div>
          </div>

          <Link to={`/edit/club/${ClubStore.openedClub.id}`}>
            <div className="w-[150px] mt-5 mb-5">
              <Button variant={ButtonVariant.OUTLINED}>Edit</Button>
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
