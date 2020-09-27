import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import http from './utils/http'
import { Provider } from 'react-redux'
import { store, persistor } from './redux'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>   
  </React.StrictMode>,
  document.getElementById('root')
);
