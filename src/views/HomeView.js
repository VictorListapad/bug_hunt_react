import { useContext } from "react";
import PostCard from "../components/PostCard";
import { PostContext } from "../context/PostContext";

import { Spinner } from "react-bootstrap";

const HomeView = () => {
  const { posts, loading } = useContext(PostContext);

  return (
    <div className="container mt-5">
      <h2>Home View</h2>
      {loading && (
        <div>
          <Spinner
            style={{width: 50, height: 50, display: 'flex', margin: '0 auto'}}
            animation="border"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <h2 style={{display: 'flex', margin: '20px auto', justifyContent: 'center'}}>Loading ...</h2>
        </div>
      )}
      {posts.map((post) => (
        <PostCard key={post._id} obj={post} />
      ))}
    </div>
  );
};

export default HomeView;
