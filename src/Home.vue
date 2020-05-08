<template>
<v-container class="pl-0">

  <v-card depressed elevation="0" class="my-2" >
    <v-card-title class="headline">Hello, {{ displayName }}</v-card-title>
    <v-card-subtitle class="subtitle-1" >What would you like to do?</v-card-subtitle>
  </v-card>

<div class="d-flex justify-center">
  <v-btn color="#F26869" width="50%" class="mt-3 white--text" v-on:click="logout">Log out</v-btn>
</div>

<show-student-view></show-student-view>

<show-admin-view></show-admin-view>

</v-container>
</template>

<script>

import showAdminView from './components/show-admin-view';
import showStudentView from './components/show-student-view.vue';

import firebase from 'firebase'
  // import db from '@/firebase'


export default {
   data: () => ({
     loggedIn: false, 
     displayName: '',
     email: '',
     uid: ''


   }), 

    components:{
         'show-admin-view': showAdminView,
         'show-student-view': showStudentView
    },

   

created() {
  firebase.auth()
  .onAuthStateChanged(function(user) {
    if (user) {
    // User is signed in.
    this.displayName = user.displayName;
    this.email = user.email;
    this.uid = user.uid;
  }
  })
},

  methods: {
    logout: function() {
      firebase
      .auth().signOut()
      .then(() => {
        alert('You have now logged out');
        this.$router.push('/login')
      });
    }, 

    
  }
}
</script>

<style>
  .router-link{
    text-decoration: none;
  }
</style>

