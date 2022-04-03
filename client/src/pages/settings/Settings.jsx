import './settings.css';
import Sidebar from '../../components/sidebar/Sidebar'
import { useContext,useState } from 'react';
import { Context } from '../../context/Context';
import { axiosInstance } from '../../config';


const Settings = () => {
    const {user,dispatch}=  useContext(Context)
    const [file,setFile]= useState(null)
    const [username,setUsername]= useState('')
    const [password,setPassword]= useState('')
    const [email,setEmail]= useState('')
    const [success,setSuccess]= useState(false)
    const PF = "https://elsamreactblog.herokuapp.com/images/"

    const handleSubmit =async (e)=>{
        if(!email.trim().length || !password.trim().length || username.trim().length){
            alert('you must enter valid input')
        }
        e.preventDefault()
        dispatch({type:"UPDATE_START"})
        const updateUser = {
            username,
            password,
            email,
            userId:user._id
        }

        if(file){
            const data = new FormData()
            const fileName = Date.now() + file.name
            data.append("name",fileName)
            data.append("file",file)
            updateUser.profilePicture = fileName
            try{
                await axiosInstance.post('/upload',data)
            }catch(err){
                console.log(err)
            }
        }
        try{
           const res = await axiosInstance.put('/users/'+user._id, updateUser)
            dispatch({type:"UPDATE_SUCCESS",payload:res.data})
            setSuccess(true)
        }catch(err){
            dispatch({type:"UPDATE_ERROR"})
        }
        
    }

    return (
        <div className='settings'>
            <div className="settings-wrapper">
               <div className="settings-title">
                   <span className="settings-updateTitle">Update account</span>
                   <span className="settings-deleteTitle">Delete account</span>
               </div>
               <form  className="settings-form" onSubmit={handleSubmit}>
                   <label>Profile picture</label>
                   <div className="settings-profilePicture">
                       <img src={file ? URL.createObjectURL(file) :
                        user.profilePicture ? PF+user.profilePicture : PF+ "default-profile.jpg"} alt="" />
                       <label htmlFor="file">
                         <i className=" settings-profilePicIcon fa-solid fa-user"></i>
                       </label>
                       <input type="file" id="file" hidden 
                       onChange={e=>setFile(e.target.files[0])}/>
                   </div>
                   <label>Username</label>
                   <input type="text" placeholder={user.username} 
                    onChange={(e)=>setUsername(e.target.value)}  />
                   <label>Email</label>
                   <input type="email" placeholder={user.email} 
                    onChange={(e)=>setEmail(e.target.value)} />
                   <label>Password</label>
                   <input type="password" 
                   onChange={(e)=>setPassword(e.target.value)}  />
                   <button className='settings-submit' type='submit'>Update</button>
                   {success && <span style={{color:"green",textAlign:"center",marginTop:"15px"}}> Profile updated successfully </span> }
               </form>
            </div>
             <Sidebar/>
        </div>
    );
};

export default Settings;