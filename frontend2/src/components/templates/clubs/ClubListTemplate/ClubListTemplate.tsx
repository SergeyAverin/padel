import { Heading, HeadingVariant, Spinner } from "@atoms/index";
import Tag from "@molecules/friends/Tag";
import Club from "@organisms/clubs/Club";
import { ClubFilters } from "@organisms/clubs/ClubFilter/ClubFilter";
import { EmptyBanner } from "@organisms/core/EmptyBanner/EmptyBanner";
import HelpBanner from "@organisms/core/HelpBanner";
import {
  useGetBookmarkedClubsQuery,
  useGetClubsQuery,
} from "@redux/api/clubApi";
import {
  setCity,
  setIsOpenPanel,
  setName,
} from "@redux/features/clubFilterSlice";
import {
  citySelector,
  isOpenPanelSelector,
  nameSelector,
} from "@redux/selectors/clubFilterSelectors";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import FilterIcon from "@assets/FilterIcon.svg?react";

export const ClubListTemplate: React.FC = () => {
  const bookarkedClubs = useGetBookmarkedClubsQuery();
  const loadClubs = useGetClubsQuery("");
  const dispatch = useDispatch();
  const city = useSelector(citySelector);
  const name = useSelector(nameSelector);
  return (
    <>
      <Heading variant={HeadingVariant.H1}>Clubs</Heading>

      <HelpBanner localStorageKey="help_clubs" isInNavigation={true}>
        On this page you can find a club to play padel and add it to your
        bookmarks.
      </HelpBanner>

      {/* Bookmarked clubs */}
      {!bookarkedClubs.isLoading &&
        bookarkedClubs.data &&
        bookarkedClubs.data.length > 0 && (
          <>
            <div className="mt-5">
              <Heading variant={HeadingVariant.H3}>Bookmarked clubs</Heading>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-5">
              {bookarkedClubs.data.map((club) => (
                <Club club={club} key={club.id} />
              ))}
            </div>
          </>
        )}

      {/*  Clubs */}

      <div className="mt-5">
        <Heading variant={HeadingVariant.H3}>Search clubs</Heading>
      </div>

      {/* fillter */}
      <ClubFilters />
      <div className="p-5">
        <div className="flex items-center">
          <div className="mr-5">
            <FilterIcon onClick={() => dispatch(setIsOpenPanel(true))} />
          </div>
          {name != "" && (
            <div
              className="mr-2"
              onClick={async () => {
                dispatch(setName(""));
              }}
            >
              <Tag id={1} isAdd={false} text={name} />
            </div>
          )}
          {city != "" && (
            <div
              className="mr-2"
              onClick={async () => {
                dispatch(setCity(""));
              }}
            >
              <Tag id={2} isAdd={false} text={city} />
            </div>
          )}
        </div>
      </div>

      {!loadClubs.isLoading && loadClubs.data && (
        <>
          {loadClubs.data.length == 0 && (
            <div className="pt-5 pb-[200px]">
              <EmptyBanner text="Clubs not found" />
            </div>
          )}
          <div className="grid grid-cols-2 gap-2 mt-5">
            {loadClubs.data.map((club) => (
              <Club club={club} key={club.id} />
            ))}
          </div>
        </>
      )}

      {bookarkedClubs.isLoading || (loadClubs.isLoading && <Spinner />)}
    </>
  );
};
