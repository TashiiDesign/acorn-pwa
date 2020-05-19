<template>
    <v-container>
        <v-card depressed elevation="0" class="my-2" >
            <v-card-title class="headline">Hello, {{ name }}</v-card-title>
            <v-card-subtitle class="subtitle-1" >What would you like to do?</v-card-subtitle>
        </v-card>
    </v-container>
</template>

<script>
import firebase from 'firebase'

export default {
   data: () => ({
       name: '',
   }),

   created() {
    firebase.auth()
    .onAuthStateChanged(function(user) {
        user.displayName = 'Rin Strawberry'
        
    userInfo(user);

  })
    const userInfo = (user) => {

        this.name = user.displayName
    }
    
   }
}
</script>