import { createContext, useEffect, useState } from 'react';
import apiHelper from '../apiHelper/apiHelper';

export const PostContext = createContext({});

const PostProvider = ({children}) => {
  const [posts, setPosts] = useState([]);
  const [singlePost, setSinglePost] = useState({
    title: "",
    author: "",
    tags: [],
    content: "",
    date: "",
    price: 0
  })

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    const response = await apiHelper.get("/posts");
    setPosts(response.data);
  }

  const getPostById = async (id) => {
    const response = await apiHelper.get(`/posts/post/${id}`);
    setSinglePost(response.data);
  }

  const createPost = async (obj) => {
    obj.author = "61b0c8ce2d0b0f3eef92da6e";
    obj.date = "2021/12/06";
    const response = await apiHelper.post("/posts/post", obj);
  }

  return (
    <PostContext.Provider
      value={{
        posts,
        singlePost,
        getPostById,
        createPost,
        setSinglePost
      }}
    >
      {children}
    </PostContext.Provider>
  )
}

export default PostProvider