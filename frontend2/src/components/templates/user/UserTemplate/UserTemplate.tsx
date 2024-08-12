import PadelInfo from "@organisms/user/PadelInfo";
import UserStats from "@organisms/user/UserStats";
import { Hand, Position } from "@schemas/user";
import React from "react";

const testUser = {
  age: 21,
  avatar: "/",
  city: "Omsk",
  country: "Russia",
  email: "sergey@mail.ru",
  first_name: "Sergery",
  hand: Hand.LEFT_HAND,
  id: 1,
  last_name: "Averin",
  lvl: 3,
  position: Position.BOTH,
  status: "user",
  telegram_user_id: "",
  username: "PrettyStreet",
};

export const UserTemplate: React.FC = () => {
  return (
    <>
      <div className="mt-3">
        <UserStats />
      </div>

      <div className="mt-3">
        <PadelInfo user={testUser} />
      </div>
      <div>Matches</div>
    </>
  );
};
