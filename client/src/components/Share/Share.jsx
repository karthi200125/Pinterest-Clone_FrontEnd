import React from 'react';
import { FaTimes } from 'react-icons/fa';
import './Share.css';
import {
  FacebookShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TelegramShareButton,
  WhatsappIcon,
  PinterestShareButton,
  PinterestIcon,
  TelegramIcon,
} from 'react-share';

const Share = ({ imageUrl, shareClose }) => {
  const shareUrl = imageUrl;

  return (
    <div className='sharecon'>
      <FaTimes size={20} onClick={() => shareClose(false)} />
      <div className='shareicons'>
        <FacebookShareButton url={shareUrl}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>

        <WhatsappShareButton url={shareUrl}>
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>

        <TelegramShareButton url={shareUrl}>
          <TelegramIcon size={32} round />
        </TelegramShareButton>

        <PinterestShareButton url={shareUrl}>
          <PinterestIcon size={32} round />
        </PinterestShareButton>
      </div>
    </div>
  );
};

export default Share;
