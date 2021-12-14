import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import apiHelper from '../apiHelper/apiHelper';

export const PostContext = createContext({});

const PostProvider = ({children}) => {
  const jwt_string = "jwtbughunt";
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    setTimeout( async () => {
      
      const response = await apiHelper.get("/posts");
      setPosts(response.data);
      setLoading(false);
    }, 1000)
  }

  const getPostById = async (id) => {
    try {
      const response = await apiHelper.get(`/posts/post/${id}`);
      setSinglePost(response.data);
    } catch (error) {
      console.log(error);      
    }
  }

  const createPost = async (obj) => {
    let { user } = JSON.parse(localStorage.getItem(jwt_string));
    obj.author = user._id;
    obj.date = new Date().toLocaleDateString();
    const response = await apiHelper.post("/posts/post", obj);
    toast.success('Post creted succcessfully');
    getAllPosts();
  }

  const editPost = async (id, obj) => {
    let {user} = JSON.parse(localStorage.getItem(jwt_string));
    if (obj.author._id !== user._id ) return;
    const response = await apiHelper.put(`/posts/post/${id}`, obj);
    toast.success('Post updated succcessfully');
    getAllPosts();
  }

  const deletePost = async (id) => {
    await apiHelper.delete(`/posts/post/${id}`);
    toast.error("Deleted post successfully")
    getAllPosts();
  }

  return (
    <PostContext.Provider
      value={{
        posts,
        singlePost,
        loading,
        getPostById,
        createPost,
        editPost,
        deletePost,
        setSinglePost
      }}
    >
      {children}
    </PostContext.Provider>
  )
}

export default PostProvider