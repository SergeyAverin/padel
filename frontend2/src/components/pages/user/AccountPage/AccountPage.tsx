import React from "react";

import UserTemplate from "@templates/user/UserTemplate";
import { Hand, Position } from "@schemas/user";
import { Button, ButtonVariant, Spinner } from "@atoms/index";
import { useGetUserByIdQuery } from "@redux/api/userApi";

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
  const { data, isLoading } = useGetUserByIdQuery("339433633");
  return (
    <>
      {!isLoading && data ? (
        <UserTemplate
          user={data}
          button={<Button variant={ButtonVariant.OUTLINED}>Edit</Button>}
        />
      ) : (
        <Spinner />
      )}
    </>
  );
};
