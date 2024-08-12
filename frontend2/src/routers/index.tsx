import { Route, Routes } from "react-router-dom";

import AccountPage from "@pages/user/AccountPage";

// import AddUserPanel from "@organisms/matches/AddUserInMatchPanel";
// import BlankList from "@organisms/matches/BlankList";
// import Navigation from "@organisms/core/Navigation";
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

/** Главный компонент маршрутизации */
const MainRouter: React.FC = () => {
  return (
    <>
      {/* <AddUserPanel />
      <BlankList />
      <TutorialPortal /> */}
      <Routes>
        <Route path="/profile" element={<AccountPage />} />
        {/* 
        <Route path="/profile/edit" element={<EditProfilePage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/clubs" element={<ClubsPage />} />
        <Route path="/clubs/:clubId" element={<ClubPage />} />
        <Route path="/matches" element={<MatchPage />} />
        <Route path="/create/match" element={<CreateMatchPage />} />
        <Route path="/create/club" element={<CreateClubPage />} />
        <Route path="/edit/club/:clubId" element={<EditClubPage />} />
        <Route path="/user/:userId" element={<UserPage />} /> */}
      </Routes>
      {/* <Navigation /> */}
    </>
  );
};

// export default withLoginRequire(MainRouter);
export default MainRouter;
