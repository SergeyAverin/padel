import React, { useState } from "react";

import TagStore from "@store/tags";
import DoneIcon from "@assets/DoneIcon.svg?react";

export const CreateTag: React.FC = () => {
  const [value, setValue] = useState("");
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (value != "") {
      TagStore.createTag(value);
    }
    setValue("");
  };
  return (
    <form onSubmit={onSubmit} className="flex items-center">
      <input
        value={value}
        onChange={onChange}
        className="bg-primary border-b-2 border-grey"
      />
      <button>
        <DoneIcon />
      </button>
    </form>
  );
};
