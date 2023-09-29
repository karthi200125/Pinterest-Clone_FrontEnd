import React, { useEffect, useState } from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import Card from '../../components/Card/Card'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Home = () => {

const [posts , setposts] = useState([])
    
    useEffect(() => {
        const getallposts = async (data) => {
            try {
                const res = await axios.get("http://localhost:8800/api/posts/allposts")
                setposts(res.data)
            } catch (error) {
                console.log("fetch posts error", error)
            }
        }
        getallposts();
    }, [])

    console.log("all posts",posts)

    return (
        <div className='home'>
            <Navbar/>
            <div className="homecon">

                <div className="cards">
                    {posts.map((data) => (
                        // <Link to={`/single/${data._id}`} state={data}><Card src={data} key={data._id} /></Link>                        
                        <Card src={data} key={data._id} /> 
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home