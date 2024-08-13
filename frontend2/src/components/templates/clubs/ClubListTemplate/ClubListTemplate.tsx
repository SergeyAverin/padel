import { Heading, HeadingVariant } from "@atoms/index";
import Club from "@organisms/clubs/Club";
import HelpBanner from "@organisms/core/HelpBanner";
import { useGetBookmarkedClubsQuery } from "@redux/api/clubApi";
import React from "react";

export const ClubListTemplate: React.FC = () => {
  const bookarkedClubs = useGetBookmarkedClubsQuery();
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
      {/* clubs */}
    </>
  );
};
