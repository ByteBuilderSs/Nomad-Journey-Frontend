import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// Bootstrap CSS
import { BrowserRouter } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
// Semantic UI
import 'semantic-ui-css/semantic.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
