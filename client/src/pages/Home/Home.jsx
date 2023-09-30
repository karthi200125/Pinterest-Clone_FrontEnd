import React, { useContext } from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import Card from '../../components/Card/Card'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { makeRequest } from '../../axios'
import { AuthContext } from '../../Context/Authcontext'

const Home = () => {

  const {user} = useContext(AuthContext)

  const { isLoading, error, data } = useQuery(['posts'], async () => {
    const res = await makeRequest.get(`/posts/${user._id}`);
    return res.data
  })

  return (
    <div className='home'>
      <Navbar/>
      <div className="homecon">
        <div className="cards">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : (
            data.map((post) => (
              <Link to={`/single/${post._id}`} key={post._id} state={post}>
                <Card src={post} key={post._id}/>
                </Link>                        
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
