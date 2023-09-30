import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import { Toast } from './Toast.tsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Toast />
  </React.StrictMode>
);
