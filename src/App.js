import './App.css';
import {useState} from 'react';
import { authentication } from './backend/firebase-config';
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import SignInScreen from './pages/SignInScreen';
import Browse from './pages/Browse';
import AddListing from './pages/AddListing';


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
  <Router>
    <nav>
      <Link to="/"> Browse </Link>
      <Link to="/addlisting"> Create New Listing </Link>
    </nav>
           <Routes>
           <Route path="/" element={<Browse />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/addlisting" element={protectedRoute(<AddListing />)} />
           </Routes>
    </Router>
       )
    };


  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInScreen />} />
        // <Route path="/browse" element={protectedRoute(<Browse/>)} />
        // <Route path="/addlisting" element={protectedRoute(<AddListing />)} />
      </Routes>
    </Router>
  );
}

export default App;
