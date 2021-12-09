import { Link } from 'react-router-dom';

const PostCard = ({obj}) => {
  return (
    <div className="postCard">
      <h4>{obj.author?.name}</h4>
      <h4>{obj.title}</h4>
      <p>{obj.content}</p>
      <p>
        {obj.tags?.map(tag => (
          <span key={tag._id}>{tag.name}</span>
        ))}
      </p>
      <span className="bottomLayer">
        <p>{new Date(obj.date).toISOString().split('T')[0]}</p>
        <Link className="btn btn-outline-dark" to={`/post/${obj._id}`}>View Post</Link>
      </span>
    </div>
  )
}

export default PostCard
