import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { CommentContext } from "../context/CommentContext";
import { PostContext } from "../context/PostContext";
import { Link } from "react-router-dom";

const PostDetailView = () => {
  const { singlePost, getPostById, setSinglePost } = useContext(PostContext);
  const {
    getCommentsFromPost,
    comments,
    singleComment,
    setSingleComment,
    createComment,
    deleteComment
  } = useContext(CommentContext);
  const { id } = useParams();
  const { user } = JSON.parse(localStorage.getItem("jwtbughunt"));

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
    console.log(singleComment);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createComment(singleComment);
  };

  const handleDelete = async (comment) => {
    await deleteComment(comment, comment._id)
  }

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
          {user._id === singlePost.author?._id && (
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
        <form style={{ border: "solid 1px lightgrey", margin: "20px 0" }}>
          <textarea
            value={singleComment.content}
            onChange={handleCommentChange}
            className="form-control my-3"
            name="content"
          />
          <button
            onClick={handleSubmit}
            className="form-control my-3 btn btn-outline-dark"
          >
            Comment
          </button>
        </form>
        {comments?.map((comment) => (
          <div
            key={comment._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              border: "1px solid lightgrey",
              padding: 20,
              margin: 10,
              borderRadius: 5,
              backgroundColor: "lightgrey",
            }}
          > 
            <p>{comment.user.name}</p>
            <p >{comment.content}</p>
            {user._id === comment.user._id && (
              <button 
                onClick={() => handleDelete(comment)}
                className="btn btn-danger">
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostDetailView;
