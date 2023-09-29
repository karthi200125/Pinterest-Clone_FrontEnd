import React from 'react';
import {
    FacebookShareButton,
    EmailShareButton,
    WhatsappShareButton,
    TwitterShareButton,
} from 'react-share';
import { FaFacebook, FaEnvelope, FaWhatsapp, FaTwitter } from 'react-icons/fa';

const Share = ({ shareUrl, title }) => {
    return (
        <div>
            <h2>Share this post:</h2>
            
            {/* Facebook */}
            <FacebookShareButton url={shareUrl} quote={title}>
                <FaFacebook size={32} style={{color:"#1877F2"}}/> 
            </FacebookShareButton>

            {/* Mail */}
            <EmailShareButton url={shareUrl} subject={title}>
                <FaEnvelope size={32} style={{color:"red"}}/> 
            </EmailShareButton>

            {/* WhatsApp */}
            <WhatsappShareButton url={shareUrl} title={title}>
                <FaWhatsapp size={32} style={{color:"#25D366"}}/> 
            </WhatsappShareButton>

            {/* Twitter */}
            <TwitterShareButton url={shareUrl} title={title}>
                <FaTwitter size={32} style={{color:"#1DA1F2"}}/> 
            </TwitterShareButton>
        </div>
    );
};

export default Share;
