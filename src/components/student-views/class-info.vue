<template>
    <v-container>

        <v-card depressed elevation="0" class="my-2" >
            <v-card-title class="headline">Class Information</v-card-title>
        </v-card>

        <v-app-bar width="100%" elevation="0" tile block height="30%" color="#85C4BB" class="my-5">
            <span class="white--text subtitle-2">ASSIGNED CLASSES</span>
        </v-app-bar>

        <v-spacer></v-spacer>
        
        <div v-for="assignedClass in assignedClasses" :key="assignedClass" block tile color="#F26869" class="black--text font-weight-bold ">
            {{ assignedClass }}
        </div>
        
    </v-container>
</template>

<script>
import db from '@/firebase'
import firebase from 'firebase'


export default {
    data: () => ({
    assignedClasses: null,
    displayName: '',
    email: '',
    uid: ''

        
    }),

created(){
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

    beforeRouteEnter (to, from, next) {
        db.collection('students').where('email', '==', to.params.email).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                next(vm => {
                    vm.displayName = doc.data().name
                    vm.assignedClasses = doc.data().assignedClasses
                })
            })
        })
    }, 

     watch: {
        '$route': 'fetchData'        
    }, 

     methods: {
        fetchData() {
            db.collection('students'). where('email', '==', this.$route.params.email).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    this.displayName = doc.data().name
                    this.assignedClasses = doc.data().assignedClasses
                })
            })
        },
     }
}
</script>

<style>
  router-link {
    text-decoration: none;
  }
</style>