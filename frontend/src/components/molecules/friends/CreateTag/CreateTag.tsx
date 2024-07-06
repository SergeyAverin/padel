import React, { useState } from "react";

import TagStore from "@store/tags";

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
    <form onSubmit={onSubmit}>
      <input value={value} onChange={onChange} className="bg-bg" />
      <button>submit</button>
    </form>
  );
};
