import React from "react";

import { IUser } from "@schemas/user";
import { useAddUserInMatch } from "@hooks/useAddUserInMatch";
import { IMatch } from "@schemas/match";
import { shortenString } from "@utils/shoringString";
// import { Link } from "react-router-dom";
import classNames from "classnames";

interface IUserInMatchProps {
  user: IUser;
  match: IMatch;
  index: number;
  isReverse?: boolean;
}

export const UserInMatch: React.FC<IUserInMatchProps> = ({
  user,
  match,
  index,
  isReverse,
}) => {
  const onClick = useAddUserInMatch(match, index);

  return (
    <>
      <div
        className={classNames("flex", {
          "flex-row-reverse": isReverse,
        })}
        onClick={() => {
          onClick();
        }}
      >
        <img className="w-[42px] h-[42px] rounded-full" src={user.avatar} />
        <div
          className={classNames("text-[14px] relative", {
            "ml-1": !isReverse,
            "mr-1": isReverse,
          })}
        >
          {/* <Link to={`/user/${user.telegram_user_id}`}> */}
          {shortenString(user.username, 12)}
          {/* </Link> */}
          <div
            className={classNames(
              "p-1 bg-highlight text-bg rounded-full  w-[20px] h-[20px] text-[14px]",
              "flex justify-center items-center absolute",
              {
                "left-0": !isReverse,
                "right-0": isReverse,
              }
            )}
          >
            {user.lvl}
          </div>
        </div>
      </div>
    </>
  );
};
