import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/messaging'
import firebase from 'firebase/app'
const configs = JSON.parse(process.env.VUE_APP_FIRBASE_CONFIGS)


const firebaseApp = firebase.initializeApp(configs)

const db = {
    db: firebase.firestore(firebaseApp),
    fs: firebaseApp.storage('gs://etis-tech.appspot.com')
}
export default db;