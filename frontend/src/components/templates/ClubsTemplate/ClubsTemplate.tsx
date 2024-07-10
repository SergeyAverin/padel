import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { Heading, HeadingVariant } from "@atoms/index";
import ClubStore from "@store/club";
import ClubFilterStore from "@store/clubFilter";
import Club from "@organisms/clubs/Club";

import FilterIcon from "@assets/FilterIcon.svg?react";
import ClubFilters from "@organisms/clubs/ClubFilters";
import Tag from "@molecules/friends/Tag";

export const ClubsTemplate: React.FC = observer(() => {
  useEffect(() => {
    ClubStore.getClubs();
    ClubStore.getBookedClubs();
  }, []);

  return (
    <>
      <ClubFilters />
      <div className="p-3">
        <Heading variant={HeadingVariant.H2}>Clubs</Heading>

        {ClubStore.bookmarkedClubs.length > 0 && (
          <>
            <div className="mt-5">
              <Heading variant={HeadingVariant.H2}>Bookmarked clubs</Heading>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-5">
              {ClubStore.bookmarkedClubs.map((club) => (
                <Club club={club} key={club.id} />
              ))}
            </div>
          </>
        )}
        <div className="mt-5">
          <Heading variant={HeadingVariant.H2}>Search clubs</Heading>
        </div>
        <div className="p-5">
          <div className="flex items-center">
            <div>
              <FilterIcon onClick={() => ClubFilterStore.toggleIsOpen()} />
            </div>
            {ClubFilterStore.name != "" && (
              <div
                onClick={() => {
                  ClubFilterStore.changeName("");
                  ClubStore.getClubs();
                }}
              >
                <Tag id={1} isAdd={false} text={ClubFilterStore.name} />
              </div>
            )}
            {ClubFilterStore.city != "" && (
              <div
                onClick={() => {
                  ClubFilterStore.changeCity("");
                  ClubStore.getClubs();
                }}
              >
                <Tag id={2} isAdd={false} text={ClubFilterStore.city} />
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-5">
          {ClubStore.clubs.map((club) => (
            <Club club={club} key={club.id} />
          ))}
        </div>
      </div>
    </>
  );
});
