import './App.css';
import {useState} from 'react';
import { authentication } from './backend/firebase-config';
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import SignInScreen from './pages/SignInScreen';
import { signOut } from "firebase/auth";
import Browse from './pages/Browse';
import AddListing from './pages/AddListing';


function App() {
    const [signedIn,setSignedIn] = useState(localStorage.getItem("setSignedIn"));

    // firebase authentication listener
    authentication.onAuthStateChanged((user)=>{
      if(user){
        setSignedIn(true);
      }else{
        setSignedIn(false);
      }
    })

    const signUserOut = () => {
    signOut(authentication).then(() => {
      localStorage.clear();
      setSignedIn(false);
      window.location.pathname = "/";
    });
  };


    // if user is signed in, allow user to view page/component
    const protectedRoute = (component)=>{
      if(signedIn === true){
         return component
      }
      return <SignInScreen />
    }


  return (
    <Router>
      <nav>
        {!signedIn ? (
          <Link to="/"> DuckExchange </Link>
        ) : (
          <>
            <Link to="/browse"> Browse </Link>
            <Link to="/addlisting"> Create Post </Link>
            <button onClick={signUserOut}> Log Out</button>
          </>
        )}
      </nav>
      
             <Routes>
             <Route path="/" element={<SignInScreen setSignedIn={setSignedIn}/>} />
              <Route path="/browse" element={protectedRoute(<Browse />)} />
              <Route path="/addlisting" element={protectedRoute(<AddListing />)} />
             </Routes>
      </Router>
  );
}

export default App;
