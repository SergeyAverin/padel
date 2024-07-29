import AuthStore from "@store/auth";
import AddUserInMatchStore from "@store/addUserInMatch";
import { IMatch } from "@schemas/match";
import AddUserInMatchLocal from "@store/addUserInMatchLocal";

export const useAddUserInMatch = (
  match: IMatch,
  index: number,
  userStore: AddUserInMatchLocal,
  isFree: boolean = false
) => {
  const addUser = () => {
    AddUserInMatchStore.toggleIsOpen();
  };
  const joinInMatch = (index: number) => {
    AddUserInMatchStore.joinInMatch(index);
  };
  const onClick = () => {
    AddUserInMatchStore.setIndex(index, match.id, userStore);
    if (AuthStore.authUser && match.owner?.id == AuthStore.authUser.id) {
      addUser();
    } else {
      if (isFree) {
        joinInMatch(index);
      } else {
        if (userStore.user && userStore.user.id == AuthStore.authUser?.id)
          AddUserInMatchStore.leveMatch(index);
      }
    }
  };
  return onClick;
};
