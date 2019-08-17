import configs from './configs'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/messaging'
import firebase from 'firebase/app'



const firebaseApp = firebase.initializeApp(configs)

const db = {
    db: firebase.firestore(firebaseApp),
    fs: firebase.storage(firebaseApp),
}
export default db;