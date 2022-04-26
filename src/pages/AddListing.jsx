import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, authentication } from "../backend/firebase-config";
import { useNavigate } from "react-router-dom";





function CreatePost({ signedIn }) {
  const [title, setTitle] = useState("");
  const [edition, setEdition] = useState("");
  const [courseNumber, setCourseNumber] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [color, setColor] = useState("");
  const [postText, setPostText] = useState("");
  const [dimension, setDimension] = useState("");
  const [model, setModel] = useState("");
  const [size, setSize] = useState("");

  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();

  const createPost = async () => {
    await addDoc(postsCollectionRef, {
      title,
      price,
      postText,
      category,
      edition,
      courseNumber,
      weight,
      color,
      dimension,
      model,
      size,
      author: { name: authentication.currentUser.displayName, id: authentication.currentUser.uid },
    });
    navigate("/addlisting");
  };

  useEffect(() => {
    if (!signedIn) {
      navigate("/addlisting");
    }
  }, []);

  const [visible, setVisible] = React.useState(false);

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
              <option value = "Books" >Book</option>
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


        <div id = "BookInputs">
          
          <div className="inputGp">
            <label> Title:</label>
            <input
              placeholder="Title..."
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
                setEdition(event.target.value);
              }}
            />
          </div>
          <div className="inputGp">
            <label> Course Number:</label>
            <input
              placeholder="Course Number..."
              onChange={(event) => {
                setCourseNumber(event.target.value);
              }}
            />
          </div>
        </div>


        <div id = "ClothingInputs">
          <div className="inputGp">
            <label> Size:</label>
            <input
              placeholder="Size..."
              onChange={(event) => {
                setSize(event.target.value);
              }}
            />
          </div>
          <div className="inputGp">
            <label> Color:</label>
            <input
              placeholder="Color..."
              onChange={(event) => {
                setColor(event.target.value);
              }}
            />
          </div>
        </div>

        <div id = "FurnitureInputs">
          <div className="inputGp">
            <label> Color:</label>
            <input
              placeholder="Color..."
              onChange={(event) => {
                setColor(event.target.value);
              }}
            />
          </div>
          <div className="inputGp">
            <label> Dimensions:</label>
            <input
              placeholder="Dimension..."
              onChange={(event) => {
              setDimension(event.target.value);
              }}
            />
            <div className="inputGp">
            <label> Weight:</label>
            <input
              placeholder="Weight..."
              onChange={(event) => {
                setWeight(event.target.value);
              }}
            />
          </div>
        </div>

        <div id = "ElectronicInputs">
          <div className="inputGp">
            <label> Model:</label>
            <input
              placeholder="Model..."
              onChange={(event) => {
                setModel(event.target.value);
              }}
            />
          </div>
          <div className="inputGp">
            <label> Dimensions:</label>
            <input
              placeholder="Dimension..."
              onChange={(event) => {
                setDimension(event.target.value);
              }}
            />
            </div>
            <div className="inputGp">
            <label> Weight:</label>
            <input
              placeholder="Weight..."
              onChange={(event) => {
                setWeight(event.target.value);
              }}
            />
          </div>
        </div>

        <div id = "SportsInputs">
          <div className="inputGp">
            <label> Weight:</label>
            <input
              placeholder="Weight..."
              onChange={(event) => {
                setWeight(event.target.value);
              }}
            />
          </div>
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

        <button disabled = {!(price, title)} className="btn btn-info" onClick={createPost}> Post Listing</button>
      </div>
    </div>
  </div>
  );
}

export default CreatePost;
