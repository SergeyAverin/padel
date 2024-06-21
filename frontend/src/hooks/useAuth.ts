import { useLoginMutation } from "@redux/api/authApi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = (userId: string) => {
  const [login] = useLoginMutation();
  const navigation = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      login(userId)
        .unwrap()
        .then((data) => {
          localStorage.setItem("token", data.access_token);
          navigation(0);
        });
    }
  }, [userId]);
};
