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

// Provide redux store to react :
import store from './ReduxStore/store'
import { Provider } from 'react-redux'
import $ from 'jquery';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
