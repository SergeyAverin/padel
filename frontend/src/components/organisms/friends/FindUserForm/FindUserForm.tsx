import { Button, ButtonVariant, Input } from "@atoms/index";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import UserStore from "@store/friends";
import UserPhoto from "@molecules/account/UserPhoto";
import { Link } from "react-router-dom";

export const FindUserForm: React.FC = observer(() => {
  const [value, setValue] = useState("");
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    UserStore.findUser(value);
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <Input
          name="username"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
          haveBackground={false}
        />
        <div className="mt-5">
          <Button variant={ButtonVariant.OUTLINED} type="submit">
            Find
          </Button>
        </div>
      </form>
      <div className="mt-5">
        {UserStore.foundUsers.map((user) => (
          <Link
            to={`/user/${user.telegram_user_id}`}
            key={user.telegram_user_id}
          >
            <div className="bg-primary p-5 rounded-xl mb-5">
              <div className="flex">
                <UserPhoto avatar={user.avatar} />

                <div className="ml-5">
                  <div className="text-[16px] font-bold">{user.username}</div>
                  <div className="text-[16px] font-medium">
                    {user.first_name} {user.last_name}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
});
