import { Route, Routes } from "react-router-dom";

import { withLoginRequire } from "@hocs/withLoginRequire";
import ProfilePage from "@pages/ProfilePage";
import Navigation from "@organisms/Navigation";
import { Button, ButtonVariant } from "@atoms/index";

/** Главный компонент маршрутизации */
const MainRouter: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <Navigation />
      <Button variant={ButtonVariant.OUTLINED}>Test</Button>
    </>
  );
};

// export default withLoginRequire(MainRouter);
export default MainRouter;
