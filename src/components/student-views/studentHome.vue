<template>
    <v-container>
        <v-card depressed elevation="0" class="my-2" >
            <v-card-title v-for="studentData in studentDatas" :key="studentData.name"  class="headline">Hello, {{ studentData.name }} </v-card-title> 
            <v-card-subtitle class="subtitle-1" >What would you like to do?</v-card-subtitle>
        </v-card>

          <router-link class="router-link" to='/class-info'>
        <div class="d-flex justify-center pb-8"> 
            <v-btn color="#9DC8B5" width="80%" class="mt-3 white--text">Assigned Classes</v-btn>
        </div>
        </router-link>

        <router-link class="router-link" to='/student-timetable'>
        <div class="d-flex justify-center pb-8 "> 
            <v-btn color="#9DC8B5"  width="80%" class="mt-3 mb-3 white--text">Timetable</v-btn>
        </div>
        </router-link>

    </v-container>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase'

export default {
   data: () => ({
       studentDatas: []

   }),

    created() {

        firebase.auth() 
        .onAuthStateChanged(function(user) {
                
            userInfo(user);

        })

          
        const userInfo = (user) => {  //Getting name of the current logged in user

            //Doesn't allow firebase to find data in build but causes errors that don't affect anything if not included 

                //if(user && !user.email == 'admin@admin.com'){
                

                    db.collection('students').doc(user.uid).get()
                    .then(doc => {

                        const studentData = {

                            name: doc.data().name,
                            email: doc.data().email
                        }
                    
                        this.studentDatas.push(studentData)

                        })
                //}
            
            
        }

    }
    
   }
</script>