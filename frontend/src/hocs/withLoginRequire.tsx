import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import AuthStore from "../store/auth";

export function withLoginRequire(WrappedComponent: React.FC) {
  return function WithLoginRequire() {
    let userId = "";
    if (window.Telegram.WebApp.initDataUnsafe.user) {
      const session = sessionStorage.getItem("__telegram__initParams");
      if (session) {
        userId = String(JSON.parse(session).tgWebAppData);
      }
    }
    useEffect(() => {
      console.log(AuthStore.isLogin);
    }, [AuthStore.isLogin]);

    useAuth(userId);

    return (
      <>
        {window.Telegram.WebApp.initDataUnsafe.user && (
          <>{AuthStore.isLogin && <WrappedComponent />}</>
        )}
        <>{!AuthStore.isLogin && <div>need auth</div>}</>
      </>
    );
  };
}
