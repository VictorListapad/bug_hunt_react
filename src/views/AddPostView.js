import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryContext } from "../context/CategoryContext";
import { PostContext } from "../context/PostContext";

const AddPostView = () => {
  const { singlePost, setSinglePost, createPost } = useContext(PostContext);
  const { categories } = useContext(CategoryContext);
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setSinglePost({
      title: "",
      author: "",
      tags: [],
      content: "",
      date: "",
      price: 0,
    });
  }, []);

  const handleChange = (event) => {
    setSinglePost({
      ...singlePost,
      [event.target.name]: event.target.value,
    });
    console.log(singlePost);
  };

  const handleSelectCheckbox = (event) => {
    const tagToAdd = event.target.value;
    console.log("TAG", tagToAdd);
    if (selected.includes(tagToAdd)) {
      setSelected(selected.filter((cat) => cat !== tagToAdd));
      setSinglePost({ ...singlePost, tags: [...selected] });
    } else {
      setSelected((oldValues) => [...oldValues, tagToAdd]);
      setSinglePost({ ...singlePost, tags: [...selected] });
    }
    console.log(selected);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSinglePost({
      ...singlePost,
      tags: [...selected],
    });
    createPost(singlePost);
    setSinglePost({
      title: "",
      author: "",
      tags: [],
      content: "",
      date: "",
      price: 0,
    });
    navigate("/")
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
        ))}
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
