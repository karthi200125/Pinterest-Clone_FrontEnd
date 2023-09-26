import React from 'react';
import './Card.css';
import { RiUpload2Line } from 'react-icons/ri';
import { FiMoreHorizontal } from 'react-icons/fi';

const Card = ({ src }) => {
    return (
        <div className="card">
            <img src={src} alt="" className="card-image" />
            <button className="save-button">save</button>
            <div className="bottom">
                <div className="cardiconcon"><RiUpload2Line size={20} /></div>
                <div className="cardiconcon"><FiMoreHorizontal size={20} /></div>
            </div>
        </div>
    );
};

export default Card;
