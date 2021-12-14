import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CommentContext } from "../context/CommentContext";

const CommentCard = ({ comment, func}) => {
  const { user } = useContext(AuthContext);
  const { deleteComment } = useContext(CommentContext)

  

  return (
    <div className="commentCard">
      <p>{comment.user.name}</p>
      <p>{comment.content}</p>
      { user?._id === comment.user._id && (
        <button
          onClick={func}
          className="btn btn-danger"
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default CommentCard;
