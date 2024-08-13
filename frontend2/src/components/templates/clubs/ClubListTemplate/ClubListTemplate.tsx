import { Heading, HeadingVariant, Spinner } from "@atoms/index";
import Club from "@organisms/clubs/Club";
import { EmptyBanner } from "@organisms/core/EmptyBanner/EmptyBanner";
import HelpBanner from "@organisms/core/HelpBanner";
import {
  useGetBookmarkedClubsQuery,
  useGetClubsQuery,
} from "@redux/api/clubApi";
import React from "react";

export const ClubListTemplate: React.FC = () => {
  const bookarkedClubs = useGetBookmarkedClubsQuery();
  const loadClubs = useGetClubsQuery("");
  return (
    <>
      <HelpBanner localStorageKey="help_clubs" isInNavigation={true}>
        On this page you can find a club to play padel and add it to your
        bookmarks.
      </HelpBanner>
      {/* fillter */}

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
