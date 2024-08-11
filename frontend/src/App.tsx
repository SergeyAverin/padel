// import { useEffect } from "react";
// import { BrowserRouter } from "react-router-dom";
import { observer } from "mobx-react-lite";

// import MainRouter from "./routers";
// import CleanLocalStorage from "@molecules/core/CleanLocalStorage";

// import { useAuth } from "@hooks/useAuth";
// import MatchStore from "@store/matches/match";
// import FriendStore from "@store/friends/friends";
// import FriendRequestsStore from "@store/friends/friendRequests";
// import ClubStore from "@store/clubs/club";
// import UserStore from "@store/account/user";
// import TagStore from "@store/friends/tags";
// import AuthStore from "@store/account/auth";
// import ClubFilterStore from "@store/clubs/clubFilter";
// import BlankStore from "@store/matches/blank";

const App = observer(() => {
  // alert(window.Telegram.WebApp.platform);
  // useEffect(() => {
  //   if (window.Telegram.WebApp) {
  //     window.Telegram.WebApp.expand();
  //   }
  // }, []);

  // let userId = "";
  // if (window.Telegram.WebApp.initDataUnsafe.user) {
  //   const session = sessionStorage.getItem("__telegram__initParams");
  //   if (session) {
  //     userId = String(JSON.parse(session).tgWebAppData);
  //   }
  // }
  // useAuth(userId);

  // useEffect(() => {
  //   if (AuthStore.isLogin && AuthStore.authUser) {
  //     ClubFilterStore.changeCity(AuthStore.authUser.city);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (AuthStore.isLogin && AuthStore.authUser?.telegram_user_id) {
  //     UserStore.getUserInfo(AuthStore.authUser.telegram_user_id);
  //     MatchStore.loadUserMatches(AuthStore.authUser.telegram_user_id);
  //     MatchStore.loadingMatch();
  //     FriendRequestsStore.loadingRequests();
  //     FriendStore.getFriends(AuthStore.authUser.telegram_user_id);
  //     ClubStore.loadClubs();
  //     TagStore.getTags();
  //     BlankStore.loadMatchWithOutBlank();
  //   }
  //   return () => {
  //     UserStore.setUser(null);
  //   };
  // }, [AuthStore.authUser]);

  return (
    <>
      {/* <CleanLocalStorage />
      {window.Telegram.WebApp.initData ? (
        <>
          {AuthStore.isLogin && (
            <>
              <div className="text-fg bg-bg mt-[25px] pb-[90px]">
                <BrowserRouter>
                  <MainRouter />
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
      )} */}
      {window.Telegram.WebApp.platform}
    </>
  );
});

export default App;
