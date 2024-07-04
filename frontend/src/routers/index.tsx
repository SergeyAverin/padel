import { Route, Routes } from "react-router-dom";

import { withLoginRequire } from "@hocs/withLoginRequire";
import ProfilePage from "@pages/ProfilePage";
import Navigation from "@organisms/Navigation";
import EditProfilePage from "@pages/EditProfilePage";
import FriendsPage from "@pages/FriendsPage";
import ClubsPage from "@pages/ClubsPage";
import ClubPage from "@pages/ClubPage";

/** Главный компонент маршрутизации */
const MainRouter: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/edit" element={<EditProfilePage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/clubs" element={<ClubsPage />} />
        <Route path="/club/:clubId" element={<ClubPage />} />
      </Routes>
      <Navigation />
    </>
  );
};

// export default withLoginRequire(MainRouter);
export default MainRouter;
