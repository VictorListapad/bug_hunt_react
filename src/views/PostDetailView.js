import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { PostContext } from "../context/PostContext";

const PostDetailView = () => {
  const { singlePost, getPostById } = useContext(PostContext);
  const { id } = useParams();

  useEffect(() => {
    getPostById(id);
  }, []);

  return (
    <div className="container mt-5 postDetails">
      <h2>{singlePost.title}</h2>
      <div className="row">
        <div className="col-8 mt-4">
          <code>{singlePost.content}</code>
        </div>
        <div className="col-4 tags mt-2">
          {singlePost.tags?.map((tag) => (
            <p>{tag.name}</p>
          ))}
        </div>
      </div>
      <p>
        Posted By {singlePost.author?.name} at{" "}
        {new Date(singlePost.date).toLocaleDateString()}
      </p>
    </div>
  );
};

export default PostDetailView;
