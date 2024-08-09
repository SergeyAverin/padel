import { Button, ButtonVariant } from "@atoms/index";
import React from "react";

export const CleanLocalStorage: React.FC = () => {
  const clean = () => {
    localStorage.clear();
  };
  return (
    <Button variant={ButtonVariant.OUTLINED} onClick={clean}>
      Clean local storage
    </Button>
  );
};
