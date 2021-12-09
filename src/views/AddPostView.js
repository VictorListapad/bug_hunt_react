import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryContext } from "../context/CategoryContext";
import { PostContext } from "../context/PostContext";

const AddPostView = () => {
  const { singlePost, setSinglePost, createPost } = useContext(PostContext);
  const { categories } = useContext(CategoryContext);
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSinglePost({
      ...singlePost,
      [event.target.name]: event.target.value,
    });
  };

  const handleSelectCheckbox = (event) => {
    const tag = event.target.value;
    const idFound = selected.find((id) => tag === id);
    if (idFound) return;
    setSelected([...selected, event.target.value]);
    console.log(selected);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSinglePost({
      ...singlePost,
      tags: [...selected],
      // author: "61b0c8ce2d0b0f3eef92da6e",
      // date: "2021/12/06",
    });
    // console.log("OBJ before api call", singlePost)
    createPost(singlePost);
  };

  return (
    <div>
      <form className="form">
        <h2>Add Post</h2>
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
        {categories.map((cat) => (
          <div
            key={cat._id}
            style={{
              display: "inline-block",
              width: "auto",
              marginRight: "5px",
            }}
          >
            <input
              type="checkbox"
              onChange={handleSelectCheckbox}
              value={cat._id}
            />
            <label style={{ marginLeft: "2px" }}>{cat.name}</label>
          </div>
          // <p key={cat._id}>{cat.name}</p>
        ))}
        <label>Price</label>
        <input
          name="price"
          value={singlePost.price}
          onChange={handleChange}
          className="form-control"
          type="number"
          placeholder="price"
        />
        <button
          onClick={handleSubmit}
          className="btn btn-outline-dark form-control"
        >
          Add Post
        </button>
      </form>
    </div>
  );
};

export default AddPostView;
