import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

import { Button, ButtonVariant, Heading, HeadingVariant } from "@atoms/index";
import UserInfo from "@organisms/account/UserInfo";
import UserStats from "@organisms/account/UserStats";
import PadelInfo from "@organisms/account/PadelInfo";
import MatchStore from "@store/match";
import Match from "@organisms/matches/Match";
import { EmptyBanner } from "@organisms/EmptyBanner/EmptyBanner";
import AuthStore from "@store/auth";

import EmptyIcon from "@assets/EmptyIcon.svg?react";
import RelationButton from "@organisms/account/RelationButton";

export const UserTemplate: React.FC = () => {
  return (
    <div className="p-2">
      <UserInfo />
      <div className="mt-[30px]">
        <div className="w-[250px]">
          {/* <Link to="/profile/edit">
            <Button variant={ButtonVariant.OUTLINED}>Edit</Button>
          </Link> */}
          <RelationButton />
        </div>
      </div>
      <div className="mt-[30px]">
        <Heading variant={HeadingVariant.H1}>Padel info:</Heading>
        <div className="mt-[8px]">
          <PadelInfo />
        </div>
      </div>
      <div className="mt-[30px]">
        <Heading variant={HeadingVariant.H1}>Stats:</Heading>
        <div className="mt-[8px]">
          <UserStats />
        </div>
      </div>
      <div>
        <div className="mt-5 ">
          <Heading variant={HeadingVariant.H2}>Matches:</Heading>
        </div>
        <div className="pb-[200px]">
          {MatchStore.matches.length == 0 && (
            <div className="mt-[80px]">
              <EmptyBanner text="You have not matches" icon={<EmptyIcon />} />
            </div>
          )}
          {MatchStore.matches.map((match) => (
            <div key={match.id} className="mt-5">
              <Match />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};