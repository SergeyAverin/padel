import AddUserInMatch from "@molecules/matches/AddUserInMatch";
import { isOpenSelector } from "@redux/selectors/createMatchSelectors";
import {
  user1Selector,
  user2Selector,
  user3Selector,
  user4Selector,
} from "@redux/selectors/createMatchSelectors";
import { IUser } from "@schemas/user";
import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddUserInMatchCreatorPanel from "../AddUserInMatchCreatorPanel";
import { changeUserIndex } from "@redux/features/creaetMatchSlice";
import UserInMatch from "@molecules/matches/UserInMatch";
import { TextUserInMatch } from "@molecules/matches/TextUserInMatch/TextUserInMatch";

export const SelectUsers: React.FC = () => {
  const user1 = useSelector(user1Selector);
  const user2 = useSelector(user2Selector);
  const user3 = useSelector(user3Selector);
  const user4 = useSelector(user4Selector);
  const isOpen = useSelector(isOpenSelector);

  return (
    <div className="relative">
      <div className="flex justify-between items-center">
        <div>
          <div className="mb-5">
            <UserWrapper user={user1} index={1} />
          </div>
          <UserWrapper user={user2} index={2} />
        </div>
        <div className="h-[150px] w-[1px] bg-fg"></div>
        <div>
          <div className="mb-5">
            <UserWrapper isReverse={true} user={user3} index={3} />
          </div>
          <UserWrapper isReverse={true} user={user4} index={4} />
        </div>
      </div>
      {isOpen && <AddUserInMatchCreatorPanel />}
    </div>
  );
};

interface IUserWrapperProps {
  user: string | IUser | null;
  isReverse?: boolean;
  index: number;
}
const UserWrapper: FC<IUserWrapperProps> = ({
  user,
  index,
  isReverse = false,
}) => {
  const dispatcher = useDispatch();
  const onClick = () => {
    dispatcher(changeUserIndex(index));
  };
  return (
    <div onClick={onClick}>
      {user && typeof user == "string" && (
        <TextUserInMatch
          index={index}
          isRevers={isReverse}
          match={null}
          text={user}
        />
      )}
      {user && typeof user != "string" && (
        <UserInMatch
          index={index}
          match={null}
          user={user}
          isReverse={isReverse}
        />
      )}
      {!user && (
        <AddUserInMatch index={index} match={null} isReverse={isReverse} />
      )}
    </div>
  );
};
