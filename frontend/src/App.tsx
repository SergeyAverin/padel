import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import MainRouter from "./routers";
import { store } from "@redux/store.ts";

/** Путь к API */
// const API_URL = import.meta.env.VITE_API_URL;

function App() {
  // useEffect(() => {
  //   console.log("Start app");
  //   console.log(`Connect to api ${API_URL}`);
  //   /** Открыть webapp на весь экран */
  //   if (window.Telegram.WebApp) {
  //     window.Telegram.WebApp.expand();
  //   }
  // });
  return (
    <div className="text-fg bg-bg mt-[25px]">
      <Provider store={store}>
        <BrowserRouter>
          <MainRouter />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
