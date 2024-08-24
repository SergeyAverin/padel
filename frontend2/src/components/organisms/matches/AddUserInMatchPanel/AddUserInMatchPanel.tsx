import React from "react";
import { observer } from "mobx-react-lite";
import classNames from "classnames";

import CloseIcon from "@assets/CloseIcon.svg?react";
import AddTextUserInMatch from "@molecules/matches/AddTextUserInMatch";
import HelpBanner from "@organisms/core/HelpBanner";
import { useDispatch, useSelector } from "react-redux";
import {
  indexSelector,
  isOpenSelector,
  matchIdSelector,
} from "@redux/selectors/addUserInMatch";
import { closePanel } from "@redux/features/addUserInMatch";
import {
  useAddUserInMatchMutation,
  useGetUsersForMatchQuery,
} from "@redux/api/addUserInMatchApi";
import UserPhoto from "@molecules/user/UserPhoto";
import { useAuthUser } from "@hooks/useAuthUser";
import { Heading, HeadingVariant, Loading } from "@atoms/index";
import { useGetJoinRequsetQuery } from "@redux/api/joinRequestApi";
import JoinRequst from "@molecules/matches/JoinRequst";

const AddUserInMatchPanel: React.FC = observer(() => {
  const isOpen = useSelector(isOpenSelector);
  const matchId = useSelector(matchIdSelector);
  const index = useSelector(indexSelector);

  const { data, isLoading } = useGetUsersForMatchQuery(matchId as number);
  const [addUserInMatch] = useAddUserInMatchMutation();

  const dispatch = useDispatch();

  const selectUser = (user_id: string) => {
    dispatch(closePanel());
    addUserInMatch({
      match_id: matchId as number,
      user_id: user_id,
      user_indx: index as number,
    });
  };
  const user = useAuthUser();
  const joinRequset = useGetJoinRequsetQuery(matchId as number);
  return (
    <div
      className={classNames(
        "fixed left-0 bg-primary text-fg w-full h-full z-50 overflow-y-auto pb-[100px]  transition-all ",
        {
          "top-0": isOpen,
          "top-[100%]": !isOpen,
        }
      )}
    >
      <div className="pt-[70px] pl-5 pr-5 z-20 relative">
        <div
          className="absolute right-[40px] top-[40px]"
          onClick={() => dispatch(closePanel())}
        >
          <CloseIcon stroke="#fff" />
        </div>
        <HelpBanner localStorageKey="help_add_user">
          Here you can choose the user who will be added to your match, if the
          user is not in our application you can enter his name manually.
        </HelpBanner>
        {!joinRequset.isLoading && data && data?.length > 0 && (
          <div className="mb-5">
            {joinRequset.data?.length != 0 && (
              <Heading variant={HeadingVariant.H2}>
                Request on join in match:
              </Heading>
            )}
            {joinRequset.data && (
              <div>
                {joinRequset.data.map((i) => (
                  <JoinRequst joinRequst={i} />
                ))}
              </div>
            )}
          </div>
        )}
        {!isLoading && (
          <>
            <Heading variant={HeadingVariant.H2}>Add user:</Heading>
          </>
        )}
        <div
          onClick={() => selectUser("-1")}
          className="flex bg-bg p-3 rounded-2xl items-center mt-5"
        >
          <div className="w-[72px] h-[72px]">
            <div className="w-[72px] h-[72px] border-2 border-highlight text-highlight rounded-full border-dashed flex justify-center items-center">
              +
            </div>
          </div>
          <div>
            <div className="text-[18px] ml-3">Empty</div>
          </div>
        </div>
        <div className="mt-5 mb-5">
          <AddTextUserInMatch />
        </div>
        {/* add you */}
        {user && (
          <div
            onClick={() => selectUser(user.telegram_user_id)}
            key={user.id}
            className="flex bg-bg p-3 rounded-2xl mt-5 items-center"
          >
            <div className="w-[72px] h-[72px]">
              <UserPhoto avatar={user.avatar} lvl={user.lvl} />
            </div>
            <div>
              <div className="text-[24px] ml-3">{user.username}</div>
              <div className="text-[14px] ml-3">{user.first_name}</div>
              <div className="text-[14px] ml-3">
                {user.last_name.toLowerCase() != "none" && user.last_name}
              </div>
            </div>
          </div>
        )}
        {isLoading && (
          <div className="mt-[30px] flex justify-center">
            <Loading />
          </div>
        )}

        {data &&
          data.map((item) => (
            <div
              onClick={() => selectUser(item.telegram_user_id)}
              key={item.id}
              className="flex bg-bg p-3 rounded-2xl mt-5 items-center"
            >
              <div className="w-[72px] h-[72px]">
                <UserPhoto avatar={item.avatar} lvl={item.lvl} />
              </div>
              <div>
                <div className="text-[24px] ml-3">{item.username}</div>
                <div className="text-[14px] ml-3">{item.first_name}</div>
                <div className="text-[14px] ml-3">
                  {item.last_name.toLowerCase() != "none" && item.last_name}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
});

export const AddUserPanel: React.FC = () => {
  // return ReactDOM.createPortal(
  //   <AddUserInMatchPanel matchId={matchId} />,
  //   document.querySelector("#add-user-panel") as Element
  // );
  return <AddUserInMatchPanel />;
};
