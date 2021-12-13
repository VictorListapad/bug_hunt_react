import { useContext } from "react"
import PostCard from "../components/PostCard"
import { PostContext } from "../context/PostContext"

const HomeView = () => {
  const { posts, loading } = useContext(PostContext);

  return (
    <div className="container mt-5">
      { loading && (
        <h2>Loading ...</h2>
      )}
      <h2>Home View</h2>
      {posts.map(post => (
        <PostCard key={post._id} obj={post} />
      ))}
    </div>
  )
}

export default HomeView
