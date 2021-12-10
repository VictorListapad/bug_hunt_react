import { useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router";
import { PostContext } from "../context/PostContext";

const EditPostView = () => {
  const { singlePost, getPostById, setSinglePost, editPost, deletePost } = useContext(PostContext);
  const {user} = JSON.parse(localStorage.getItem('jwtbughunt'));
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getPostById(id);
  }, [])

  const handleChange = (event) => {
    setSinglePost({
      ...singlePost,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await editPost(id, singlePost);
  }

  const handleDelete = async (event) => {
    event.preventDefault();
    let choice = window.confirm("Are you sure?")
    if (!choice) return;
    await deletePost(id);
    navigate("/")
  }

  return (
    <div className="container mt-5">
       <form className="form">
        <h2>Edit Post: {singlePost.title}</h2>
        <label>Title</label>
        <input
          name="title"
          value={singlePost.title}
          onChange={handleChange}
          className="form-control"
          type="text"
          placeholder="title"
        />
        <label>Content</label>
        <textarea
          name="content"
          value={singlePost.content}
          onChange={handleChange}
          className="form-control my-3"
          type="text"
          placeholder="content"
        />
        <br />
        <label>Price</label>
        <input
          name="price"
          value={singlePost.price}
          onChange={handleChange}
          className="form-control"
          type="number"
          placeholder="price"
        />

        {user._id === singlePost.author._id && (
          <>
            <button
              onClick={handleSubmit}
              className="btn btn-outline-dark form-control mb-3"
            >
              Edit Post
            </button>
            <button
              onClick={handleDelete}
              className="btn btn-outline-danger form-control"
            >
              Delete Post
            </button>
          </>
        )}

      </form>
    </div>
  )
}

export default EditPostView