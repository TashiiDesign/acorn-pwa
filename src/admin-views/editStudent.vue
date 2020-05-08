<template>

<v-container>

<v-btn tile elevation="0" color="#F26869" class="my-1 mx-0 pa-2" width="10%" height="10%" v-on:click="previousPage">
        <span class="white--text">Back</span>
    </v-btn>

    <v-card depressed elevation="0" class="my-2" >
        <v-card-title class="headline">Update Student Info</v-card-title>
     </v-card>

     <v-form ref="form">

         <v-text-field :rules="inputRules" solo rows="2" v-model="name" class="white white--text subtitle-2" label="Name"></v-text-field>
        

         <v-text-field :rules="inputRules" solo rows="2" v-model="email" class="white white--text subtitle-2" label="Email"></v-text-field>
         <v-text-field :rules="inputRules" solo rows="2" v-model="password" class="white white--text subtitle-2" label="Password"></v-text-field>

      <v-app-bar width="100%" elevation="0" tile block height="30%" color="#85C4BB" class="my-5">
            <span class="white--text subtitle-2">EDIT ASSIGNED CLASSES</span>
        </v-app-bar>

           <v-select 
            v-model="assignedClasses"
            :items="classes"
            label="Select"
            multiple
            chips
            hint="Add classes"
            persistent-hint></v-select>

    <v-btn :loading="loading" elevation="0" tile color="#F26869"  full-width="100%" block class="my-3 mx-0" v-on:click="updateStudent">
        <span class="white--text">Update Student Information</span>
    </v-btn>

     </v-form>

</v-container>
</template>
<script>
import db from '@/firebase'
import router from '@/router'


export default {
     data: () => ({
        //  firstName: ' ',
        //  lastName: ' ',
         name:'',
         email: '',
         password: '',
         classes: [],
         assignedClasses: [],
         
            inputRules: [
            v => v.length >= 2 || 'Minimum length 2 characters',
            v => v.length <= 20 || 'Max Length 20 characters'
        ],

        loading: false

         
     }),

      created(){ 
            

            db.collection('classes').get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {

                    this.classes.push(doc.data().className)
                })
            })
        }, 


         beforeRouteEnter (to, from, next) {
        db.collection('students').where('name', '==', to.params.name).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                next(vm => {
                    // vm.firstName = doc.data().firstName
                    // vm.lastName = doc.data().lastName
                    vm.name = doc.data().name,
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
                    // this.firstName = doc.data().firstName
                    // this.lastName = doc.data().lastName
                    this.name = doc.data().name
                    this.email = doc.data().email
                    this.password = doc.data().password
                    this.assignedClasses = doc.data().assignedClasses
                })
            })
        },

        previousPage(){
            router.go(-1)

        },

        updateStudent () {
            db.collection('students'). where('name', '==', this.$route.params.name).get()
           .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    doc.ref.update({
                        // firstName: this.firstName,
                        // lastName: this.lastName, 
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        assignedClasses: this.assignedClasses

                    })
                    .then(() => {
                        this.$router.push({name: 'selectedStudent', 
                        params: {name: this.name}})
                    })
                })
            })
        }
    },


}
</script>

<style>

</style>