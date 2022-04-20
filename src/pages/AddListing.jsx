import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, authentication } from "../backend/firebase-config";
import { useNavigate } from "react-router-dom";
import { Dropdown, Option } from "./Dropdown";
import {
  DropdownWrapper,
  StyledSelect,
  StyledOption,
  StyledLabel,
  StyledButton,
} from "./styles.js";

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

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create New Listing</h1>
        <div className="inputGp">
          <label> Item:</label>
          <input
            placeholder="Item..."
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label> Category:</label>
          <Dropdown
            onChange={(event) => { //doesn't work
            setCategory(event.target.value); //doesn't work
          }}
          >
            <Option selected value="Choose a category"/>
            <Option value="Books"/>
            <Option value="Clothing"/>
            <Option value="Electronics"/>
            <Option value="Furniture"/>
            <Option value="Sports Gear"/>
          </Dropdown>
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
        <div className="inputGp">
          <label> Condition:</label>
          <input
            placeholder="Condition..."
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
        <button className="btn btn-info" onClick={createPost}> Post Listing</button>
      </div>
    </div>
  );
}

export default CreatePost;
