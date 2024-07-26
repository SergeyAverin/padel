import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import Tag from "@molecules/friends/Tag";
import UserPhoto from "@molecules/account/UserPhoto";
import { IUser } from "@schemas/user";
import UnFriend from "@molecules/friends/UnFriend";
import AddTag from "@molecules/friends/AddTag";
import TagStore from "@store/tags";
import { ITag } from "@schemas/tags";

interface IFriendCardProps {
  user: IUser;
}

export const FriendCard: React.FC<IFriendCardProps> = observer(({ user }) => {
  useEffect(() => {
    TagStore.getFriendTags(user.telegram_user_id);
  }, [TagStore.tags]);
  const [isShow, setIsShow] = useState(true);

  useEffect(() => {
    if (TagStore.filterTags.length > 0) {
      if (
        TagStore.friendsWithTags.has(user.telegram_user_id) &&
        (TagStore.friendsWithTags.get(user.telegram_user_id) as Array<ITag>)
          .length > 0
      ) {
        (
          TagStore.friendsWithTags.get(user.telegram_user_id) as Array<ITag>
        ).map((tag) => {
          TagStore.filterTags.map((filterTag) => {
            if (filterTag.id == tag.id) {
              setIsShow(true);
            } else {
              setIsShow(false);
            }
          });
        });
      } else {
        setIsShow(false);
      }
    } else {
      setIsShow(true);
    }
  }, [
    TagStore.filterTags.length,
    TagStore.filterTags,
    TagStore.friendsWithTags,
  ]);
  return (
    <>
      {isShow && (
        <div className="bg-primary p-5 rounded-xl">
          <div className="flex justify-between w-full">
            <div className="flex">
              <UserPhoto lvl={user.lvl} avatar={user.avatar} />

              <div className="ml-5">
                <div className="text-[16px] font-bold">{user.username}</div>
                <div className="text-[16px] font-medium">
                  {user.first_name} {user.last_name}
                </div>
              </div>
            </div>
            <div className="w-[100px]">
              <UnFriend friendId={user.telegram_user_id} />
            </div>
          </div>
          <div className="mt-5 flex items-center flex-wrap">
            {TagStore.friendsWithTags.has(user.telegram_user_id) &&
              TagStore.friendsWithTags
                .get(user.telegram_user_id)
                ?.map((tag) => (
                  <div className="mr-1" key={tag.id}>
                    <Tag
                      text={tag.name}
                      isAdd={false}
                      id={tag.id}
                      userId={user.telegram_user_id}
                    />
                  </div>
                ))}
          </div>
          <div className="mt-5 ">
            <AddTag userId={user.telegram_user_id} />
          </div>
        </div>
      )}
    </>
  );
});
