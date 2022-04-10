import './App.css';
import {useState} from 'react';
import { authentication } from './backend/firebase-config';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Browse from './pages/Browse';
import SignInScreen from './pages/SignInScreen';

function App() {
    const [signedIn,setSignedIn] = useState(false);

    // firebase authentication listener
    authentication.onAuthStateChanged((user)=>{
      if(user){
        setSignedIn(true);
      }else{
        setSignedIn(false);
      }
    })


    // if user is signed in, allow user to view page/component
    const protectedRoute = (component)=>{
      if(signedIn === true){
         return component
      }
      return <SignInScreen />
    }

    if(signedIn === true){
       return (

  <BrowserRouter>
           <Routes>
             <Route path="/" element={<Browse />} />
           </Routes>
    </BrowserRouter>
       )
    };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInScreen />} />
        <Route path="/Browse" element={protectedRoute(<Browse/>)} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
