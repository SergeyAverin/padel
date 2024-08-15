import React, { useState } from "react";
import { observer } from "mobx-react-lite";

import FilterIcon from "@assets/FilterIcon.svg?react";
import Tag from "@molecules/friends/Tag";
import { ITag } from "@schemas/tags";
import { useGetFriendTagsQuery } from "@redux/api/friendTags";
import { useDispatch, useSelector } from "react-redux";
import { addTag, removeTag } from "@redux/features/friendFilterSlice";
import { filterTagsSelector } from "@redux/selectors/friendFilterSelectors";

export const FriendsFilter: React.FC = observer(() => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const onaAddTag = (tag: ITag) => {
    dispatch(addTag(tag));
    setIsOpen(false);
  };
  const onRemoveTag = (tag: ITag) => {
    dispatch(removeTag(tag));
  };
  const tags = useSelector(filterTagsSelector);
  const { data } = useGetFriendTagsQuery();
  return (
    <div>
      <div className="flex">
        <div onClick={() => setIsOpen((prev) => !prev)}>
          <FilterIcon />
        </div>
        <div className="ml-5 flex">
          {tags.map((filter) => (
            <div
              className="mr-1"
              key={filter.id}
              onClick={() => onRemoveTag(filter)}
            >
              <Tag text={filter.name} id={filter.id} isAdd={false} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3">
        {isOpen && (
          <div className="flex mb-5 overflow-x-auto pb-3">
            {data && data.length == 0 && (
              <div>You don't have tags to categorize frinds.</div>
            )}
            {data &&
              data.map((tag) => (
                <div
                  className="mr-1"
                  key={tag.id}
                  onClick={() => onaAddTag(tag)}
                >
                  <Tag text={tag.name} id={tag.id} isAdd={false} />
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
});
