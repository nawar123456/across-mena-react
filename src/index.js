import React from 'react';
import ReactDOM from 'react-dom/client';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import store, { persistor } from './store'; // Adjust path to your store
import App from './App';
import { HelmetProvider } from 'react-helmet-async';
import "./localization"
import * as serviceWorkerRegistration from "./serviceWorkerRegistration"; // ✅ Import service worker

import'react-toastify/dist/ReactToastify.min.css';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <HelmetProvider>
    <Provider store={store}>
      <PersistGate 
        loading={null}  // Shows nothing while loading (can be a loading component)
        persistor={persistor}
      >
        <App />
      </PersistGate>
    </Provider>
  </HelmetProvider>
);
serviceWorkerRegistration.register();


