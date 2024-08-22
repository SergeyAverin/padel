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
import MatchesPage from "@pages/matches/MatchesPage";
import CreatClubPage from "@pages/clubs/CreatClubPage";
import ClubListPage from "@pages/clubs/ClubListPage";
import ClubPage from "@pages/clubs/ClubPage";
import { EditClubPage } from "@pages/clubs/EditClubPage/EditClubPage";
import { CreateMatchPage } from "@pages/matches/CreateMatchPage/CreateMatchPage";
import AddUserPanel from "@organisms/matches/AddUserInMatchPanel";
import { matchIdSelector } from "@redux/selectors/addUserInMatch";
import { Tutorial } from "@organisms/core/Tutorial/Tutorial";
import BlankList from "@organisms/matches/BlankList";
import { setCity } from "@redux/features/clubFilterSlice";
import { useGetBlanksQuery } from "@redux/api/blankApi";
import { Spinner } from "@atoms/index";
import { useCreateFriendRequestMutation } from "@redux/api/friendRequestApi";

/** Главный компонент маршрутизации */
const MainRouter: React.FC = () => {
  const { data, isLoading } = useGetUserProfileQuery();
  const dispatcher = useDispatch();
  useEffect(() => {
    if (data) {
      dispatcher(setAuthUser(data));
      dispatcher(setCity(data.city));
    }
  }, [isLoading]);

  const user = useAuthUser();
  const matchId = useSelector(matchIdSelector);
  const blankLoad = useGetBlanksQuery();

  const [createFriendRequest] = useCreateFriendRequestMutation();
  useEffect(() => {
    const url = new URL(window.location.href);
    const startapp = url.searchParams.get("tgWebAppStartParam");
    if (startapp) {
      console.log(`Create friend requset to user ${startapp}`);
      createFriendRequest(startapp);
    }
    if (window.Telegram.WebApp) {
      window.Telegram.WebApp.expand();
    }
  }, []);

  return (
    <>
      {!blankLoad.isLoading ? (
        <>
          {user && (
            <>
              {user.is_first_open && <Tutorial />}
              <BlankList />
            </>
          )}
          {matchId && <AddUserPanel />}

          <Routes>
            <Route path="/" element={<AccountPage />} />
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
      ) : (
        <Spinner />
      )}
    </>
  );
};

// export default withLoginRequire(MainRouter);
export default MainRouter;
