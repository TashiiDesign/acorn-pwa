<template>

    <v-container>

        <v-card color="#D1E8D7"  depressed elevation="0" class="my-2 " >
            <v-card-title class="headline"> {{ name }} </v-card-title>

            <v-card-text class="black-text"> Email: <strong>{{ email }}</strong> </v-card-text>
            <v-card-text class="black-text"> Password:  <strong>{{ password }}</strong> </v-card-text>

        </v-card>

        <div>
            <v-app-bar width="100%" elevation="0" tile block height="30%" color="#85C4BB" class="my-5">
                <span class="white--text subtitle-2">ASSIGNED CLASSES</span>
            </v-app-bar>

            <v-spacer></v-spacer>

             <v-sheet color="#E2EEE4" v-for="assignedClass in assignedClasses" :key="assignedClass"  class="d-flex ma-5 justify-center ">
                    <div class="black--text">{{ assignedClass }}</div>
             </v-sheet>


        </div>


        <v-row>
            <v-col>
                <router-link class="router-link" to="/students">

                <v-btn elevation="0" tile color="#F26869" block class="my-3 mx-0">
                    <span class="white--text">Back to students</span>
                </v-btn>

                </router-link> 
            </v-col>

            <v-col>

                <v-btn elevation="0" tile color="#F26869" block class="my-3 mx-0" @click="deleteStudent">
                    <span class="white--text">Delete Student</span>
                </v-btn>

            </v-col>
        </v-row>

        <v-btn fixed bottom right fab color="#F26869">

            <router-link class="router-link" v-bind:to="{name:'editStudent', params: {name: name}}"> 
                <v-icon class="white--text">mdi-pencil</v-icon>
            </router-link>
            
        </v-btn>

    </v-container>
</template>

<script>
import db from '@/firebase'
import router from '@/router'

export default {
    data: () => ({

        name: null,
        email: null,
        password: null,
        assignedClasses: null,
    }), 
    beforeRouteEnter (to, from, next) {
        db.collection('students').where('name', '==', to.params.name).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {

                next(vm => {

                    vm.name = doc.data().name
                    vm.email = doc.data().email
                    vm.password = doc.data().password
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

                    this.name = doc.data().name
                    this.email = doc.data().email
                    this.password = doc.data().password
                    this.assignedClasses = doc.data().assignedClasses
                })
            })
        },
        deleteStudent () {
            if(confirm('Are you sure you want to delete this student?')) { //only deletes student from database 
                 db.collection('students').where('name', '==', this.$route.params.name).get()
                .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    doc.ref.delete()
                
                    this.$router.push('/students')
                    })
                })

                //to delete from firebase auth, must add admin functionality 
                //https://stackoverflow.com/questions/38800414/delete-a-specific-user-from-firebase
            }
        }, 
 
         previousPage(){
             router.go(-1)

         },

    }   
}
      
</script>

<style>
  router-link {
    text-decoration: none;
  }
</style>