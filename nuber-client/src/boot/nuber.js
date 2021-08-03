// import Vue from 'vue'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
const firebaseConfig = {
  apiKey: 'AIzaSyC-MInGKOmLA2lJh78nrBRpBISEr3JdG2Y',
  authDomain: 'nuber-fb68d.firebaseapp.com',
  projectId: 'nuber-fb68d',
  storageBucket: 'nuber-fb68d.appspot.com',
  messagingSenderId: '210636622428',
  appId: '1:210636622428:web:4d94e4f60d469b8b13b499',
  measurementId: 'G-72KEKN10K6'
}

firebase.initializeApp(firebaseConfig)

export default ({ Vue }) => {
  Vue.prototype.$auth = firebase.auth()
  Vue.prototype.$db = firebase.firestore()
  Vue.prototype.$storage = firebase.storage()
}
