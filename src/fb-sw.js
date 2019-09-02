import firebase from 'firebase/app';
import 'firebase/messaging'
const configs = JSON.parse(process.env.VUE_APP_FIRBASE_CONFIGS)


const init = function() {
    firebase.initializeApp(configs, "FCM");
    const messaging = firebase.messaging();
    messaging.usePublicVapidKey("BDFzBPUNDJdkdKjVyWigquz5ufMXqQBdB93DV5KEQLB2xJp-gZ9S794I8Fb1MyAO_vHvGNnF6PH8QkzK0S7-DIA"); // 1. Generate a new key pair

    // Request Permission of Notifications
    messaging.requestPermission().then(() => {
        //console.log('Notification permission granted.');

        // Get Token
        messaging.getToken().then((token) => {
            //console.log(token)
        })
    }).catch((err) => {
        //console.log('Unable to get permission to notify.', err);
    });

}
export default init