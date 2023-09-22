import { Component } from '@angular/core';
import { getMessaging, getToken } from '@firebase/messaging';
import { initializeApp, FirebaseApp } from '@firebase/app';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularMobilePushNotifications';
  token = '';
  app: FirebaseApp;

  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyAvIXDZwIrNDeWK8ywy7KxGc02gDYBSfU4",
      authDomain: "angularmobilepushnotifications.firebaseapp.com",
      projectId: "angularmobilepushnotifications",
      storageBucket: "angularmobilepushnotifications.appspot.com",
      messagingSenderId: "1077866644071",
      appId: "1:1077866644071:web:9cce5018b0226455260ac2",
      measurementId: "G-PBH90KEG0E"
    };

    this.app = initializeApp(firebaseConfig);
  }
  async requestPermission(): Promise<void> {
    const messaging = getMessaging();
    getToken(messaging, { vapidKey: 'BKUGZGgyBtnTiZVpuRyYBuRl2eWmolusxAEZMrosTIHNBBkG_jgCUX2vEWHIBUSmN5Qga1fHjKC0jkfgXPNMGBg' }).then((currentToken) => {
      if (currentToken) {
        // Send the token to your server and update the UI if necessary
        console.log(currentToken)
        this.token = currentToken;
        // ...
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        // ...
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // ...
    });

    // const messaging = getMessaging(this.app);
    // this.token = await getToken(messaging, { vapidKey: 'BKUGZGgyBtnTiZVpuRyYBuRl2eWmolusxAEZMrosTIHNBBkG_jgCUX2vEWHIBUSmN5Qga1fHjKC0jkfgXPNMGBg' })
    //
    // console.log(messaging);
    // let permission = await Notification.requestPermission();
    //   if (permission === 'granted') {
    //     console.log('Notification permission granted.');
    //     // TODO(developer): Retrieve a registration token for use with FCM.
    //      this.token = await getToken(messaging, { vapidKey: 'BKUGZGgyBtnTiZVpuRyYBuRl2eWmolusxAEZMrosTIHNBBkG_jgCUX2vEWHIBUSmN5Qga1fHjKC0jkfgXPNMGBg' })
    //   } else {
    //     console.log('Unable to get permission to notify.');
    //   }
  }
}

