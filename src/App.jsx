import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { auth } from "./firebase/firebase";
import { Provider } from "react-redux";
import store from "./app/store";
import { useSelector } from "react-redux";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
const App = () => {
  return (
    <div className="m-0 h-[calc(100vh-10px)] overflow-hidden bg-blue-900">
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route index element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;
