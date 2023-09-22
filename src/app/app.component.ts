import { Component, OnInit } from '@angular/core';
import { getMessaging, getToken, onMessage } from '@firebase/messaging';
import { initializeApp, FirebaseApp } from '@firebase/app';
import { CLIENT_CONFIG, PUBLIC_KEY } from './firebase.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
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
    try {
      let permission = await Notification.requestPermission();
      alert('test');
      if (permission === 'granted') {
        const currentToken = await getToken(this.messaging, { vapidKey: PUBLIC_KEY });
        if (currentToken) {
          this.tokenReceived(currentToken);
        } else {
          console.log('No registration token available. Request permission to generate one.');

        }

      } else {
        alert('Denied');
        console.log('Permission denied');
      }
    } catch (ex) {
      alert(ex);
      console.log('An error occurred while retrieving token. ', ex);
    }
  }

  private tokenReceived(token: string): void {
    localStorage.setItem('fcm-token', token);
    this.token = token;
    console.log('Register');
    onMessage(this.messaging, (payload) => {
      console.log('Message received. ', payload);
    });
  }
}

