import Vue from 'vue'
import firebase from 'firebase/app'
import VueFire from 'vuefire'

import 'firebase/firestore'
import 'firebase/storage'

var settings = { timestampsInSnapshots: true }

firebase.initializeApp(config)
firebase.firestore().settings(settings)

Vue.use(VueFire)

export const db = firebase.firestore()
export const storage = firebase.storage()