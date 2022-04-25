import React, {
  useEffect,
  useState
} from "react";
import {
  getDocs,
  collection,
  deleteDoc,
  doc
} from "firebase/firestore";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  useNavigate
} from "react-router-dom";
import {
  useDispatch,
  useSelector
} from "react-redux";
import {
  authentication,
  db
} from "../backend/firebase-config";


function Browse({
  signedIn
}) {
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
      setItems(data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      })));
    };

    getPosts();
  }, []);

  return ( <
    div className = "container" >
    <
    div className = "d-flex w-50 align-items-center my-3 justify-content-center" >

    <
    input type = "text"
    value = {
      searchKey
    }
    onChange = {
      (e) => {
        setSearchKey(e.target.value);
      }
    }
    className = "form-control mx-2"
    placeholder = "search items"

    /
    >
    <
    select className = "form-control mt-3"
    value = {
      filterType
    }
    onChange = {
      (e) => {
        setFilterType(e.target.value);
      }
    } >
    <
    option value = "" > All < /option> <
    option value = "Books" > Books < /option> <
    option value = "Clothing" > Clothing < /option> <
    option value = "Furniture" > Furniture < /option> <
    option value = "Electronics" > Electronics < /option> <
    option value = "Sports Gear" > Sports Gear < /option> <
    /select> <
    /div> <
    div className = "row" >

    {
      items

      .filter((data) => data.title.toLowerCase().includes(searchKey))
      .filter((data) => data.category.includes(filterType))
      .map((item) => {
        return ( <
          div className = "col-md-4" >
          <
          div className = "m-2 p-1 product position-relative" >
          <
          div className = "product-content" >
          <
          h1 > {
            item.title
          } < /h1> <
          div className = "text-center" >
          <
          img src = {
            "https://i.pinimg.com/originals/f5/43/45/f543457069261f595ed8b896746099fb.jpg"
          }
          alt = ""
          className = "product-img" /
          >
          <
          /div> <
          /div> <
          div className = "product-actions" >
          <
          h2 > $ {
            item.price
          } < /h2> <
          p > Condition: {
            item.condition
          } < /p> <
          p > Description: {
            item.postText
          } < /p> <
          p > Sold By: {
            item.author.name
          } < /p> <
          div className = "d-flex" >

          <
          button className = "btn btn-info mx-2" > View Item < /button> <
          button className = "btn btn-info" > Post Item < /button> <
          /div> <
          /div> <
          /div> <
          /div>
        );
      })
    } <
    /div> <
    /div>
  );
}

export default Browse;
