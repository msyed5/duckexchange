import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, authentication } from "../backend/firebase-config";
import { useNavigate } from "react-router-dom";

function CreatePost({ signedIn }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [postText, setPostText] = useState("");

  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();

  const createPost = async () => {
    await addDoc(postsCollectionRef, {
      title,
      price,
      condition,
      postText,
      category,
      author: { name: authentication.currentUser.displayName, id: authentication.currentUser.uid },
    });
    navigate("/addlisting");
  };

  useEffect(() => {
    if (!signedIn) {
      navigate("/addlisting");
    }
  }, []);

  const select = document.getElementById('chooseType')
  const inputs = document.querySelector('section')


  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create New Listing</h1>
        
        <br></br>
        <div classname="inputGp">
          <label>Category:</label>
          <br></br>
          <select
            id = "select"
            name = "category"
            value = {category}
            onChange = {(event) => {
              setCategory(event.target.value);
            }}
            
            >
              <option value = "Books">Books</option>
              <option value = "Clothing">Clothing</option>
              <option value = "Electronics">Electronics</option>
              <option value = "Sports Gear">Sports Gear</option>
              <option value = "Furniture">Furniture</option>
              <option value = "Other">Other</option>
            </select>
        </div>
        <div className="inputGp">
          <label> Price:</label>
          <input
            placeholder="Price..."
            onChange={(event) => {
              setPrice(event.target.value);
            }}
          />
        </div>
        <div className="inputGp"
          id = "inputs"
        >
          <label> Title:</label>
          <input
            placeholder="Item..."
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label> Edition:</label>
          <input
            placeholder="Edition..."
            onChange={(event) => {
              setCondition(event.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label> Description:</label>
          <textarea
            placeholder="Description..."
            onChange={(event) => {
              setPostText(event.target.value);
            }}
          />
        </div>
        <button disabled = {!(price, title, condition)} className="btn btn-info" onClick={createPost}> Post Listing</button>
      </div>
    </div>
  );
}

export default CreatePost;
