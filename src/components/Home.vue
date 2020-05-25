<template>
<v-container class="pl-0">

<adminHome v-if="admin"></adminHome>
<studentHome v-else-if="student"></studentHome>

<!-- Logout button with onclick -->
<div class="d-flex justify-center"> 
  <v-btn color="#F26869" width="50%" class="mt-3 white--text" v-on:click="logout">Log out</v-btn>
</div>



</v-container>
</template>

<script>
import adminHome from '../components/admin-views/adminHome'
import studentHome from '../components/student-views/studentHome'
import firebase from 'firebase'
// import db from '@/firebase'


export default {
   data: () => ({
     admin: false, 
     student: true,
     name: '',
     email: '',
    //  uid: ''

   }), 

    components:{
         'adminHome': adminHome,
         'studentHome': studentHome
    },

  created() {


      firebase.auth()
      .onAuthStateChanged(function(user) { //checking auth status

      userInfo(user);

      })

      const userInfo = (user) => { //displaying either admin view or student view based on email


        if(user){ //Only looks for user.email if a user is logged in

          if (user.email == 'admin@admin.com') { 
              this.admin = true;
              this.student = false;

            } else {
              this.admin = false;
              this.student = true;
            }

        }

      }

          err => {
              alert(err.message); 
            }

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

