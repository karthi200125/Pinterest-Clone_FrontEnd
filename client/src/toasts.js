import { toast } from "react-hot-toast";

export const successToast = (msg) => {
  toast.success(msg, {
    duration: 4000,
    position: 'bottom-left',
    style: {
      background: 'black',
      color: '#00FF00',
      fontWeight:"700",
      fontSize:'15px'
    },
  });
};

export const errorToast = (msg ) => {
  toast.error(msg, {
    duration: 4000,
    position: 'bottom-left',
    style: {
      background: 'black',
      color: 'red',
      fontWeight:"700",
      fontSize:'15px'
    },
  });
};
export const emojiToast = (msg , icon) => {
  toast(msg, {
    duration: 2000,
    position: 'top-center',    
    icon: icon || '👏'
  });
};
