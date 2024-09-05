import { useState, useEffect } from 'react'
import {getPosts, getPost, createPost, updatePost, deletePost} from "./api.js"
import './App.css'

function App() {

  const [posts, setPosts] = useState();

  function makePost() {
    let postObject = {
      title: "asdfaswf",
      description: "1111B",
      content:"C2",
      author: "D34r345345DD",
      dateCreated: new Date()
    }

    createPost(postObject)
  }

  // useEffect(() => {
  //   async function loadAllPosts() {
  //     let data = await getPosts();
  //     if (data) {
  //       setPosts(data)
  //     }
  //   }
  //   loadAllPosts();
  // },[])

  return (
    <>
      <button onClick={makePost}>추가 하기</button>
    </>
  )
}

export default App
