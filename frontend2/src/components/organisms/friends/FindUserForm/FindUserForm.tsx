import { Button, ButtonVariant, Input, Loading } from "@atoms/index";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import UserPhoto from "@molecules/user/UserPhoto";
import { Link } from "react-router-dom";
import { EmptyBanner } from "@organisms/core/EmptyBanner/EmptyBanner";
import EmptyIcon from "@assets/EmptyIcon.svg?react";
import HelpBanner from "@organisms/core/HelpBanner";
import { useFindUserByUserNameMutation } from "@redux/api/findUserApi";
import { IUser } from "@schemas/user";

export const FindUserForm: React.FC = observer(() => {
  const [value, setValue] = useState("");
  const [requestSended, setRequsetSended] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<Array<IUser>>([]);
  const [findUser] = useFindUserByUserNameMutation();
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    findUser(value)
      .unwrap()
      .then((data) => {
        setUsers(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
    setRequsetSended(true);
  };
  return (
    <>
      <div className="mb-5">
        <HelpBanner localStorageKey="help_find">
          Here you can find a user by their username
        </HelpBanner>
      </div>
      <form onSubmit={onSubmit}>
        <Input
          name="username"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setRequsetSended(false);
            setValue(e.target.value);
          }}
          haveBackground={false}
        />
        <div className="mt-5">
          <Button variant={ButtonVariant.OUTLINED} type="submit">
            Find
          </Button>
        </div>
      </form>
      <div className="mt-5">
        {isLoading ? (
          <div className="flex justify-center mt-[150px]">{<Loading />}</div>
        ) : (
          <>
            {users.length == 0 && requestSended && (
              <div className="mt-[110px]">
                <EmptyBanner text="User not found" icon={<EmptyIcon />} />
              </div>
            )}
            {users.map((user) => (
              <Link
                to={`/user/${user.telegram_user_id}`}
                key={user.telegram_user_id}
              >
                <div className="bg-primary p-5 rounded-xl mb-5">
                  <div className="flex">
                    <UserPhoto avatar={user.avatar} lvl={user.lvl} />

                    <div className="ml-5">
                      <div className="text-[16px] font-bold">
                        {user.username}
                      </div>
                      <div className="text-[16px] font-medium">
                        {user.first_name}{" "}
                        {user.last_name.toLowerCase() != "none" &&
                          user.last_name}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </>
        )}
      </div>
    </>
  );
});
