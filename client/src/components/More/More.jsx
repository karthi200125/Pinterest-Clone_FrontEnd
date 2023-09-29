import React, { useContext } from 'react'
import './More.css'
import { AuthContext } from '../../Context/Authcontext'
import { useNavigate } from 'react-router-dom'
import {AiOutlineLogout} from 'react-icons/ai'

const More = () => {

  const { user, dispatch } = useContext(AuthContext)
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user")
    dispatch({ type: "LOGOUT" })
    navigate('/')
  }
  

  return (
    <div className='more'>
      <p>Currently in</p>
      <div className="infobox">
        {user.profilePic ?
          <img src={"../upload/" + user.profilePic} alt={user.username} />
          :
          <img src="https://images.getpng.net/uploads/preview/instagram-social-network-app-interface-icons-smartphone-frame-screen-template27-1151637511568djfdvfkdob.webp" alt="" className='morepropic' />
        }
        <div className="details">
          <h1>{user.username}</h1>
          <span>Personal</span>
          <span>{user.email}</span>
        </div>
      </div>
      <button className='logout' onClick={handleLogout}>Logout
      <AiOutlineLogout size={20}/>
      </button>
    </div>
  )
}

export default More