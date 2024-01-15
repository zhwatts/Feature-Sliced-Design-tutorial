import {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import App from 'app'; // Assuming the correct path to your App component

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  console.error('Root element with id "root" not found.');
}
