import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";
import { onBackgroundMessage } from "firebase/messaging/sw";

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = initializeApp({
  apiKey: "AIzaSyAvIXDZwIrNDeWK8ywy7KxGc02gDYBSfU4",
  authDomain: "angularmobilepushnotifications.firebaseapp.com",
  projectId: "angularmobilepushnotifications",
  storageBucket: "angularmobilepushnotifications.appspot.com",
  messagingSenderId: "1077866644071",
  appId: "1:1077866644071:web:9cce5018b0226455260ac2",
  measurementId: "G-PBH90KEG0E"
});

const messaging = getMessaging(firebaseApp);


onBackgroundMessage(messaging, (payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
