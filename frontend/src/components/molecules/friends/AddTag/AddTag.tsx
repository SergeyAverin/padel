import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import Tag from "../Tag";
import TagsStore from "@store/tags";
import CreateTag from "../CreateTag";

interface IAddTagProps {
  userId: string;
}

export const AddTag: React.FC<IAddTagProps> = observer(({ userId }) => {
  const [isOpenAddTag, setIsOpenAddTag] = useState(false);
  const toggleIsOpenAddTag = () => {
    setIsOpenAddTag((prev) => !prev);
  };
  useEffect(() => {
    if (isOpenAddTag) {
      TagsStore.getTags();
    }
  }, [isOpenAddTag]);
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
              <div onClick={toggleIsOpenAddTag}>CLOSE</div>
            </div>
            <CreateTag />
          </div>
          <div className="mt-5 flex flex-wrap">
            {TagsStore.tags.map((tag) => (
              <div className="mr-1 " key={tag.id}>
                <Tag text={tag.name} isAdd={true} id={tag.id} userId={userId} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
});
