import { openPanel } from "@redux/features/addUserInMatch";
import { IMatch } from "@schemas/match";
import { useDispatch } from "react-redux";
import { useAuthUser } from "./useAuthUser";
import { useAddUserInMatchMutation } from "@redux/api/addUserInMatchApi";
import { Gender } from "@schemas/user";

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
  const [addUserInMatch] = useAddUserInMatchMutation();

  const user = useAuthUser();
  const joinInMatch = (index: number) => {
    // AddUserInMatchStore.joinInMatch(index);
    if (match.gender == Gender.ANY || user?.gender == match.gender) {
      if (user) {
        addUserInMatch({
          match_id: match.id as number,
          user_id: user.telegram_user_id,
          user_indx: index as number,
        });
      }
    } else {
      alert(`This match is just for ${match.gender}`);
    }
  };
  const onClick = () => {
    if (user && match.owner?.id == user.id) {
      addUser();
    } else {
      if (user && match.status != "done") {
        if (
          (match.user_1?.telegram_user_id == user.telegram_user_id &&
            index != 1) ||
          (match.user_2?.telegram_user_id == user.telegram_user_id &&
            index != 2) ||
          (match.user_3?.telegram_user_id == user.telegram_user_id &&
            index != 3) ||
          (match.user_4?.telegram_user_id == user.telegram_user_id &&
            index != 4)
        ) {
          alert("You've already entered the match. Click on yourself to exit!");
          return;
        }
        if (
          user.lvl < parseRange(match.match_lvl)[0] ||
          user.lvl > parseRange(match.match_lvl)[1]
        ) {
          alert("You lvl is Inappropriate");
        } else {
          if (isFree) {
            alert("You've entered the match");
            joinInMatch(index);
          } else {
            alert("You walked out of the matchClick to apply");
            addUserInMatch({
              match_id: match.id as number,
              user_id: "-1",
              user_indx: index as number,
            });
          }
        }
      } else {
        alert("You can't enter a match that has already been completed!");
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
