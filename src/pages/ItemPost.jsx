//you need to use the command "npm install --save styled-components" in order for the dropdown commands to work
import React, {useState} from "react";
import {
    getFirestore,
    addDoc,
    collection,
} from 'firebase/firestore';


//firebase constants----------------------------------------------------------------
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

initializeApp({
    credential: applicationDefault()
});

//----------------------------------------------------------------------------------


const ItemPost = ()=>{

    //variables to store input
    const [state, setState] = useState({
        price: "",
        itemType: "",
        quantity: "",
        disc: "",
        picture: "",
    })

    const handleChange = e => {
        setState({
          ...state,
          [e.target.name]: e.target.value,
        })
    }


    return(
        <div>
            <h1>Duck Exchange</h1>

            <h2>Post</h2>
            <label>Item Type: </label>
            <select
                name="itemType"
                value={state.itemType}
                onChange={handleChange}
            >
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
                <option value="Books">Books</option>
                <option value="Other">Other</option>
            </select>
            <br></br>
            <br></br>



            <label>Price:
                <br></br>
                <input
                    name = "price"
                    type = "number"
                    value = {state.price}
                    onChange = {handleChange}
                />
                <br></br>
            </label>

            <label>Quantity:
                <br></br>
                <input
                    name = "quantity"
                    type = "number"
                    value = {state.quantity}
                    onChange = {handleChange}

                />
                <br></br>
            </label>

            <label>Item Description:
                <br></br>
                <input
                    name = "ItemDescription"
                    type = "default"

                />
                <br></br>
            </label>

            <label>Picture(s):
                <br></br>
                <input type = "file" multiple/>
            </label>
            <br></br>

            <br></br>
            <input type = "submit"></input>


        </div>
    )
}


//const firestore = getFirestore();

const newPost = collection(firestore, 'User Posts');

async function createNewPost(){

    const newDoc = await addDoc(newPost, {
        price: this.value,
        quantity: this.value,
        test: "this is a test value",

    });
}

createNewPost();


export default ItemPost;
