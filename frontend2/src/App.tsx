import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import MainRouter from "./routers";
import { store } from "@redux/store";

const App = () => {
  return (
    <div className="text-fg p-2 pb-[150px]">
      <Provider store={store}>
        <BrowserRouter>
          <MainRouter />
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default App;
