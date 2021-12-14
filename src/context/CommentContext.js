import { createContext, useState } from "react";
import { toast } from "react-toastify";
import apiHelper from "../apiHelper/apiHelper";

export const CommentContext = createContext({})

const CommentProvider = ({children}) => {
  const [comments, setComments] = useState([]);
  const [singleComment, setSingleComment] = useState({
    user: "",
    post: "",
    content: ""
  })
  const jwt_string = "jwtbughunt";

  const getCommentsFromPost = async (id) => {
    try {
      const response = await apiHelper.get(`/comments/post/${id}`)
      setComments(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const createComment = async (obj) => {
    try {
      let { user } = JSON.parse(localStorage.getItem(jwt_string));
      obj.user = user._id;
      const response = await apiHelper.post("/comments/comment", obj);
      getCommentsFromPost(obj.post);
    } catch (error) {
      toast.error("You have to be logged in to comment on posts")      
    }
  }
  
  const deleteComment = async (obj) => {
    let { user } = JSON.parse(localStorage.getItem(jwt_string));
    if (user._id !== obj.user._id) return;
    try {
      await apiHelper.delete(`/comments/comment/${obj._id}`);
      console.log("HERE", obj.post);
      await getCommentsFromPost(obj.post._id);
    } catch (error) {
      console.log(error);
    }
  } 

  return (
    <CommentContext.Provider
      value={{
        comments,
        setComments,
        getCommentsFromPost,
        singleComment,
        setSingleComment,
        createComment,
        deleteComment
      }}
    >
      {children}
    </CommentContext.Provider>
  )
}

export default CommentProvider;