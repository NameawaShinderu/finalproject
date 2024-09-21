import React, { useState } from 'react';
import ChatMessage from './ChatMessage';
import Button from './Button';

interface ModalProps {
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [inputText, setInputText] = useState('');
  const [currentResponse, setCurrentResponse] = useState('');

  const addMessage = (text: string, isUser: boolean) => {
    setMessages([...messages, { text, isUser }]);
  };

  const generateResponse = () => {
    addMessage(inputText, true);
    const response = 'Thank you for the opportunity! If you have any more questions or if there\'s anything else I can help you with, feel free to ask.';
    setCurrentResponse(response);
    addMessage(response, false);
    setInputText('');
  };

  const insertResponse = () => {
    const messageInput = document.querySelector('.msg-form__contenteditable') as HTMLElement;
    if (messageInput) {
      messageInput.innerHTML = `<p>${currentResponse}</p>`;
      const event = new Event('input', { bubbles: true });
      messageInput.dispatchEvent(event);
    }
    onClose();
  };

  const regenerateResponse = () => {
    const newResponse = 'This is a regenerated response based on your input.';
    setCurrentResponse(newResponse);
    setMessages(messages.map((msg, index) => 
      index === messages.length - 1 ? { ...msg, text: newResponse } : msg
    ));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg w-96 max-w-full">
        <div className="h-64 overflow-y-auto mb-4">
          {messages.map((msg, index) => (
            <ChatMessage key={index} text={msg.text} isUser={msg.isUser} />
          ))}
        </div>
        <div className="flex flex-col">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 mb-2"
            placeholder="Your Prompt"
          />
          <Button onClick={generateResponse} disabled={!inputText}>
            Generate
          </Button>
        </div>
        {currentResponse && (
          <div className="flex justify-end mt-4">
            <Button onClick={insertResponse} variant="outline" className="mr-2">
              Insert
            </Button>
            <Button onClick={regenerateResponse}>
              Regenerate
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;