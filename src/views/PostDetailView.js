import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { CommentContext } from "../context/CommentContext";
import { PostContext } from "../context/PostContext";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import CommentCard from "../components/CommentCard";
import CommentForm from "../components/CommentForm";

const PostDetailView = () => {
  const { user } = useContext(AuthContext);
  const { singlePost, getPostById } = useContext(PostContext);
  // local state for comment
  const [singleComment, setSingleComment] = useState({
    user: "",
    post: "",
    content: "",
  });
  // comment context
  const {
    setComments,
    getCommentsFromPost,
    comments,
    createComment,
    deleteComment,
  } = useContext(CommentContext);

  // id from url params
  const { id } = useParams();

  useEffect(() => {
    getPostById(id);
    getCommentsFromPost(id);
    setSingleComment({
      ...singleComment,
      post: id,
    });
  }, []);

  const handleCommentChange = (event) => {
    setSingleComment({
      ...singleComment,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createComment(singleComment);
    setSingleComment({
      user: "",
      post: id,
      content: "",
    });
  };

  const handleDelete = async (comment) => {
    const filtered = comments.filter((val) => val != comment); // clearn on front
    setComments(filtered); // set new state;
    await deleteComment(comment, comment._id); // delete on the backend
  };

  return (
    <div className="container mt-5 postDetails">
      <h2>{singlePost.title}</h2>
      <div className="row">
        <div className="col-8 mt-4">
          <code>{singlePost.content}</code>
        </div>
        <div style={{ minHeight: 80 }} className="col-4 tags mt-2">
          {singlePost.tags?.map((tag) => (
            <p key={tag._id}>{tag.name}</p>
          ))}
          {singlePost.tags.length === 0 && <p>No tags to display</p>}
          {user && user?._id === singlePost.author?._id && (
            <Link to={`/editPost/${id}`} className="btn btn-outline-dark">
              Edit
            </Link>
          )}
        </div>
      </div>
      <p>
        Posted By {singlePost.author?.name} at{" "}
        {new Date(singlePost.date).toLocaleDateString()}
      </p>
      <div className="row">
        <CommentForm
          handleCommentChange={handleCommentChange}
          singleComment={singleComment}
          func={handleSubmit}
        />
        {comments?.map((comment) => (
          <CommentCard
            key={comment._id}
            func={() => handleDelete(comment)}
            comment={comment}
          />
        ))}
      </div>
    </div>
  );
};

export default PostDetailView;
