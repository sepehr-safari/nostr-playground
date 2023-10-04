import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import { Home } from '@/pages';

import { Toast } from '@/components';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Home />
    <Toast />
  </React.StrictMode>
);
