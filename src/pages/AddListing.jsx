import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, authentication } from "../backend/firebase-config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


function CreatePost({ signedIn }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [postText, setPostText] = useState("");

  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();

  const createPost = async () => {
    //error checking empty inputs
    if ((title.length || price.length || postText.length || condition.length) == 0){
      alert("empty fields! try again");
    }
    else {
      await addDoc(postsCollectionRef, {
        title,
        price,
        condition,
        postText,
        category,
        author: { name: authentication.currentUser.displayName, id: authentication.currentUser.uid,
        email: authentication.currentUser.email},
      });
      alert("Listing created!");
    }
    navigate("/addlisting");
  };

  useEffect(() => {
    if (!signedIn) {
      navigate("/addlisting");
    }
  }, []);

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create New Listing</h1>
        <div className="inputGp">
          <label> Item:</label>
          <input
            placeholder="Item..."
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label> Category:</label>
          <select
                  className="form-control mt-3"
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                >
                  <option value="">Select a Category</option>
                  <option value="Books">Books</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Sports Gear">Sports Gear</option>
                </select>

        </div>
        <div className="inputGp">
          <label> Price($):</label>
          <input
            placeholder="Price..."
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label> Condition:</label>
          <input
            placeholder="Condition..."
            onChange={(e) => {
              setCondition(e.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label> Description:</label>
          <textarea
            placeholder="Description..."
            onChange={(e) => {
              setPostText(e.target.value);
            }}
          />
        </div>
        <button className="btn btn-info" onClick={createPost}> Post Listing</button>
      </div>
    </div>
  );
}

export default CreatePost;
