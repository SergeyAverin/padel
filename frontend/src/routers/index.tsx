import { Routes } from "react-router-dom";

import { withLoginRequire } from "@hocs/withLoginRequire";
import { Spinner } from "@atoms/index";

/** Главный компонент маршрутизации */
const MainRouter: React.FC = () => {
  return (
    <>
      <div>
        <Routes>
          {/* <Route path="/requests/bubble" element={<BubbleRequestsPage />} /> */}
        </Routes>
        <Spinner />
      </div>
    </>
  );
};

// export default withLoginRequire(MainRouter);
export default MainRouter;
