import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  redirect,
  useBeforeUnload,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import { useDispatch, useSelector } from "react-redux";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import { useEffect, useReducer } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import { login, logout } from "./features/userSlice";
import ProtectedRoute from "./components/ProtectedRoute";
import PageNotFound from "./pages/PageNotFound";
import { ThemeProvider } from "./components/theme-provider";

const App = () => {
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user.user) redirect("/signin");
  }, []);

  return (
    <div className="m-0 h-[100vh] overflow-hidden">
      <ThemeProvider defaultTheme="dark">
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<PageNotFound />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default App;
