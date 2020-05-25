<template>
    <v-container class="center">

        <v-card color="#D1E8D7"  depressed elevation="0" class="my-2 " >
            <v-card-title class="headline"> {{ className }} </v-card-title>
            <v-card-text>{{ classInfo }}</v-card-text>

        </v-card>

        <div>
            <v-app-bar width="100%" elevation="0" tile block height="30%" color="#85C4BB" class="my-5">
                <span class="white--text subtitle-2">SCHEDULED DAYS</span>
            </v-app-bar>
            
            <v-spacer></v-spacer>
    
            <div  class="font-weight-bold "> 
                <v-sheet class="ma-4 #F26869 d-flex justify-center ">
                    <v-icon>mdi-calendar-range</v-icon>
                    <span class="title">{{ dates[0] }} - {{ dates[1] }} </span>
                </v-sheet>

                 <v-sheet  color="#E2EEE4" v-for="day in days" :key="day"  class="d-flex ma-5 justify-center ">
                    <div  class=" black--text ">{{ day }}</div>
                 </v-sheet>

            </div>

           
        </div>

    <div class="adminFunctions" v-if="admin">

        <div>

            <v-app-bar width="100%" elevation="0" tile block height="30%" color="#85C4BB" class="my-5">
                <span class="white--text subtitle-2">ASSIGNED STUDENTS</span>
            </v-app-bar>

            <v-spacer></v-spacer>

             <v-sheet color="#E2EEE4" v-for="assignedStudent in assignedStudents" :key="assignedStudent"  class="d-flex ma-5 justify-center ">
                    <div class="black--text">{{ assignedStudent }}</div>
             </v-sheet>

        </div>


        <v-row>

            <v-col>
                <router-link class="router-link" to="/classes">
                <v-btn elevation="0" tile color="#F26869" block class="my-3 mx-0" >
                    <span class="white--text">Back to classes</span>
                </v-btn>
                </router-link>
            </v-col>

            <v-col>
                <v-btn elevation="0" tile color="#F26869" block class="my-3 mx-0" @click="deleteClass">
                    <span class="white--text">Delete Class</span>
                </v-btn>
            </v-col>

        </v-row>
        
        <v-btn fixed bottom right fab color="#F26869">

            <router-link class="router-link" v-bind:to="{name:'editClass', params: {className: className}}"> 
                <v-icon class="white--text">mdi-pencil</v-icon>
            </router-link>
            
        </v-btn>
    </div>


    </v-container>

</template>

<script>
import db from '@/firebase'
import router from '@/router'
import firebase from 'firebase'

export default {
    data: () => ({
        className: null,
        classInfo: null,
        dates: [],
        days: [],
        times:[],
        assignedStudents: null,
        admin:false,
    }),
    
    created(){
        firebase.auth()
        .onAuthStateChanged(function(user) { //checking auth status

        userInfo(user);

        })

        const userInfo = (user) => { //displaying either admin view or student view based on email

            if(user) {

                if (user.email == 'admin@admin.com') {
                    this.admin = true;
                }
            }
        }
    }, 

    beforeRouteEnter (to, from, next) {
        db.collection('classes').where('className', '==', to.params.className).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {

                next(vm => {
                    
                    vm.className = doc.data().className
                    vm.classInfo = doc.data().classInfo
                    vm.dates = doc.data().dates
                    vm.days = doc.data().days
                    vm.times = doc.data().times
                    vm.assignedStudents = doc.data().assignedStudents
                })
            })
        })
    }, 
    watch: {
        '$route': 'fetchData'        
    }, 

    methods: {
        fetchData() {
            db.collection('classes'). where('className', '==', this.$route.params.className).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {

                    this.className = doc.data().className
                    this.classInfo = doc.data().classInfo
                    this.dates = doc.data().dates
                    this.days = doc.data().days
                    this.times = doc.data().times
                    this.assignedStudents = doc.data().assignedStudents
                })
            })
        },
        deleteClass () {
            if(confirm('Are you sure you want to delete this class?')) {
                 db.collection('classes').where('className', '==', this.$route.params.className).get()
                .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    doc.ref.delete()
                    this.$router.push('/classes')
                    })
                })
            }
        }, 
 
         previousPage(){
             router.go(-1)

         },


    },

    computed: {
      dateRangeText () {
        return this.dates.join(' - ')
      },
    }

      
}


      
</script>

<style>
  router-link {
    text-decoration: none;
  }
</style>