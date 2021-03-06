import './App.css';
import {useState} from 'react';
import { authentication } from './backend/firebase-config';
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import { FaBars, FaCartPlus, FaUser } from "react-icons/fa";
import { signOut } from "firebase/auth";
import SignInScreen from './pages/SignInScreen';
import Browse from './pages/Browse';
import AddListing from './pages/AddListing';
import Cart from './pages/Cart';
import Orders from './pages/Orders';

import ProductInfo from './pages/ProductInfo';
import { useSelector } from "react-redux";



function App() {
    const [signedIn,setSignedIn] = useState(localStorage.getItem("setSignedIn"));
    const { cartItems } = useSelector((state) => state.cartReducer);


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
            <Link to="/addlisting"> Sell </Link>
            <Link to="/orders"> My Orders </Link>
            <Link to="/cart">  Cart ({cartItems.length})</Link>
            <button className="btn btn-danger" onClick={signUserOut}> Log Out</button>
          </>
        )}
      </nav>

             <Routes>
             <Route path="/" element={<SignInScreen setSignedIn={setSignedIn}/>} />
              <Route path="/browse" element={protectedRoute(<Browse signedIn={signedIn} />)} />
              <Route path="/addlisting" element={protectedRoute(<AddListing signedIn={signedIn}/>)} />
              <Route path="/cart" element={protectedRoute(<Cart />)} />
              <Route path="/orders" element={protectedRoute(<Orders />)} />
              <Route path="/productinfo/:itemid" element={protectedRoute(<ProductInfo />)} />

             </Routes>
      </Router>
  );
}

export default App;
