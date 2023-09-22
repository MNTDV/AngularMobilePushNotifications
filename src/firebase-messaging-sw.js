importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js");
firebase.initializeApp({
  apiKey: "AIzaSyDsJuN2hhiunQPl4i-GD3zrs9-J_PYri7Q",
  authDomain: "wvl-test.firebaseapp.com",
  projectId: "wvl-test",
  storageBucket: "wvl-test.appspot.com",
  messagingSenderId: "223252712533",
  appId: "1:223252712533:web:6e5a9c45d14de43efe18dc"
});
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
