import React, { useState } from "react";

import Tag from "../Tag";
import CreateTag from "../CreateTag";
import BackIcon from "@assets/BackIcon.svg?react";
import { useGetFriendTagsQuery } from "@redux/api/friendTags";

interface IAddTagProps {
  userId: string;
}

export const AddTag: React.FC<IAddTagProps> = ({ userId }) => {
  const [isOpenAddTag, setIsOpenAddTag] = useState(false);
  const toggleIsOpenAddTag = () => {
    setIsOpenAddTag((prev) => !prev);
  };
  const { data } = useGetFriendTagsQuery();
  return (
    <div>
      {!isOpenAddTag ? (
        <div
          className="select-none cursor-pointer"
          onClick={toggleIsOpenAddTag}
        >
          + TAG
        </div>
      ) : (
        <>
          <div className="flex justify-between">
            <div>
              <div onClick={toggleIsOpenAddTag}>
                <BackIcon />
              </div>
            </div>
            <CreateTag />
          </div>
          <div className="mt-5  grid gap-2  grid-cols-2">
            {data &&
              data.map((tag) => (
                <div className="mr-1" key={tag.id}>
                  <Tag
                    text={tag.name}
                    isAdd={true}
                    id={tag.id}
                    userId={userId}
                  />
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};
