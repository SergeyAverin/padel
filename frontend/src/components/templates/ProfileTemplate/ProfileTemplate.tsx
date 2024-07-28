import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

import {
  Button,
  ButtonVariant,
  Heading,
  HeadingVariant,
  Loading,
} from "@atoms/index";
import UserInfo from "@organisms/account/UserInfo";
import UserStats from "@organisms/account/UserStats";
import PadelInfo from "@organisms/account/PadelInfo";
import MatchStore from "@store/match";
import Match from "@organisms/matches/Match";
import { EmptyBanner } from "@organisms/EmptyBanner/EmptyBanner";
import AuthStore from "@store/auth";

import EmptyIcon from "@assets/EmptyIcon.svg?react";
import { IUser } from "@schemas/user";

export const ProfileTemplate: React.FC = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (AuthStore.authUser) {
      setIsLoading(true);
      MatchStore.loadUserMatches(AuthStore.authUser.telegram_user_id).then(
        () => {
          setIsLoading(false);
        }
      );
    }
  }, []);

  return (
    <div className="p-2">
      <UserInfo user={AuthStore.authUser as IUser} />
      <div className="mt-[30px]">
        <div className="w-[250px]">
          <Link to="/profile/edit">
            <Button variant={ButtonVariant.OUTLINED}>Edit</Button>
          </Link>
        </div>
      </div>
      <div className="mt-[30px]">
        <Heading variant={HeadingVariant.H1}>Padel info:</Heading>
        <div className="mt-[8px]">
          <PadelInfo user={AuthStore.authUser as IUser} />
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
          {!isLoading && MatchStore.matches.length == 0 && (
            <div className="mt-[80px]">
              <EmptyBanner text="You have not matches" icon={<EmptyIcon />} />
            </div>
          )}
          {isLoading && (
            <div>
              <Loading />
            </div>
          )}
          {MatchStore.matches.map((match) => (
            <div key={match.id} className="mt-5">
              <Match match={match} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
