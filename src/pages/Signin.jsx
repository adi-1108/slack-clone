import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../features/userSlice";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

const Signin = () => {
  const naviagte = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const setUser = (id) => {

  //   };
  const handleSignIn = async () => {
    signInWithEmailAndPassword(auth, email, password).then((auth) => {
      const _currentUser = auth?.user;
      console.log(_currentUser)
      dispatch(setCurrentUser({
        id: _currentUser?.uid
      }))
    });
  };
  return (
    <div className="mx-auto flex h-[100vh] items-center justify-center bg-slack-Auberginie">
      <div className="flex min-w-[30vw] flex-col rounded-xl bg-slack-green p-8 shadow-md">
        <h1 className="font-slackfont text-3xl font-bold">Sign In</h1>

        <div className="mt-4">
          <div className="flex flex-col items-start justify-center gap-3 px-4 py-2">
            <p className="font-slackfont font-semibold">Email</p>
            <input
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter your email"
              className="w-full rounded-lg border-2 px-4 py-2 font-slackfont focus:outline-none"
            />
          </div>

          <div className="flex flex-col items-start justify-center gap-3 px-4 py-2">
            <p className="font-slackfont font-semibold">Password</p>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Enter your password"
              className="w-full rounded-lg border-2 px-4 py-2 font-slackfont focus:outline-none"
            />
          </div>
        </div>

        <button
          className="mt-5 w-full rounded-full bg-slack-blue px-6 py-2 font-slackfont font-semibold text-white shadow-lg transition-all active:scale-95 active:outline-none"
          onClick={handleSignIn}
        >
          SIGN UP
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signin;
