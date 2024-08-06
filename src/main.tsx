import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import MainPage from './pages';
import { store } from 'store/store';
import './index.css';

ReactDOM.createRoot(document.getElementById('root-engagement')!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <MainPage />
  </Provider>
  // </React.StrictMode>
);
