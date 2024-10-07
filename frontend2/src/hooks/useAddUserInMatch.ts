import { openPanel } from "@redux/features/addUserInMatch";
import { IMatch } from "@schemas/match";
import { useDispatch } from "react-redux";
import { useAuthUser } from "./useAuthUser";
import { useAddUserInMatchMutation } from "@redux/api/addUserInMatchApi";
import { Gender } from "@schemas/user";
import { useCreateJoinRequestMutation } from "@redux/api/joinRequestApi";
import { changeIsOpenPanel } from "@redux/features/creaetMatchSlice";

export const useAddUserInMatch = (
  match: null | IMatch,
  index: number,
  isFree: boolean = false
) => {
  const [createJoinRequset] = useCreateJoinRequestMutation();
  const dispatch = useDispatch();

  const addUser = () => {
    if (match) {
      dispatch(
        openPanel({
          index: index,
          matchId: match.id,
        })
      );
    }
  };
  const [addUserInMatch] = useAddUserInMatchMutation();

  const user = useAuthUser();

  const joinInMatch = (index: number) => {
    if (match) {
      // AddUserInMatchStore.joinInMatch(index);
      if (match.gender == Gender.ANY || user?.gender == match.gender) {
        if (user) {
          // addUserInMatch({
          //   match_id: match.id as number,
          //   user_id: user.telegram_user_id,
          //   user_indx: index as number,
          // });
          createJoinRequset({
            index: index,
            join_request_match: match.id as number,
            join_request_user_tg: user.telegram_user_id,
          });
        }
      } else {
        alert(`This match is just for ${match.gender}`);
      }
    }
  };
  const onClick = () => {
    if (match) {
      if (user && match.owner?.id == user.id) {
        if (match.status != "cancel") {
          addUser();
        } else {
          alert("Match is canceled");
        }
      } else {
        if (user && match.status != "done" && match.status != "cancel") {
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
            alert(
              "You've already entered the match. Click on yourself to exit!"
            );
            return;
          }
          if (
            user.lvl < parseRange(match.match_lvl)[0] ||
            user.lvl > parseRange(match.match_lvl)[1]
          ) {
            alert("You lvl is Inappropriate");
          } else {
            if (isFree) {
              alert("You send request on entered the match");
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
          if (match.status != "cancel") {
            alert("You can't enter a match that has already been completed!");
          } else {
            alert("Match is canceled");
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
    } else {
      dispatch(changeIsOpenPanel(true));
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
