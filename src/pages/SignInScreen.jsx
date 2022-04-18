import { authentication } from '../backend/firebase-config';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";


const SignInScreen = ()=>{
    const signInWithGoogle = ()=>{

        const provider = new GoogleAuthProvider();
        signInWithPopup(authentication, provider)
        .then((re)=>{
          console.log(re);
        })
        .catch((err)=>{
          console.log(err)
        })
      }


    return (
        <div className="App">
            <button onClick={signInWithGoogle}>
              Sign In With Google
            </button>
        </div>
      );
}

export default SignInScreen;
