import React, { useState } from "react";
import { observer } from "mobx-react-lite";

import TagStore from "@store/tags";

import FilterIcon from "@assets/FilterIcon.svg?react";
import Tag from "@molecules/friends/Tag";
import { ITag } from "@schemas/tags";

export const FriendsFilter: React.FC = observer(() => {
  const [isOpen, setIsOpen] = useState(false);
  const addTag = (tag: ITag) => {
    TagStore.addFilter(tag);
    setIsOpen(false);
  };
  const removeTag = (tag: ITag) => {
    TagStore.removeFilter(tag);
  };
  return (
    <div>
      <div className="flex">
        <div onClick={() => setIsOpen((prev) => !prev)}>
          <FilterIcon />
        </div>
        <div className="ml-5 flex">
          {TagStore.filterTags.map((filter) => (
            <div
              className="mr-1"
              key={filter.id}
              onClick={() => removeTag(filter)}
            >
              <Tag text={filter.name} id={filter.id} isAdd={false} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3">
        {isOpen && (
          <div className="flex mb-5 overflow-x-auto pb-3">
            {TagStore.tags.map((tag) => (
              <div className="mr-1" key={tag.id} onClick={() => addTag(tag)}>
                <Tag text={tag.name} id={tag.id} isAdd={false} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});
