import { useContext, useState } from 'react'
import { AiOutlineClose, AiOutlineLogout } from 'react-icons/ai'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/Authcontext'
import { successToast } from '../../toasts'
import './MobileNav.css'

const MobileNav = ({ onclose }) => {
    const { user, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;

    const [close, setclose] = useState(true)
    const handleclose = () => {
        setclose(false)
        onclose(close)
    }



    const handleLogout = () => {
        localStorage.removeItem("user");
        dispatch({ type: "LOGOUT" });
        navigate('/');
        successToast("logged out successfully")
    };

    return (
        <div className='mn'>
            <AiOutlineClose size={20} className='mobnavclose' onClick={handleclose} />
            <ul className="mbnavlinks">
                <Link to='/home' onClick={handleclose}><li>Home</li></Link>
                <Link to='/explore' onClick={handleclose}><li >Explore</li></Link>
                <Link to='/create' onClick={handleclose}><li>Create</li></Link>
            </ul>
            <div className="mbnavbtm">
                <Link to={`/profile/${user._id}`} onClick={handleclose}>
                    <div className="mbnavpro btm" >
                        <img src={user.profilePic ? user.profilePic : 'https://images.getpng.net/uploads/preview/instagram-social-network-app-interface-icons-smartphone-frame-screen-template27-1151637511568djfdvfkdob.webp'} alt={user.username} />
                        <span>profile</span>
                    </div>
                </Link>
                <div className="mbnavlogout btm" onClick={handleLogout}>
                    <AiOutlineLogout size={20} />
                    <span>Logout</span>
                </div>
            </div>
        </div>
    )
}

export default MobileNav