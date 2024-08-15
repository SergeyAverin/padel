import React, { useEffect, useState } from "react";

// import Tag from "@molecules/friends/Tag";
import UserPhoto from "@molecules/user/UserPhoto";
import { IUser } from "@schemas/user";
// import { ITag } from "@schemas/tags";
import { shortenString } from "@utils/shoringString";
import { Link } from "react-router-dom";
import UnFriend from "@molecules/friends/UnFriend";
import { useGetFriendTagsQuery } from "@redux/api/friendTags";
import { useGetTagsByFriendQuery } from "@redux/api/tags";
import Tag from "@molecules/friends/Tag";
import AddTag from "@molecules/friends/AddTag";
import { useSelector } from "react-redux";
import { filterTagsSelector } from "@redux/selectors/friendFilterSelectors";

interface IFriendCardProps {
  user: IUser;
}

export const FriendCard: React.FC<IFriendCardProps> = ({ user }) => {
  const userTags = useGetTagsByFriendQuery(user.telegram_user_id);
  const [isShow, setIsShow] = useState(true);
  const tags = useSelector(filterTagsSelector);
  useEffect(() => {
    let flag = true;
    tags.forEach((tag) => {
      if (userTags.data) {
        const indexInUserTags = userTags.data.findIndex(
          (i) => tag.name == i.name
        );
        if (indexInUserTags < 0) {
          flag = false;
        }
      }
      if (tags.length > 0) {
        setIsShow(flag);
      }
    });
    if (tags.length == 0) {
      setIsShow(true);
    }
  }, [tags, tags.length, userTags]);

  return (
    <>
      {isShow && (
        <div className="bg-primary p-5 rounded-xl">
          <div className="flex justify-between w-full">
            <Link to={`/user/${user.telegram_user_id}`}>
              <div className="flex">
                <UserPhoto lvl={user.lvl} avatar={user.avatar} />

                <div className="ml-5">
                  <div className="text-[16px] font-bold">
                    {shortenString(user.username, 17)}
                  </div>
                  <div className="text-[16px] font-medium">
                    {shortenString(user.first_name, 17)}
                    <br />
                    {user.last_name.toLowerCase() != "none" &&
                      shortenString(user.last_name, 17)}
                  </div>
                </div>
              </div>
            </Link>
            <div className="w-[100px]">
              <UnFriend friendId={user.telegram_user_id} />
            </div>
          </div>
          <div className="mt-5 grid gap-2  grid-cols-3">
            {userTags.data &&
              userTags.data.map((tag) => (
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
};
