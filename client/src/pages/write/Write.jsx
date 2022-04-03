import { useState,useContext } from 'react';
import  './write.css'
import {axiosInstance} from "../../config"
import { Context } from '../../context/Context';
import { useNavigate } from 'react-router';

const Write = () => {
    const navigate = useNavigate()
    const [title,setTitle]= useState("")
    const [desc,setDesc]= useState("")
    const [file,setFile]= useState(null)
    const {user} = useContext(Context)

    const handleSubmit =async (e)=>{
        if(!desc.trim().length || !title.trim().length){
            alert('you must enter valid input')
        }
        e.preventDefault()
        const newPost = {
            title,
            desc,
            username:user.username
        }

        if(file){
            const data = new FormData()
            const fileName = Date.now() + file.name
            data.append("name",fileName)
            data.append("file",file)
            newPost.postImg = fileName
            try{
                await axiosInstance.post('/upload',data)
            }catch(err){
                console.log(err)
            }
        }
        try{
           const res =  await axiosInstance.post('/posts',newPost)
           navigate("/post/"+res.data._id)
        }catch(err){
            console.log(err)
        }
        
    }

    return (
        <div className='write'>
            {
                file && (<img src={URL.createObjectURL(file)}
                className='write-img' alt="" />)
            }
            
            <form className='write-form' onSubmit={handleSubmit}>
                    <div className="write-formGroup">
                        <label htmlFor="file">
                            <input type="file" id='file' hidden 
                            onChange={e=>setFile(e.target.files[0])}/>
                            <i className="write-icon fa-solid fa-plus"></i>
                        </label>
                        <input type="text" placeholder='title' onChange={e=>setTitle(e.target.value)}
                        className='write-input' autoFocus={true} />
                    </div>
                    <div className="write-formGroup">
                        <textarea placeholder='Tell your story...' type='text' 
                        className='write-input write-text' onChange={e=>setDesc(e.target.value)}>

                        </textarea>
                    </div>
                    <button className="write-submit" type='submit'>Publish</button>
            </form>
        </div>
    );
};

export default Write;