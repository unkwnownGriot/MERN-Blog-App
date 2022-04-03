import './login.css';
import { Link } from 'react-router-dom';
import { useRef,useEffect } from 'react'
import { useContext } from 'react';
import { Context } from '../../context/Context';
import { useNavigate } from 'react-router';
import { axiosInstance } from '../../config';


const Login = () => {
    const navigate = useNavigate()
    const userRef = useRef()
    const passRef = useRef()
    const { user, dispatch , isFetching,error} = useContext(Context)
    useEffect(()=>{
        if(user){
            navigate('/')
        }
    })

    const handleSubmit = async(e)=>{
        e.preventDefault()
        dispatch({type:"LOGIN_START"})
        try{
            const res = await axiosInstance.post('/auth/login',{
                username: userRef.current.value,
                password: passRef.current.value
            })
            dispatch({type:"LOGIN_SUCCESS", payload:res.data})
         

        }catch(err){
            dispatch({type:"LOGIN_FAILURE"})
        }
    }



    return (
        <div className='login'>
            <span className="login-title">Login</span>
            <form  className="login-form" onSubmit={handleSubmit}>
                <label> Username </label>
                <input type="text"placeholder='enter your username'
                ref={userRef} />
                <label> Password </label>
                <input type="password" placeholder='enter your password'
                ref={passRef} />
                <button className='login-btn' type='submit' disabled={isFetching}>
                    {isFetching?"Loading...":"Login"}
                </button>
                {error && <span style={{color:"red"}}>Wrong credentials</span> }
            </form>
            <button className='login-registerBtn' >
                <Link to='/register' className='link'> Register</Link>
            </button>
        </div>
    );
};

export default Login;