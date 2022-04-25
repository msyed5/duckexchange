import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authentication, db } from "../backend/firebase-config";


function Browse({ signedIn }) {
  const [items, setItems] = useState([]);

  const [loading, setLoading] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [filterType, setFilterType] = useState("");
  const users = collection(db, "posts");
  const navigate = useNavigate();

  // useEffect(() => {
  //   getData();
  // }, []);

  // async function getData() {
  //   try {
  //     const users = await getDocs(collection(db, "posts"));
  //     const productsArray = [];
  //     users.forEach((doc) => {
  //       const obj = {
  //         id: doc.id,
  //         ...doc.data(),
  //       };
  //     });
  //
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }





  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
    window.location.reload()
  };

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(users);
      setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, []);

  return (
    <div className="homePage">
    <input
            type="text"
            value={searchKey}
            onChange={(e) => {
              setSearchKey(e.target.value);
            }}
            className="form-control mx-2"
            placeholder="search items"

          />
          <select
                  className="form-control mt-3"
                  value={filterType}
                  onChange={(e) => {
                    setFilterType(e.target.value);
                  }}
                >
                  <option value="">All</option>
                  <option value="Books">Books</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Sports Gear">Sports Gear</option>
                </select>
      {items

            .filter((data) => data.title.toLowerCase().includes(searchKey))
            .filter((data) => data.category.includes(filterType))
            .map((item) => {
        return (
          <div className="item">
            <div className="postHeader">
              <div className="title">
                <h1> {item.title}</h1>
              </div>
              <div className="deletePost">
                {signedIn && item.author.id === authentication.currentUser.uid
                //   && (
                //   <button
                //     onClick={() => {
                //       deletePost(item.id);
                //     }}
                //   >
                //     {" "}
                //     &#128465;
                //   </button>
                // )
              }
              </div>
            </div>
            <div className="postTextContainer"> Category: {item.category} </div>
            <div className="postTextContainer"> Price: {item.price} </div>
            <div className="postTextContainer"> Condition: {item.condition} </div>
            <div className="postTextContainer"> Description: {item.postText} </div>
            <p>Sold By: {item.author.name}</p>
            <button className="btn btn-info" > View Item </button>
            <button className="btn btn-info" > Post Item </button>

          </div>
        );
      })}
    </div>
  );
}

export default Browse;
