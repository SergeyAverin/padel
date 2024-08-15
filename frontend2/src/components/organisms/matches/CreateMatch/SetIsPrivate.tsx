import { Label, Toggle } from "@atoms/index";
import Select from "@atoms/Select";
import { Option } from "@atoms/Select/selectOption";
import { useGetFriendTagsQuery } from "@redux/api/friendTags";
import { selectIsPrivate, selectTag } from "@redux/features/creaetMatchSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const SetIsPrivateLvl: React.FC = () => {
  const [isPrivate, setIsPrivate] = useState(false);
  const { data, isLoading } = useGetFriendTagsQuery();
  const options = data
    ? data.map((tag) => ({ label: tag.name, value: String(tag.id) }))
    : [];

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(isPrivate);
    dispatch(selectIsPrivate(isPrivate));
  }, [isPrivate]);

  const [tag, setTag] = useState<Option | null>(null);

  useEffect(() => {
    if (tag) {
      dispatch(selectTag(tag.value));
    }
  }, [tag]);

  const handelChangeTag = (option: Option) => {
    if (option) {
      setTag(option);
    }
  };
  return (
    <>
      <div className="mt-5">
        You can make a match private only for a selected group of friends.
      </div>
      <div className="mt-5">
        <div className="mb-3">
          <Label>Make the match private:</Label>
        </div>
        <Toggle
          defaultValue={isPrivate}
          onChange={(item) => setIsPrivate(item)}
          isDisable={false}
        />
      </div>
      {isPrivate && (
        <div className="mt-5">
          <div className="mb-3">
            <Label>Select user group how can join in match</Label>
          </div>
          <Select
            options={options}
            onChange={handelChangeTag}
            placeholder="Select group"
            isLoading={isLoading}
          />
        </div>
      )}
    </>
  );
};
