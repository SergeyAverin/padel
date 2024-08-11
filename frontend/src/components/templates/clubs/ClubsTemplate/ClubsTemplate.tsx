import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { Heading, HeadingVariant, Loading, Spinner } from "@atoms/index";
import ClubStore from "@store/clubs/club";
import ClubFilterStore from "@store/clubs/clubFilter";
import Club from "@organisms/clubs/Club";

import FilterIcon from "@assets/FilterIcon.svg?react";
import ClubFilters from "@organisms/clubs/ClubFilters";
import Tag from "@molecules/friends/Tag";
import { EmptyBanner } from "@organisms/core/EmptyBanner/EmptyBanner";
import AuthStore from "@store/account/auth";
import HelpBanner from "@organisms/core/HelpBanner";

export const ClubsTemplate: React.FC = observer(() => {
  useEffect(() => {
    ClubStore.getClubs();
    ClubStore.getBookedClubs();
  }, [AuthStore.authUser]);

  return (
    <>
      {ClubStore.isLoading ? (
        <Spinner />
      ) : (
        <>
          <ClubFilters />
          <HelpBanner localStorageKey="help_clubs" isInNavigation={true}>
            On this page you can find a club to play padel and add it to your
            bookmarks.
          </HelpBanner>
          <div className="p-3">
            <Heading variant={HeadingVariant.H1}>Clubs</Heading>

            {ClubStore.bookmarkedClubs.length > 0 && (
              <>
                <div className="mt-5">
                  <Heading variant={HeadingVariant.H3}>
                    Bookmarked clubs
                  </Heading>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-5">
                  {ClubStore.bookmarkedClubs.map((club) => (
                    <Club club={club} key={club.id} />
                  ))}
                </div>
              </>
            )}
            <div className="mt-5">
              <Heading variant={HeadingVariant.H3}>Search clubs</Heading>
            </div>
            <div className="p-5">
              <div className="flex items-center">
                <div className="mr-5">
                  <FilterIcon onClick={() => ClubFilterStore.toggleIsOpen()} />
                </div>
                {ClubFilterStore.name != "" && (
                  <div
                    className="mr-2"
                    onClick={async () => {
                      ClubFilterStore.changeName("");
                      ClubStore.isFilterAwait = true;
                      await ClubStore.getClubs();
                      ClubStore.isFilterAwait = false;
                    }}
                  >
                    <Tag id={1} isAdd={false} text={ClubFilterStore.name} />
                  </div>
                )}
                {ClubFilterStore.city != "" && (
                  <div
                    className="mr-2"
                    onClick={async () => {
                      ClubStore.isFilterAwait = true;
                      ClubFilterStore.changeCity("");
                      await ClubStore.getClubs();
                      ClubStore.isFilterAwait = false;
                    }}
                  >
                    <Tag id={2} isAdd={false} text={ClubFilterStore.city} />
                  </div>
                )}
              </div>
            </div>
            {!ClubStore.isFilterAwait ? (
              <>
                {ClubStore.clubs.length == 0 && (
                  <div className="pt-5 pb-[200px]">
                    <EmptyBanner text="Clubs not found" />
                  </div>
                )}
                <div className="grid grid-cols-2 gap-2 mt-5">
                  {ClubStore.clubs.map((club) => (
                    <Club club={club} key={club.id} />
                  ))}
                </div>
              </>
            ) : (
              <div className="flex justify-center mt-[40px] pb-[80px]">
                <Loading />
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
});
