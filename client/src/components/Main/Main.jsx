import React, { useState, useEffect } from 'react';
import './Main.css';
import { BsChevronDown } from 'react-icons/bs';
import p1 from '../../assets/p1.jpg'
import p2 from '../../assets/p2.jpg'
import p3 from '../../assets/p3.jpg'
import p4 from '../../assets/p4.jpg'
import p5 from '../../assets/p5.jpg'
import p6 from '../../assets/p6.jpg'

const Main = () => {
  const letters = ["outfit Idea", "DIY idea", "chai time snacks idea", "Home Decor idea"];
  const colors = ["red", "blue", "rgb(190, 190, 16)", "purple"]; 
  const [ideaIndex, setIdeaIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIdeaIndex((prevIndex) => (prevIndex + 1) % letters.length);
    }, 4000);

    return () => {
      clearInterval(interval); 
    };
  }, []);

  const idea = letters[ideaIndex];
  const color = colors[ideaIndex];

  const h2Style = {
    color: color, 
  };

  return (
    <div className='maincon'>
      <div className="main">
        <h1>Get Your Next</h1>
        <h2 style={h2Style}>{idea}</h2>
      </div>
      <div className="downicon">
        <BsChevronDown size={22} />
      </div>
      <div className="mainimages">
        <img src={p1} alt="" loading='lazy' />
        <img src={p2} alt="" loading='lazy' />
        <img src={p3} alt="" loading='lazy' />
        <img src={p4} alt="" loading='lazy' />
        <img src={p5} alt="" loading='lazy' />        
        <img src={p6} alt="" loading='lazy' />        
        <img src={p1} alt="" loading='lazy' />        
      </div>
    </div>
  );
}

export default Main;
