import { Component, OnInit } from '@angular/core';
import { getMessaging, getToken, onMessage } from '@firebase/messaging';
import { initializeApp, FirebaseApp } from '@firebase/app';
import { CLIENT_CONFIG, PUBLIC_KEY } from './firebase.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'AngularMobilePushNotifications';
  token = '';
  app = initializeApp(CLIENT_CONFIG);
  messaging = getMessaging();


  ngOnInit() {
    const existingToken = localStorage.getItem('fcm-token');
    if (!existingToken) {
      return;
    }


    // this.tokenReceived(existingToken);
  }

  async requestPermission(): Promise<void> {
    getToken(this.messaging, { vapidKey: PUBLIC_KEY }).then((currentToken) => {
      if (currentToken) {
        // Send the token to your server and update the UI if necessary
        console.log(currentToken)

        this.tokenReceived(currentToken);
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

  private tokenReceived(token: string): void {
    localStorage.setItem('fcm-token',token)
    this.token = token;
    console.log('Register');
    onMessage(this.messaging, (payload) => {
      console.log('Message received. ', payload);
    });
  }
}

