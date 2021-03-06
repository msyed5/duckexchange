import React, { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../backend/firebase-config";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { FaBars, FaCartPlus, FaUser } from "react-icons/fa";
import './css/ProductInfo.css';

function ProductInfo() {
  const [item, setItem] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cartReducer);
  const params = useParams();
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setLoading(true);
      const productTemp = await getDoc(
        doc(db, "posts", params.itemid)
      );

      setItem(productTemp.data());
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const addToCart = (item) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
  };
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);


  return (
  <div className="container">
    <div className="justify-content-center">

        {item && (
           <div>
          <div className="row">
          <h1>{item.title}</h1>
              <div className="col-md">
            <img src={"https://i.pinimg.com/originals/f5/43/45/f543457069261f595ed8b896746099fb.jpg"} className="product-info-img"/>
            </div>
            <div id="words">
            <h3> Description: {item.postText}</h3>
            <h3> Condition: {item.condition}</h3>
            <h3> Sold By: {item.author.name}</h3>
            <h3> Price: ${item.price}</h3>
            </div>
            </div>
            <div className="d-flex justify-content-center" id="addToCart">
            <button className="btn-lg btn-success" id="button" onClick={()=>addToCart(item)} > <FaCartPlus /> ADD TO CART</button>

            </div>

          </div>
        )}

    </div>
  </div>
);
}

export default ProductInfo;
