
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import './registerServiceWorker'
import firebase from 'firebase'
import './firebase'

Vue.config.productionTip = false

let app;

//Checks whether a user is already logged in, in which case does not redirect back to the login page again even after refresh
firebase.auth().onAuthStateChanged( () => { 

  //The main Vue Instance of the application 
  if(!app) {
    app = new Vue({
      router,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
})
