import { Route, Routes } from "react-router-dom";

import { withLoginRequire } from "@hocs/withLoginRequire";
import ProfilePage from "@pages/ProfilePage";
import Navigation from "@organisms/Navigation";
import { Button, ButtonVariant, Input } from "@atoms/index";
import UserInfo from "@organisms/UserInfo";
import UserStats from "@organisms/UserStats";

/** Главный компонент маршрутизации */
const MainRouter: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <Navigation />
      <Button variant={ButtonVariant.OUTLINED}>Test</Button>
      <Input name="sd" value={"asdf"} />
      <UserInfo />
      <UserStats />
    </>
  );
};

// export default withLoginRequire(MainRouter);
export default MainRouter;
