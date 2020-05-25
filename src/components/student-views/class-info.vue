<template>
    <v-container>

        <v-card depressed elevation="0" class="my-2" >
            <v-card-title class="headline">Class Information</v-card-title>
        </v-card>

        <v-app-bar width="100%" elevation="0" tile block height="30%" color="#85C4BB" class="my-5">
            <span class="white--text subtitle-2">ASSIGNED CLASSES</span>
        </v-app-bar>

        <v-spacer></v-spacer>
        
            <div id="scroll-target" class=" mt-3 " v-for="assignedClass in assignedClasses" :key="assignedClass" >
      <router-link class="router-link" v-bind:to="'/selectedClass/' + assignedClass">
          <v-btn width="100%" color="#D1E8D7"  class="mb-4 d-flex justify-start">
              <span class="darkgrey--text" >{{ assignedClass }}</span>
              <v-spacer></v-spacer>
              <v-icon class="ml-2">mdi-arrow-right-drop-circle</v-icon>
          </v-btn>
      </router-link>
    </div>
    </v-container>
</template>

<script>
import db from '@/firebase'
import firebase from 'firebase'


export default {
    data: () => ({
      assignedClasses: null,
      classes: [],
      days: [], 
      email: ''
        
    }),

created(){
    firebase.auth()
    .onAuthStateChanged(function(user) {

        userInfo(user);

    })

    const userInfo = (user) => {

      if(user){ //Checks if there is a user to avoid errors

        db.collection('students').doc(user.uid).get()
        .then(doc => {
      
          this.assignedClasses = doc.data().assignedClasses

        })
      } 
    }

    db.collection('classes').get() //Standard Firebase syntax for querying database
    .then(querySnapshot => { //Returns a promise 

        querySnapshot.forEach(doc => {

          const data = { 
            'id': doc.id, 
            'className': doc.data().className,
            'classInfo': doc.data().classInfo, 
            'dates': doc.data().dates, 
            'days': doc.data().days,

          }
          this.classes.push(data) //Pushes data into the empty Classes array created above
        })
      })

    },

}
</script>

<style>
  router-link {
    text-decoration: none;
  }
</style>