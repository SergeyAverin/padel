import { Route, Routes } from "react-router-dom";

import { withLoginRequire } from "@hocs/withLoginRequire";
import ProfilePage from "@pages/ProfilePage";
import Navigation from "@organisms/Navigation";
import EditProfilePage from "@pages/EditProfilePage";
import FriendsPage from "@pages/FriendsPage";

/** Главный компонент маршрутизации */
const MainRouter: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/edit" element={<EditProfilePage />} />
        <Route path="/friends" element={<FriendsPage />} />
      </Routes>
      <Navigation />
    </>
  );
};

// export default withLoginRequire(MainRouter);
export default MainRouter;
