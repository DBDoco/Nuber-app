import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
const firebaseConfig = {
 apiKey: 'xxxxxxxxxxxxxxxxxxxxxxxx',
 authDomain: 'xxxxxxxxxxxxxxxxxxxxxxxx',
 databaseURL: 'xxxxxxxxxxxxxxxxxxxxxxxx',
 projectId: 'xxxxxxxxxxxxxxxxxxxxxxxx',
 storageBucket: 'xxxxxxxxxxxxxxxxxxxxxxxx',
 messagingSenderId: 'xxxxxxxxxxxxxxxxxxxxxxxx',
 appId: 'xxxxxxxxxxxxxxxxxxxxxxxx',
 measurementId: 'xxxxxxxxxxxxxxxxxxxxxxxx'
}
firebase.initializeApp(firebaseConfig)
export default ({ Vue }) => {
 Vue.prototype.$auth = firebase.auth()
 Vue.prototype.$db = firebase.firestore()
 Vue.prototype.$storage = firebase.storage()
}
