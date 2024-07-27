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
import TagStore from "@store/tags";
import Blank from "@organisms/matches/Blank";
import BlankStore from "@store/blank";
import { Heading, HeadingVariant, Loading } from "@atoms/index";

const App = observer(() => {
  useEffect(() => {
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
      TagStore.getTags();
      BlankStore.loadMatchWithOutBlank();
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
                    <div className="fixed w-full h-full top-0 left-0 bg-primary z-50 overflow-y-auto">
                      <div className="p-5">
                        <Heading variant={HeadingVariant.H2}>
                          Select mark for user
                        </Heading>
                      </div>

                      {BlankStore.isLoading && (
                        <div className="flex justify-center items-center mt-[100px] w-full">
                          <Loading />
                        </div>
                      )}
                      {!BlankStore.isLoading && (
                        <>
                          {BlankStore.matchWithOutBlank.map((item) => (
                            <Blank match={item} />
                          ))}
                        </>
                      )}
                    </div>
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
