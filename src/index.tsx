import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAZttUn6TYRrL3UO9l28h0Rb1ECJBLnP8",
  authDomain: "tar-todo.firebaseapp.com",
  projectId: "tar-todo",
  storageBucket: "tar-todo.appspot.com",
  messagingSenderId: "982465285093",
  appId: "1:982465285093:web:01ab62c2245282dc8a7d0c",
  measurementId: "G-QXZ5VG9LLC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

