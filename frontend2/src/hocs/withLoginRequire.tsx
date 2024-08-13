// import { useAuth } from "../hooks/useAuth";
// import AuthStore from "../store/account/auth";

// export function withLoginRequire(WrappedComponent: React.FC) {
//   return function WithLoginRequire() {
//     let userId = "";
//     if (window.Telegram.WebApp.initDataUnsafe.user) {
//       const session = sessionStorage.getItem("__telegram__initParams");
//       if (session) {
//         userId = String(JSON.parse(session).tgWebAppData);
//       }
//     }

//     useAuth(userId);

//     return (
//       <>
//         {window.Telegram.WebApp.initDataUnsafe.user && (
//           <>{AuthStore.isLogin && <WrappedComponent />}</>
//         )}
//         <>{!AuthStore.isLogin && <div>need auth</div>}</>
//       </>
//     );
//   };
// }
