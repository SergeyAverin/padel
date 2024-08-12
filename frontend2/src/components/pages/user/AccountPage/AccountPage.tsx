import React from "react";

import UserTemplate from "@templates/user/UserTemplate";
import { Hand, Position } from "@schemas/user";

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
export const AccountPage: React.FC = () => {
  return (
    <>
      <UserTemplate user={testUser} />
    </>
  );
};
