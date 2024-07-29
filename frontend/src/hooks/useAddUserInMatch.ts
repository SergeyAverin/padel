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
      if (AuthStore.authUser) {
        if (
          AuthStore.authUser.lvl < parseRange(match.match_lvl)[0] ||
          AuthStore.authUser.lvl > parseRange(match.match_lvl)[1]
        ) {
          alert("You lvl is Inappropriate");
        } else {
          if (isFree) {
            joinInMatch(index);
          } else {
            if (userStore.user && userStore.user.id == AuthStore.authUser?.id)
              AddUserInMatchStore.leveMatch(index);
          }
        }
      }
    }
  };
  return onClick;
};

function parseRange(range: string): [number, number] {
  // Разделяем строку по символу '-'
  const parts = range.split("-");

  // Преобразуем каждую часть в число
  const num1 = parseFloat(parts[0]);
  const num2 = parseFloat(parts[1]);

  // Возвращаем кортеж с двумя числами
  return [num1, num2];
}
