import { Button, ButtonVariant, Input } from "@atoms/index";
import React, { useState } from "react";

export const FindUserForm: React.FC = () => {
  const [value, setValue] = useState("");
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={onSubmit}>
      <Input
        name="username"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
      />
      <div className="mt-5">
        <Button variant={ButtonVariant.OUTLINED} type="submit">
          Find
        </Button>
      </div>
    </form>
  );
};
