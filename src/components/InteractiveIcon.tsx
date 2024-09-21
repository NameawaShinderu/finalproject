import React, { useState, useEffect } from 'react';

interface InteractiveIconProps {
  onIconClick: () => void;
}

const InteractiveIcon: React.FC<InteractiveIconProps> = ({ onIconClick }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const messageInput = document.querySelector('.msg-form__contenteditable');
    if (messageInput) {
      const showIcon = () => setIsVisible(true);
      const hideIcon = () => setIsVisible(false);

      messageInput.addEventListener('mouseenter', showIcon);
      messageInput.addEventListener('focus', showIcon);
      messageInput.addEventListener('mouseleave', hideIcon);
      messageInput.addEventListener('blur', hideIcon);

      return () => {
        messageInput.removeEventListener('mouseenter', showIcon);
        messageInput.removeEventListener('focus', showIcon);
        messageInput.removeEventListener('mouseleave', hideIcon);
        messageInput.removeEventListener('blur', hideIcon);
      };
    }
  }, []);

  return (
    <div
      className={`absolute right-2 bottom-2 text-2xl cursor-pointer ${
        isVisible ? 'block' : 'hidden'
      }`}
      onClick={onIconClick}
    >
      🚀
    </div>
  );
};

export default InteractiveIcon;