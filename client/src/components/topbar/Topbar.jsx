import './topbar.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../../context/Context';

const Topbar = () => {
    const PF = "https://elsamreactblog.herokuapp.com/images/"
    const {user,dispatch} = useContext(Context)
    const handleLogout = ()=>{
        dispatch({type:"LOGOUT"})
    }
    return (
        <div className='top'>
            <div className="top-left">
             <i className="topIcon fa-brands fa-facebook"></i>
             <i className="topIcon fa-brands fa-twitter"></i>
             <i className="topIcon fa-brands fa-pinterest"></i>
             <i className="topIcon fa-brands fa-instagram-square"></i>
            </div>
            <div className="top-center">
                <ul className="toplist">
                   <Link to='/' className='link'>
                    <li className="toplist-item">HOME</li>
                   </Link> 
                     <li className="toplist-item">ABOUT</li>
                  <Link to='/' className='link'>
                    <li className="toplist-item">CONTACT</li>
                  </Link>  
                   <Link to='/write' className='link'>
                    <li className="toplist-item">WRITE</li>
                   </Link> 
                  <li className="toplist-item" onClick={handleLogout}>
                      {user && "LOGOUT"}
                  </li>
                </ul>
            </div>
            <div className="top-right">
                {
                    user ? (
                    <Link to='/settings' className='link'>
                        <img src={user.profilePicture? 
                        PF+user.profilePicture : PF+"default-profile.jpg"} alt="" className='top-img' />
                    </Link>) :
                    (
                        <ul className='toplist'>
                            <Link to='/login' className='link'>
                                <li className="toplist-item">LOGIN</li>
                            </Link>
                            <Link to='/register' className='link'>
                                <li className="toplist-item">REGISTER</li>
                            </Link>
                        </ul>
                        
                    )
                }
               
                <i className="top-searchIcon fa-solid fa-magnifying-glass"></i>
            </div>
        </div>
    );
};

export default Topbar;