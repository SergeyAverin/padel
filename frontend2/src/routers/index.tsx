import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";

import AccountPage from "@pages/user/AccountPage";

// import AddUserPanel from "@organisms/matches/AddUserInMatchPanel";
// import BlankList from "@organisms/matches/BlankList";
import Navigation from "@organisms/core/Navigation";
import EditAccountPage from "@pages/user/EditAccountPage";
import { useEffect } from "react";
import { useGetUserProfileQuery } from "@redux/api/userApi";
// import { TutorialPortal } from "@organisms/core/Tutorial/Tutorial";
// import ProfilePage from "@pages/accounts/ProfilePage";
// import EditProfilePage from "@pages/accounts/EditProfilePage";
// import FriendsPage from "@pages/friends/FriendsPage";
// import ClubsPage from "@pages/clubs/ClubsPage";
// import ClubPage from "@pages/clubs/ClubPage";
// import MatchPage from "@pages/matches/MatchPage";
// import CreateMatchPage from "@pages/matches/CreateMatchPage";
// import CreateClubPage from "@pages/clubs/CreateClubPage";
// import EditClubPage from "@pages/clubs/EditClubPage";
// import UserPage from "@pages/accounts/UserPage";
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

  return (
    <>
      {/* <AddUserPanel />
      <BlankList />
      <TutorialPortal /> */}
      <Routes>
        <Route path="/profile" element={<AccountPage />} />
        <Route path="/profile/edit" element={<EditAccountPage />} />
        <Route path="/user/:userId" element={<UserPage />} />
        <Route path="/friends" element={<FriendPage />} />
        <Route path="/matches" element={<MatchesPage />} />
        <Route path="/create/club" element={<CreatClubPage />} />
        <Route path="/clubs" element={<ClubListPage />} />
        {/* 
        <Route path="/clubs/:clubId" element={<ClubPage />} />
        <Route path="/create/match" element={<CreateMatchPage />} />
        <Route path="/edit/club/:clubId" element={<EditClubPage />} />
        */}
      </Routes>
      <Navigation />
    </>
  );
};

// export default withLoginRequire(MainRouter);
export default MainRouter;
