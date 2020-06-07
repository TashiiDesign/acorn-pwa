<template >
  <!-- App.vue -->

<v-app>
   <app-header-admin v-if="admin"></app-header-admin> <!-- Admin Header -->
   <app-header-student v-else-if="student"></app-header-student> <!-- Student Header -->

  <!-- Sizes content based upon application components -->
  <v-content>

    <!-- Provides the application the proper gutter -->
    <v-container fluid >

      <!-- Shows the components/pages based on the router configuration -->
      <router-view></router-view>
    </v-container>
  </v-content>

  <v-footer>
   <app-footer></app-footer> <!-- Footer -->
  </v-footer>
</v-app>
</template>

<script>
//Component Import
import HeaderAdmin from './components/HeaderAdmin';
import HeaderStudent from './components/HeaderStudent';
import Footer from './components/Footer';
import firebase from 'firebase'

export default {

  name: 'App', //Exporting the main application view 
  
//Component Register
    components:{
         'app-header-admin': HeaderAdmin,
         'app-header-student': HeaderStudent,
         'app-footer': Footer
    },

    
  data: () => ({
     admin: false, 
     student: true,
     displayName: '',
     email: '',
    //
  }),


  created() {
      firebase.auth()
      .onAuthStateChanged(function(user) {
        
      userInfo(user);

    })
      const userInfo = (user) => {

        
        if(user){

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
    }
  
};
</script>
