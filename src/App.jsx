import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { auth } from "./firebase/firebase";
const App = () => {
  return (
    <div className="m-0 h-[calc(100vh-10px)] overflow-hidden bg-blue-900">
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
