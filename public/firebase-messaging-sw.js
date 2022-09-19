//firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js');

try{
    var firebaseConfig = {
      apiKey: "AIzaSyCLlE8roqpqVlEg-qlKxHwquNP88BNMa6I",
  authDomain: "admotors-frontend.firebaseapp.com",
  projectId: "admotors-frontend",
  storageBucket: "admotors-frontend.appspot.com",
  messagingSenderId: "685941535191",
  appId: "1:685941535191:web:42b13c641956da018edb92",
  measurementId: "G-GFD6G0E01S"
};
  let messaging = null
  if (firebase.messaging.isSupported()) {
    firebase.initializeApp(firebaseConfig)
    messaging = firebase.messaging()
  } else {
    console.log('no-support :(')
  }

  if (messaging) {
    messaging.setBackgroundMessageHandler(function(payload) {
      console.log('[firebase-messaging-sw.js] Received background message ', payload);
        const notificationTitle = payload.notification.title || '';
        const notificationOptions = {
            body: payload.notification.body || '',
            icon: '/fbs_ico.ico',
            click_action: payload.data.click_action
        };
    
        return self.registration.showNotification(notificationTitle,
            notificationOptions);
    });
    messaging.onBackgroundMessage(payload => {
      const notificationTitle = payload.notification.title || '';
      const notificationOptions = {
        body: payload.notification.body || '',
        icon: '/fbs_ico.ico',
        data: payload.data
      };
  
      return self.registration.showNotification(notificationTitle, notificationOptions);
    });
  
    self.addEventListener('notificationclick', event => {
      event.notification.close();
      event.waitUntil(clients.matchAll({ type: "window" }).then(function(clientList) {
        for (let i = 0; i < clientList.length; i++) {
          const client = clientList[i];
          if (client.url === '/' && 'focus' in client) {
            if (event.notification.data.route) client.href(event.notification.data.route);
            return client.focus();
          }
        }
        if (clients.openWindow)
          return clients.openWindow(event.notification.data.route || '/');
      }));
    });
  }
}
catch(err){
  console.log(err);
}
