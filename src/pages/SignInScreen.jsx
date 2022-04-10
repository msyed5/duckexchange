import { authentication } from '../backend/firebase-config';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Router, Routes ,Route, Switch } from 'react-router-dom';
import Browse from './Browse';



const SignInScreen = ()=>{
    const signInWithGoogle = ()=>{
        const provider = new GoogleAuthProvider();
        signInWithPopup(authentication, provider)
        .then((re)=>{


          <Router>
            <Routes>
              <Route path="/" component={Browse}/>
            </Routes>
          </Router>
          
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
