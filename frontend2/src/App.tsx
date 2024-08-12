import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import MainRouter from "./routers";
import { store } from "@redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
