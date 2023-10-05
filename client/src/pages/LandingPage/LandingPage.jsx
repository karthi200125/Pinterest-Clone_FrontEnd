import React from 'react'
import './LandingPage.css'
import LandingPageNavbar from '../../components/LandingPageNavbar/LandingPageNavbar'
import Main from '../../components/Main/Main'

const LandingPage = () => {
  return (
    <div className='landingpage'>
        <LandingPageNavbar/>
        <Main/>
    </div>
  )
}

export default LandingPage