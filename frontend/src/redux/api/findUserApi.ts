import { IUser } from "@schemas/user";
import { baseApi } from "../baseApi";

export const FindUserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    findUserByUserName: builder.mutation<Array<IUser>, string>({
      query(username) {
        return {
          url: `/user/find_user?username=${username}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useFindUserByUserNameMutation } = FindUserApi;
