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


export default {
    data: () => ({
    assignedClasses: null,

        
    }),

    beforeRouteEnter (to, from, next) {
        db.collection('students').where('name', '==', to.params.name).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                next(vm => {
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
            db.collection('students'). where('name', '==', this.$route.params.name).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {

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