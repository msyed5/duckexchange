import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authentication, db, storage } from "../backend/firebase-config";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import "./css/Browse.css";

function Browse({ signedIn }) {
  const [items, setItems] = useState([]);
  const { cartItems } = useSelector((state) => state.cartReducer);
  const [loading, setLoading] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [filterType, setFilterType] = useState("");
  const users = collection(db, "posts");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
    window.location.reload();
  };

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(users);
      setItems(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };

    getPosts();
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
  };

  /*
  //to access image
  const [url, setUrl] = useState();

  useEffect(() => {
    const func = async () => {
      const reference = ref(storage, '/EmptyBook.jpg');
      await getDownloadURL(reference).then((e) => {
        setUrl(e);
        console.log("the url is " + url);
      })
    }
      func();
  })
*/

  return (
    <div className="container">
      <div className="d-flex my-3" id="search-container">
        <input
          type="text"
          value={searchKey}
          onChange={(e) => {
            setSearchKey(e.target.value);
          }}
          className="form-control mx-2 w-30"
          placeholder="Search Items"
          id="searchbar"
        />
        <select
          className="form-control mt-3 w-30"
          value={filterType}
          onChange={(e) => {
            setFilterType(e.target.value);
          }}
        >
          <option value=""> All </option> <option value="Books"> Books </option>{" "}
          <option value="Clothing"> Clothing </option>{" "}
          <option value="Furniture"> Furniture </option>{" "}
          <option value="Electronics"> Electronics </option>{" "}
          <option value="Sports Gear"> Sports Gear </option>{" "}
        </select>{" "}
      </div>{" "}
      <div className="row">
        {items
          .filter((data) => data.title.toLowerCase().includes(searchKey))
          .filter((data) => data.category.includes(filterType))
          .map((item) => {
            return (
              <div className="col-md-4">
                <div className="m-2 p-1 product position-relative">
                  <div className="product-content">
                    <h2 className="text-center"> {item.title} </h2>{" "}
                    <div className="text-center">
                      <img
                        src = "https://i.pinimg.com/originals/f5/43/45/f543457069261f595ed8b896746099fb.jpg"
                        alt=""
                        className="product-img"
                      />
                    </div>{" "}
                  </div>{" "}
                  <div className="product-actions">
                    <h2> $ {item.price} </h2>{" "}
                    <p> Condition: {item.condition} </p>{" "}
                    <p> Description: {item.postText} </p>{" "}
                    <p> Sold By: {item.author.name} </p>{" "}
                    <div className="d-flex">
                      <button
                        className="btn btn-info mx-2"
                        onClick={() => {
                          navigate(`/productinfo/${item.id}`);
                        }}
                      >
                        {" "}
                        View Item{" "}
                      </button>{" "}
                      <button
                        className="btn btn-info"
                        onClick={() => addToCart(item)}
                      >
                        {" "}
                        Add to Cart{" "}
                      </button>{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
              </div>
            );
          })}{" "}
      </div>{" "}
    </div>
  );
}

export default Browse;
