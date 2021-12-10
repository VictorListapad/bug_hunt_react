import { createContext, useState } from "react";
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
    const response = await apiHelper.get(`/comments/post/${id}`)
    setComments(response.data);
  }

  const createComment = async (obj) => {
    let { user } = JSON.parse(localStorage.getItem(jwt_string));
    obj.user = user._id;
    const response = await apiHelper.post("/comments/comment", obj);
    getCommentsFromPost(obj.post);
  }

  const deleteComment = async (obj, id) => {
    let { user } = JSON.parse(localStorage.getItem(jwt_string));
    if (user._id !== obj.user) return;
    await apiHelper.delete(`/comments/comment/${id}`);
    getCommentsFromPost(obj.post);
  } 

  return (
    <CommentContext.Provider
      value={{
        comments,
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