import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AccountPage from "@pages/user/AccountPage";

import Navigation from "@organisms/core/Navigation";
import EditAccountPage from "@pages/user/EditAccountPage";
import { useEffect } from "react";
import { useGetUserProfileQuery } from "@redux/api/userApi";
import { setAuthUser } from "@redux/features/authSlice";
import { UserPage } from "@pages/user/UserPage/UserPage";
import FriendPage from "@pages/friends/FriendPage";
import { useAuthUser } from "@hooks/useAuthUser";
import { useGetFriendsQuery } from "@redux/api/friendsApi";
import {
  useGetInnerFriendRequsetQuery,
  useGetOuterFriendRequestQuery,
} from "@redux/api/friendRequestApi";
import MatchesPage from "@pages/matches/MatchesPage";
import CreatClubPage from "@pages/clubs/CreatClubPage";
import ClubListPage from "@pages/clubs/ClubListPage";
import ClubPage from "@pages/clubs/ClubPage";
import { EditClubPage } from "@pages/clubs/EditClubPage/EditClubPage";
import { CreateMatchPage } from "@pages/matches/CreateMatchPage/CreateMatchPage";
import AddUserPanel from "@organisms/matches/AddUserInMatchPanel";
import { matchIdSelector } from "@redux/selectors/addUserInMatch";
import Tutorial from "@organisms/core/Tutorial";

/** Главный компонент маршрутизации */
const MainRouter: React.FC = () => {
  const { data, isLoading } = useGetUserProfileQuery();
  const dispatcher = useDispatch();
  useEffect(() => {
    if (data) {
      dispatcher(setAuthUser(data));
      console.log(data);
    }
  }, [isLoading]);

  const user = useAuthUser();
  useGetFriendsQuery(user?.telegram_user_id as string);
  useGetInnerFriendRequsetQuery();
  useGetOuterFriendRequestQuery();
  const matchId = useSelector(matchIdSelector);

  return (
    <>
      <Tutorial />
      {matchId && <AddUserPanel />}
      {/* 
      <BlankList />
       */}
      <Routes>
        <Route path="/profile" element={<AccountPage />} />
        <Route path="/profile/edit" element={<EditAccountPage />} />
        <Route path="/user/:userId" element={<UserPage />} />
        <Route path="/friends" element={<FriendPage />} />
        <Route path="/matches" element={<MatchesPage />} />
        <Route path="/create/club" element={<CreatClubPage />} />
        <Route path="/clubs" element={<ClubListPage />} />
        <Route path="/clubs/:clubId" element={<ClubPage />} />
        <Route path="/edit/club/:clubId" element={<EditClubPage />} />
        <Route path="/create/match" element={<CreateMatchPage />} />
      </Routes>
      <Navigation />
    </>
  );
};

// export default withLoginRequire(MainRouter);
export default MainRouter;
