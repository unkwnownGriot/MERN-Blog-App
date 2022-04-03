import './singlePost.css';
import { useLocation,useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useEffect,useState,useContext } from 'react';
import { Context } from '../../context/Context';
import { axiosInstance } from '../../config';


const SinglePost = () => {
    const navigate = useNavigate()
    const {user} = useContext(Context)
    const [post,setPost] = useState([])
    const [title,setTitle] = useState('')
    const [desc,setDesc] = useState('')
    const [update,setUpdate] = useState(false)
    const location = useLocation()
    const path = location.pathname.split('/')[2]
    const PF = "https://elsamreactblog.herokuapp.com/images/"
    useEffect(()=>{
        const getPost = async()=>{
            const res = await axiosInstance.get('/posts/'+path)
            setPost(res.data)
            setTitle(res.data.title)
            setDesc(res.data.desc)

        }
        getPost()
    },[path])

    const handleDelete =async()=>{
        try{
            await axiosInstance.delete("/posts/"+path,{
               data:{ username:user.username}
            })
            navigate('/')
        }catch(err){
            console.log(err)
        }
       
    }

const handleUpdate =async ()=>{
    try{
        await axiosInstance.put("/posts/"+path,{
         username:user.username,
        title,
        desc})
       window.location.reload()
    }catch(err){
        console.log(err)
    }
}

    return (
        <div className='singlePost'>
            <div className="single-postWrapper">
              {post.postImg &&  <img src={PF+post.postImg} 
              alt="" className="single-postImg" />}

              {
                  update ? <input type="text" value={title}
                  className='single-postTitleInput' autoFocus
                  onChange={(e)=>setTitle(e.target.value)} /> :
                  (
                    <h1 className="single-postTitle">
                    {title}
                    {
                        post.username === user?.username && (
                            <div className="single-postEdit">
                                 <i className=" single-postIcon fa-solid fa-pen-to-square"
                                 onClick={()=>setUpdate(true)}></i>
                                <i className=" single-postIcon fa-solid fa-trash-can"
                                onClick={handleDelete}></i>
                            </div>
                        )
                    }
                    
                    </h1>
                  )
              }
                
                <div className="single-postInfo">
                  
                    <Link to = {`/?user=${post.username}`} className='link'>
                         <span className='single-postAuthor'>
                            Author:  <b>{post.username}</b>
                        </span>
                    </Link>
                   
                    <span className='single-postDate'>{new Date(post.createdAt).toDateString()}</span>
                </div>
                {
                    update ? <textarea className='single-postDescInput'
                    value={desc} onChange={(e)=>setDesc(e.target.value)} /> :(
                        <p className="single-postDesc">
                            {desc}
                        </p>
                    )
                }
              {update &&  <button className='singlePost-btn'
                onClick={handleUpdate}>Update</button>}
                    
            </div>
        </div>
    );
};

export default SinglePost;