import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import Tag from "../Tag";
import TagsStore from "@store/tags";

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
          <div onClick={toggleIsOpenAddTag}>CLOSE</div>
          <div className="mt-5 flex items-center flex-wrap">
            {TagsStore.tags.map((tag) => (
              <div className="mr-1 first-line:mt-1" key={tag.id}>
                <Tag text={tag.name} isAdd={true} id={tag.id} userId={userId} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
});
