import { authUserSelector } from "@redux/selectors/authSelectors";
import { useSelector } from "react-redux";

export const useAuthUser = () => {
  const authUser = useSelector(authUserSelector);
  return authUser;
};
