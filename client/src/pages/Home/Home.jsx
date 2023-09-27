import React from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import Card from '../../components/Card/Card'
import { Link } from 'react-router-dom'

const Home = () => {

    const images =[
        {img : "https://i.pinimg.com/236x/36/61/f6/3661f6833cfd35b5023371e70d9208f3.jpg"},
        {img : "https://i.pinimg.com/236x/3a/ce/b2/3aceb2e87abab046f1cd657721ab57a7.jpg"},
        {img : "https://i.pinimg.com/236x/fb/97/9d/fb979d746b570d15c877d79a601f145a.jpg"},
        {img : "https://i.pinimg.com/236x/4b/75/2a/4b752a2548cb329ed9e260bc112b7e3b.jpg"},
        {img : "https://i.pinimg.com/236x/52/8c/8a/528c8ad6d2049b9dd6b51561f1089298.jpg"},
        {img : "https://i.pinimg.com/236x/f4/47/2d/f4472d8f2d6845ebb2447828f292c470.jpg"},
        {img : "https://i.pinimg.com/236x/7f/38/8b/7f388bf33457e8f7932d630ab15f1eff.jpg"},
        {img : "https://i.pinimg.com/236x/57/ba/c0/57bac024bc03e0689e433193ee7cb756.jpg"},
        {img : "https://i.pinimg.com/236x/ac/44/9d/ac449d2cb3c026c3740cd8febd254a10.jpg"},
        
        {img : "https://i.pinimg.com/236x/d9/e6/61/d9e66131ec41b5f6591f0cbc1a7986aa.jpg"},
        {img : "https://i.pinimg.com/236x/07/cd/90/07cd903e905c0fdce1a47b3ae1ab99f5.jpg"},
        {img : "https://i.pinimg.com/474x/c0/2f/16/c02f1685ac4bdc272c513ba47c06fca7.jpg"},
        {img : "https://i.pinimg.com/236x/9b/36/5f/9b365f2a89b876e626d4a0998abbb552.jpg"},
        {img : "https://i.pinimg.com/236x/11/2e/b4/112eb4e5fc50d9696c02281c989b969b.jpg"},
    ]


    return (
        <div className='home'>            
            <div className="homecon">
                
                <div className="cards">
                {images.map((i)=>(
                    <Link to='/single/12'><Card src={i.img} key={i.img}/></Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home