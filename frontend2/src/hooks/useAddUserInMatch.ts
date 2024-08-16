import { openPanel } from "@redux/features/addUserInMatch";
import { IMatch } from "@schemas/match";
import { useDispatch } from "react-redux";
import { useAuthUser } from "./useAuthUser";

export const useAddUserInMatch = (
  match: IMatch,
  index: number,
  isFree: boolean = false
) => {
  const dispatch = useDispatch();

  const addUser = () => {
    dispatch(
      openPanel({
        index: index,
        matchId: match.id,
      })
    );
  };
  const joinInMatch = (index: number) => {
    // AddUserInMatchStore.joinInMatch(index);
    alert("join");
  };
  const user = useAuthUser();
  const onClick = () => {
    if (user && match.owner?.id == user.id) {
      addUser();
    } else {
      if (user && match.status != "done") {
        if (
          user.lvl < parseRange(match.match_lvl)[0] ||
          user.lvl > parseRange(match.match_lvl)[1]
        ) {
          alert("You lvl is Inappropriate");
        } else {
          if (isFree) {
            joinInMatch(index);
          } else {
            alert("leave");
          }
        }
      }
      //       } else {
      //         if (isFree) {
      //         } else {
      //           if (
      //             userStore.user &&
      //             typeof userStore.user != "string" &&
      //             userStore.user.id == AuthStore.authUser?.id
      //           )
      //             AddUserInMatchStore.leveMatch(index);
      //         }
      //       }
    }
  };
  //   // AddUserInMatchStore.setIndex(index, match.id, userStore);

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
