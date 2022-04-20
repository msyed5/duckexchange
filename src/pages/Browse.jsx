import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import 'bootstrap/dist/css/bootstrap.min.css';

import { authentication, db } from "../backend/firebase-config";

function Browse({ signedIn }) {
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
    window.location.reload()
  };

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, []);

  return (
    <div className="homePage">
      {postLists.map((post) => {
        return (
          <div className="post">
            <div className="postHeader">
              <div className="title">
                <h1> {post.title}</h1>
              </div>
              <div className="deletePost">
                {signedIn && post.author.id === authentication.currentUser.uid
                //   && (
                //   <button
                //     onClick={() => {
                //       deletePost(post.id);
                //     }}
                //   >
                //     {" "}
                //     &#128465;
                //   </button>
                // )
              }
              </div>
            </div>
            <div className="postTextContainer"> Category: {post.category} </div>
            <div className="postTextContainer"> Price: {post.price} </div>
            <div className="postTextContainer"> Condition: {post.condition} </div>
            <div className="postTextContainer"> Description: {post.postText} </div>
            <p>Sold By: {post.author.name}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Browse;
