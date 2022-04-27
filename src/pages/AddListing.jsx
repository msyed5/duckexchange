//have to "npm install --save firebase"
import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, authentication, storage } from "../backend/firebase-config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ref, uploadBytes, getDownloadURL, listAll, list, } from "firebase/storage";
import { v4 } from 'uuid';







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
  const [condition, setCondition] = useState("");



  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();

  const createPost = async () => {
    //error checking empty inputs
    //if ((title.length || price.length || postText.length || condition.length) == 0){
    //  alert("empty fields! try again");
    //}
    //else {
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
        condition,
        author: { name: authentication.currentUser.displayName, id: authentication.currentUser.uid,
        email: authentication.currentUser.email},
      });
      //alert("Listing created!");
    //}
    navigate("/addlisting");
  };

  useEffect(() => {
    if (!signedIn) {
      navigate("/addlisting");
    }
  }, []);


  
  const storageRef = ref(storage, 'images');
  uploadBytes(storageRef, ).then((snapshot) => {
    console.log('uploaded a file');
  });
  
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const imagesListRef = ref(storage, "images/");
  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  };

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
          <select
                  className="form-control mt-3"
                  onChange={(e) => {
                    setCondition(e.target.value);
                  }}
                >
                  <option value="">Select Condition</option>
                  <option value="Brand New"> Brand New</option>
                  <option value="Like new">Like new</option>
                  <option value="Very good">Very good</option>
                  <option value="Good">Good</option>
                  <option value="Acceptable">Acceptable</option>
                </select>
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
            onChange={(e) => {
              setPostText(e.target.value);
            }}
          />
        </div>

        <br></br>
        <label>Picture:
          <br></br>
          <input type = "file" accept="image/png, image/gif, image/jpeg" onChange = {(event) => {setImageUpload(event.target.files)}}>
          </input>
        </label>

        <button className="btn btn-info" onClick = {() => {createPost();uploadFile()}}> Post Listing</button>
        {imageUrls.map((url) => {
          return <img src={url} />;
        })}
      </div>
    </div>
  </div>
  );
}

export default CreatePost;
