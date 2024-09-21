import * as React from 'react';
import { createRoot } from 'react-dom/client';
import Button from './components/Button';

const Popup: React.FC = () => {
  const activateScript = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0].id) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: ['contentScript.js'],
        });
      }
    });
  };

  return (
    <div className="p-4">
      <Button onClick={activateScript}>Activate Script</Button>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<Popup />);
}

export {};
