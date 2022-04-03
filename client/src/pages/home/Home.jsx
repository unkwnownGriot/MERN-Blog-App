import { useState, useEffect } from 'react';
import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';
import Posts from '../../components/posts/Posts';
import './home.css'
import { useLocation } from 'react-router';
import { axiosInstance } from '../../config';

const Home = () => {
    const [posts,setPosts] = useState([])
    const {search} = useLocation()
    useEffect(()=>{
        const FetchPost = async()=>{
           const res = await axiosInstance.get("/posts"+search)
          setPosts(res.data)
        }
        FetchPost()
    },[search])


    return (
        <>
            <Header/>
            <div className='home'>
                <Posts posts={posts}/>
                <Sidebar/>
            </div>
        </>
       
    );
};

export default Home;