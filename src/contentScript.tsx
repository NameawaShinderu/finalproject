import * as React from 'react';  // Use import * as React when using CommonJS modules
import { createRoot } from 'react-dom/client';
import InteractiveIcon from './components/InteractiveIcon';
import Modal from './components/Modal';

const App: React.FC = () => {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <InteractiveIcon onIconClick={() => setShowModal(true)} />
      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </>
  );
};

const rootElement = document.createElement('div');
document.body.appendChild(rootElement);

const root = createRoot(rootElement);
root.render(<App />);

export {};
