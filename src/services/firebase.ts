import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyBU2vQq2uylUITbmd8id5jbZWNuCmAswE0',
  authDomain: 'suppemo-3aec0.firebaseapp.com',
  projectId: 'suppemo-3aec0',
  storageBucket: 'suppemo-3aec0.appspot.com',
  messagingSenderId: '478308720008',
  appId: '1:478308720008:web:878603d0701934b5676e3d',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
