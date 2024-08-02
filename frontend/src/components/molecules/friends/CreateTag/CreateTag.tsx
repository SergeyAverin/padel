import React, { useState } from "react";

import { useCreateTag } from "./hooks/useCreateTag";

import DoneIcon from "@assets/DoneIcon.svg?react";

export const CreateTag: React.FC = () => {
  const [value, setValue] = useState("");
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const onSubmit = useCreateTag(value, setValue);

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
