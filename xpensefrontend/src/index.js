import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'font-awesome/css/font-awesome.min.css';
import App from './App';

import { Provider } from 'react-redux';
import configStore from './store/configureStore';
import * as serviceworker from './serviceWorker';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={configStore}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
serviceworker.unregister();
