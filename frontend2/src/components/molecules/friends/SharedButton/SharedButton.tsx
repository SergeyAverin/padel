import { Button, ButtonVariant } from "@atoms/index";
import { useAuthUser } from "@hooks/useAuthUser";
import React from "react";

const API_WEBAPP_LINK = import.meta.env.VITE_API_WEBAPP_LINK;

export const SharedButton: React.FC = () => {
  const user = useAuthUser();
  const SHARED_TEXT = `Share app to your friend.`;
  const URL = `${API_WEBAPP_LINK}?startapp=${user?.telegram_user_id}`;
  return (
    <>
      <a href={`https://t.me/share/url?url=${URL}&text=${SHARED_TEXT}`}>
        <Button variant={ButtonVariant.FULL_HIGHLIGHT}>
          Shared for friend
        </Button>
      </a>
    </>
  );
};
