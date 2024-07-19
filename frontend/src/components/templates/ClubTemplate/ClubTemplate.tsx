import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import {
  Button,
  ButtonVariant,
  Heading,
  HeadingVariant,
  Spinner,
} from "@atoms/index";
import Match from "@organisms/matches/Match";
import ClubStore from "@store/club";
import MatchStore from "@store/match";

import AddressIcon from "@assets/AddressIcon.svg?react";
import Tabs from "@molecules/Tabs";
import { Link } from "react-router-dom";
import ClubPhoto from "@organisms/clubs/ClubPhoto";
import { EmptyBanner } from "@organisms/EmptyBanner/EmptyBanner";

export const ClubTemplate: React.FC = observer(() => {
  useEffect(() => {
    if (ClubStore.openedClub) {
      MatchStore.loadClubMatches(ClubStore.openedClub?.id);
      ClubStore.loadClubPhotos(ClubStore.openedClub?.id);
    }
  }, [ClubStore.openedClub]);
  useEffect(() => {
    return () => {
      MatchStore.matches = [];
      ClubStore.clubPhotos = [];
      ClubStore.openedClub = null;
    };
  }, []);
  const tabs = [
    {
      to: "#match",
      text: "match",
      content: (
        <div>
          <div>
            {MatchStore.matches.map((match) => (
              <div key={match.id} className="mt-5">
                <Match />
              </div>
            ))}
            {MatchStore.matches.length == 0 && (
              <EmptyBanner text="Club have not matches" />
            )}
          </div>
        </div>
      ),
    },
    {
      to: "#photos",
      text: "Photos",
      content: (
        <div>
          {ClubStore.clubPhotos.map((photo) => (
            <div key={photo.id}>
              <ClubPhoto photo={photo} />
            </div>
          ))}
          {ClubStore.clubPhotos.length == 0 && (
            <EmptyBanner text="Club have not photos" />
          )}
        </div>
      ),
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
