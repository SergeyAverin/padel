import React from "react";
import { observer } from "mobx-react-lite";

import MatchStore from "@store/match";
import { Heading, HeadingVariant, Spinner } from "@atoms/index";
import Match from "@organisms/matches/Match";
import { EmptyBanner } from "@organisms/EmptyBanner/EmptyBanner";
import Tabs from "@molecules/Tabs";

export const MatchTemplate: React.FC = observer(() => {
  const tabs = [
    {
      to: "#your",
      text: "Your",
      content: (
        <>
          {MatchStore.matches.length == 0 && (
            <EmptyBanner text="You have not matches" />
          )}
          {MatchStore.matches.length != 0 && (
            <div>
              <Heading variant={HeadingVariant.H2}>Your match</Heading>
              {MatchStore.matches.map((match) => (
                <div className="mt-3" key={match.id}>
                  <Match />
                </div>
              ))}
            </div>
          )}
        </>
      ),
    },
    {
      to: "#friends",
      text: "Friends",
      content: (
        <>
          {MatchStore.matchesFromFriends.length == 0 && (
            <EmptyBanner text="Your friends have not matches" />
          )}
          {MatchStore.matchesFromFriends.length != 0 && (
            <div className="mt-5">
              <Heading variant={HeadingVariant.H2}>Match from friends</Heading>
              {MatchStore.matchesFromFriends.map((match) => (
                <div className="mt-3" key={match.id}>
                  <Match />
                </div>
              ))}
            </div>
          )}
        </>
      ),
    },
    {
      to: "#clubs",
      text: "Clubs",
      content: (
        <>
          {MatchStore.matchesFromBookmarks.length == 0 && (
            <EmptyBanner text="In your bookmarked clubs have not matches" />
          )}
          {MatchStore.matchesFromBookmarks.length != 0 && (
            <div className="mt-5">
              <Heading variant={HeadingVariant.H2}>
                Match from bookmarked clubs
              </Heading>
              {MatchStore.matchesFromBookmarks.map((match) => (
                <div className="mt-3" key={match.id}>
                  <Match />
                </div>
              ))}
            </div>
          )}
        </>
      ),
    },
  ];
  return (
    <div className="p-5">
      {MatchStore.isLoading ? (
        <Spinner />
      ) : (
        <>
          {MatchStore.matchesFromFriends.length == 0 &&
          MatchStore.matchesFromBookmarks.length == 0 &&
          MatchStore.matches.length == 0 ? (
            <>
              <Heading variant={HeadingVariant.H2}>Matches not found</Heading>
              <EmptyBanner />
            </>
          ) : (
            <>
              <Tabs subTab={tabs} />
            </>
          )}
        </>
      )}
    </div>
  );
});
