import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { observer } from "mobx-react-lite";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import { DndProvider } from "react-dnd";

import MainRouter from "./routers";
import { Heading, HeadingVariant, Loading } from "@atoms/index";
import CleanLocalStorage from "@molecules/core/CleanLocalStorage";
import { TutorialPortal } from "@organisms/core/Tutorial/Tutorial";
import Blank from "@organisms/matches/Blank";
import AddUserPanel from "@organisms/matches/AddUserInMatchPanel";

import { useAuth } from "@hooks/useAuth";
import MatchStore from "@store/matches/match";
import FriendStore from "@store/friends/friends";
import FriendRequestsStore from "@store/friends/friendRequests";
import ClubStore from "@store/clubs/club";
import UserStore from "@store/account/user";
import TagStore from "@store/friends/tags";
import AuthStore from "@store/account/auth";
import BlankStore from "@store/matches/blank";
import ClubFilterStore from "@store/clubs/clubFilter";

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
    if (AuthStore.isLogin && AuthStore.authUser) {
      ClubFilterStore.changeCity(AuthStore.authUser.city);
    }
  }, []);

  useEffect(() => {
    if (AuthStore.isLogin && AuthStore.authUser?.telegram_user_id) {
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
      <CleanLocalStorage />
      {window.Telegram.WebApp.initData ? (
        <>
          {AuthStore.isLogin && (
            <>
              <div className="text-fg bg-bg mt-[25px] pb-[90px]">
                <BrowserRouter>
                  {BlankStore.matchWithOutBlank.length > 0 && (
                    <>
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
                    </>
                  )}
                  <AddUserPanel />

                  <MainRouter />
                  <TutorialPortal />
                </BrowserRouter>
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
