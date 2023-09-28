import React, { useContext } from 'react'
import './More.css'
import { AuthContext } from '../../Context/Authcontext'
import { useNavigate } from 'react-router-dom'

const More = () => {

const {user , dispatch} = useContext(AuthContext)
const navigate = useNavigate();

const handleLogout =()=>{
  localStorage.removeItem("user")
  dispatch({type:"LOGOUT"})
  navigate('/')
}

  return (
    <div className='more'>
      <p>Currently in</p>
      <div className="infobox">
        <img src="https://i.pinimg.com/75x75_RS/41/7e/5c/417e5c126d9754ecc265007a096f97a1.jpg" alt="" />
        <div className="details">
          <h1>Karthkeyan</h1>
          <span>Personal</span>
          <span>skarthekayn@gmnail.com</span>
        </div>
      </div>
      <button className='logout' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default More