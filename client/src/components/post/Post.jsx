import './post.css';
import { Link } from 'react-router-dom';

const Post = ({post}) => {
    const PF = "https://elsamreactblog.herokuapp.com/images/"
    
    console.log(post.postImg)
    return (
        <div className='post'>
            {
                post.postImg && <img src={PF+post.postImg} alt="" className="post-img" />
            }
            
            <div className="post-info">
                <div className="post-categories">
                    {
                        post.categories.map(cat=>(
                            <span className="post-categorie">{cat.name}</span>
                        ))
                    }
                </div>
                <Link to={`/post/${post._id}`} className='link' >
                    <span className="post-title">
                    {post.title}
                    </span>
                </Link>
                <hr />
                <span className="post-date">{new Date(post.createdAt).toDateString()}</span>
            </div>
            <p className='post-desc'>
                {post.desc}
            </p>
        </div>
    );
};

export default Post;