import Vue from 'vue'
import firebase from 'firebase/app'
import VueFire from 'vuefire'

import 'firebase/firestore'
import 'firebase/storage'

var config = {
    apiKey: "AIzaSyCg2UgyBB1qKuRzbEDZQu9fbWmn3KgKjA0",
    authDomain: "ur-campaign.firebaseapp.com",
    databaseURL: "https://ur-campaign.firebaseio.com",
    projectId: "ur-campaign",
    storageBucket: "ur-campaign.appspot.com",
    messagingSenderId: "770312569261"
}
var settings = { timestampsInSnapshots: true }

firebase.initializeApp(config)
firebase.firestore().settings(settings)

Vue.use(VueFire)

export const db = firebase.firestore()
export const storage = firebase.storage()