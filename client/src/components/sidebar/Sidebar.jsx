import { useState,useEffect,useContext } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../config';
import { Context } from '../../context/Context';
import './sidebar.css'

const Sidebar = () => {
    const {user}= useContext(Context)
    const [cats,setCat] = useState([])
    const PF = "https://elsamreactblog.herokuapp.com/images/"

    useEffect(()=>{
        const getCats = async()=>{
            const res = await axiosInstance.get('/categories')
            setCat(res.data)
        }
        getCats()
    },[])
    console.log(user)
    return (
        <div className='sidebar'>
            <div className="sidebar-item">
                <span className="sidebar-title">ABOUT ME</span>
                <img className='sidebar-img' src={PF+"2.avif"} alt="" />
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero 
                    architecto obcaecati itaque incidunt minus.fuga ipsam magnam.
                </p>
            </div>
            <div className="sidebar-item">
                 <span className="sidebar-title">CATEGORIES</span>
                 <ul className="sidebar-list">
                     {
                         cats.map(cat=>(
                             <Link key={cat._id} to={`/?cat=${cat.name}`} className='link'>
                                 <li  className="sidebar-listItem">{cat.name}</li>
                             </Link>
                            
                         ))
                     }
                 </ul>
            </div>
            <div className="sidebar-item">
            <span className="sidebar-title">FOLLOW US</span>
            <div className="sidebar-social">
                <i className="sidebarIcon fa-brands fa-facebook"></i>
                <i className="sidebarIcon fa-brands fa-twitter"></i>
                <i className="sidebarIcon fa-brands fa-pinterest"></i>
                <i className="sidebarIcon fa-brands fa-instagram-square"></i>
            </div>
            </div>
        </div>
    );
};

export default Sidebar;