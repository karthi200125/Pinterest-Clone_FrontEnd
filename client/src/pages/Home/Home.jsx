import React, { useContext, useState, useEffect } from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import Card from '../../components/Card/Card';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { AuthContext } from '../../Context/Authcontext';
import Loading from '../../components/Loading/Loading';
import { useLocation } from 'react-router-dom';

const Home = () => {
    const { user } = useContext(AuthContext);

    const { isLoading, error, data } = useQuery(['posts'], async () => {
        const res = await makeRequest.get(`/posts/allposts`);
        const allPosts = res.data;                
        const filteredPosts = allPosts.filter(post => post.userId !== user._id);        
        return filteredPosts;
    });
    

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search');

    const [filteredPosts, setFilteredPosts] = useState(data);
    const [searchActive, setSearchActive] = useState(false);

    useEffect(() => {
        if (searchQuery && data) {
            const filtered = data?.filter(post => post?.p_title?.includes(searchQuery));
            setFilteredPosts(filtered);
            setSearchActive(true);
        } else {            
            setFilteredPosts(data);
            setSearchActive(false);
        }
    }, [searchQuery, data]);    

    
    return (
        <div className='home'>
            <Navbar />
            <div className="homecon">
                <div className="cards">
                    {isLoading ? (
                        <Loading />
                    ) : error ? (
                        <p>Error: {error.message}</p>
                    ) : (
                        (searchActive ? (
                            filteredPosts?.length === 0 ? (
                                <p className='noresult'>No results found "{`${searchQuery}`}"</p>
                            ) : (
                                filteredPosts?.map((post) => (                                    
                                        <Card src={post} key={post._id} />
                                ))
                            )
                        ) : (
                            data.map((post) => (                                
                                    <Card src={post} key={post._id} style={{pointerEvents:"none"}}/>
                            ))
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
