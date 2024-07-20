import AuthStore from "@store/auth";
import AddUserInMatchStore from "@store/addUserInMatch";
import { IMatch } from "@schemas/match";

export const useAddUserInMatch = (match: IMatch, isFree: boolean = false) => {
  const addUser = () => {
    AddUserInMatchStore.toggleIsOpen();
  };
  const joinInMatch = () => {
    alert(match.id);
  };
  const onClick = () => {
    if (AuthStore.authUser && match.owner_id == AuthStore.authUser.id) {
      addUser();
    } else {
      if (isFree) {
        joinInMatch();
      }
    }
  };
  return onClick;
};
