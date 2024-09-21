import * as React from 'react';

interface ChatMessageProps {
  text: string;
  isUser: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ text, isUser }) => {
  return (
    <div
      className={`p-2 mb-2 rounded-lg max-w-[80%] ${
        isUser
          ? 'bg-gray-200 text-black self-end ml-auto'
          : 'bg-blue-100 text-black self-start'
      }`}
    >
      {text}
    </div>
  );
};

export default ChatMessage;