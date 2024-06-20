import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../features/userSlice";
import { auth } from "../firebase/firebase";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../components/Loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";



const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        const userDetails = user.user;
        const _user = {
          displayName: auth.currentUser.displayName,
          email: userDetails.email,
          uid: userDetails.uid,
        };
        navigate("/home");
        dispatch(login(_user));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (user.isAuthenticated) navigate("/home");
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="mx-auto flex h-[100vh] items-center justify-center bg-slack-Auberginie">
      <div className="flex min-w-[30vw] flex-col rounded-xl bg-slate-900 p-8 shadow-md">
        <h1 className="font-slackfont text-3xl font-bold">SIGN IN</h1>

        <div className="mt-4">
          <div className="flex flex-col items-start justify-center gap-3 px-4 py-2">
            <Label className="font-slackfont font-semibold">Email</Label>
            <Input
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
            <Label className="font-slackfont font-semibold">Password</Label>
            <Input
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

        <div className="flex items-center justify-center py-3 pt-6 gap-4 px-4">
          <Button className="flex-1 text-white" onClick={handleSignIn}>
            Sign In
          </Button>
          <Button
            onClick={() => {
              navigate("/signup");
            }}
            className="flex-1 text-white"
          >
            Sign Up
          </Button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signin;
