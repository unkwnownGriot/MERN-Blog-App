import { Link } from 'react-router-dom';
import { useState } from 'react'
import './register.css';
import { useNavigate } from 'react-router';
import { axiosInstance } from '../../config';

const Register = () => {
    const navigate = useNavigate()
    const [username,setUsername ]= useState('')
    const [email,setEmail ]= useState('')
    const [password,setPassword ]= useState('')
    const [error,setError ]= useState(false)
    const handleSubmit = async(e)=>{
        if(!email.trim().length || !password.trim().length || username.trim().length){
            alert('you must enter valid input')
        }
        e.preventDefault()
        try{
            setError(false)
            const res = await axiosInstance.post('/auth/register',{
                username,
                email,
                password
            })
            if(res.data){
                navigate('/login')
            }
        }catch(err){
            setError(true)
        }
        
    }
    return (
        <div className='register'>
             <span className="register-title">Register</span>
            <form  className="register-form" onSubmit={handleSubmit}>
                <label> Username </label>
                <input type="text"placeholder='enter your username'
                onChange={(e)=>{setUsername(e.target.value)}} />
                <label> Email </label>
                <input type="text"placeholder='enter your email'
                onChange={(e)=>{setEmail(e.target.value)}} />
                <label> Password </label>
                <input type="password" placeholder='enter your password'
                onChange={(e)=>{setPassword(e.target.value)}} />
                <button className='register-btn' type='submit'>Register</button>
            </form>
            <button className='register-loginBtn'>
                <Link to='/login' className='link'> Login</Link>
            </button>
           {error && <span style={{color:"red",marginTop:"15px"}}>Something went wrong</span> }
        </div>
    );
};

export default Register;