import { authentication } from '../backend/firebase-config';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import logo from ".pages/logoduck.png";


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
      <img src={logo} alt="duckExchange Logo"> </img>
      <h1> Welcome to Duck Exchange! </h1>
      <h2> Log In or Register to your Duck Exchange Account </h2>
      <button className="login-with-google-btn" onClick={signInWithGoogle}>
        Sign In With Google
      </button>
    </div>
  );
}

export default SignInScreen;
