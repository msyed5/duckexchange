import { authentication } from '../backend/firebase-config';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import logo from "/Users/serenalee/duckexchange/src/logoduck.png";

console.log(logo);

const SignInScreen = ({ setSignedIn }) => {
  let navigate = useNavigate();
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(authentication, provider)
      .then((re) => {
        localStorage.setItem("setSignedIn", true);
        setSignedIn(true);
        navigate("/browse");
        console.log(re);
      })
      .catch((err) => {
        console.log(err)
      })
  }


  return (
    <div className="loginPage">
      <img src={logo} alt="Logoduck" height={150} width={150} />
      <h1> Welcome to Duck Exchange! </h1>
      <h2> Login to your myStevens account </h2>
      <button className="login-with-google-btn" onClick={signInWithGoogle}>
        Sign In With Google
      </button>
    </div>
  );
}

export default SignInScreen;
