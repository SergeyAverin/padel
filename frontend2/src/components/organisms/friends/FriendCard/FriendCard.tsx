import React from "react";

// import Tag from "@molecules/friends/Tag";
import UserPhoto from "@molecules/user/UserPhoto";
import { IUser } from "@schemas/user";
// import { ITag } from "@schemas/tags";
import { shortenString } from "@utils/shoringString";
import { Link } from "react-router-dom";
import UnFriend from "@molecules/friends/UnFriend";

interface IFriendCardProps {
  user: IUser;
}

export const FriendCard: React.FC<IFriendCardProps> = ({ user }) => {
  // useEffect(() => {
  //   TagStore.getFriendTags(user.telegram_user_id);
  // }, [TagStore.tags]);
  // const [isShow, setIsShow] = useState(true);
  // useEffect(() => {
  //   if (TagStore.friendsWithTags.has(user.telegram_user_id)) {
  //     const userTags = TagStore.friendsWithTags.get(
  //       user.telegram_user_id
  //     ) as Array<ITag>;
  //     let flag = true;
  //     TagStore.filterTags.forEach((tag) => {
  //       const indexInUserTags = userTags.findIndex((i) => tag.name == i.name);
  //       if (indexInUserTags < 0) {
  //         flag = false;
  //       }
  //     });
  //     setIsShow(flag);
  //   }
  // }, [
  //   TagStore.filterTags,
  //   TagStore.filterTags.length,
  //   TagStore.friendsWithTags,
  // ]);

  return (
    <>
      {true && (
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
            {/* {TagStore.friendsWithTags.has(user.telegram_user_id) &&
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
                ))} */}
          </div>
          <div className="mt-5 ">
            {/* <AddTag userId={user.telegram_user_id} /> */}
          </div>
        </div>
      )}
    </>
  );
};
