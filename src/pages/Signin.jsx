import {signInWithEmailAndPassword} from "firebase/auth";
import {useDispatch} from "react-redux";
import {setCurrentUser} from "../features/userSlice";



const Signin = () => {
    const naviagte = useNavigate();
    const dispatch = useDispatch();
    const setUser = (id) => {
        dispatch(setCurrentUser({
            currentUserID : id
        }))
    }
    const handleSignIn = async () => {
        try {
            await signInWithEmailAndPassword(auth,email,password)

        } catch (e) {
            console.log(e)
        }
    }
  return (
    <div className="mx-auto flex h-[100vh] items-center justify-center bg-slack-Auberginie">
      <div className="flex min-w-[30vw] flex-col rounded-xl bg-slack-green p-8 shadow-md">
        <h1 className="font-slackfont text-3xl font-bold">Sign Up</h1>

        <div className="mt-4">
          <div className="flex flex-col items-start justify-center gap-3 px-4 py-2">
            <p className="font-slackfont font-semibold">First Name</p>
            <input
              type="text"
              value={fname}
              onChange={(e) => {
                setFname(e.target.value);
              }}
              placeholder="Enter your First Name"
              className="w-full rounded-lg border-2 px-4 py-2 font-slackfont focus:outline-none"
            />
          </div>
          <div className="flex flex-col items-start justify-center gap-3 px-4 py-2">
            <p className="font-slackfont font-semibold">LastName</p>
            <input
              type="text"
              value={lname}
              onChange={(e) => {
                setLname(e.target.value);
              }}
              placeholder="Enter your Last Name"
              className="w-full rounded-lg border-2 px-4 py-2 font-slackfont focus:outline-none"
            />
          </div>

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
          onClick={handleSignUp}
        >
          SIGN UP
        </button>
      </div>
      <ToastContainer />
    </div>
}

export default Signin