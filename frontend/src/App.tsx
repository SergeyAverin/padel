import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { observer } from "mobx-react-lite";

import MainRouter from "./routers";
import { TutorialPortal } from "@organisms/Tutorial/Tutorial";
import { useAuth } from "@hooks/useAuth";
import AuthStore from "@store/auth";
/** Путь к API */
// const API_URL = import.meta.env.VITE_API_URL;
import MatchStore from "@store/match";
import UserStore from "@store/user";
import FriendRequestsStore from "@store/friendRequests";
import FriendStore from "@store/friends";
import ClubStore from "@store/club";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App = observer(() => {
  useEffect(() => {
    console.log(window);
    if (window.Telegram.WebApp) {
      window.Telegram.WebApp.expand();
    }
  }, []);
  let userId = "";
  if (window.Telegram.WebApp.initDataUnsafe.user) {
    const session = sessionStorage.getItem("__telegram__initParams");
    if (session) {
      userId = String(JSON.parse(session).tgWebAppData);
    }
  }

  useAuth(userId);

  useEffect(() => {
    if (AuthStore.authUser?.telegram_user_id) {
      UserStore.getUserInfo(AuthStore.authUser.telegram_user_id);
      MatchStore.loadUserMatches(AuthStore.authUser.telegram_user_id);
      MatchStore.loadingMatch();
      FriendRequestsStore.loadingRequests();
      FriendStore.getFriends(AuthStore.authUser.telegram_user_id);
      ClubStore.loadClubs();
    }
    return () => {
      UserStore.user = null;
    };
  }, [AuthStore.authUser]);

  return (
    <>
      {window.Telegram.WebApp.initData ? (
        <>
          {AuthStore.isLogin && (
            <>
              <div className="text-fg bg-bg mt-[25px] pb-[90px]">
                <DndProvider backend={HTML5Backend}>
                  <BrowserRouter>
                    <MainRouter />
                  </BrowserRouter>
                  <TutorialPortal />
                </DndProvider>
              </div>
            </>
          )}
          {!AuthStore.isLogin && <div>Need auth</div>}
        </>
      ) : (
        <>
          <div>Need open in telegram web app</div>
        </>
      )}
    </>
  );
});

export default App;
