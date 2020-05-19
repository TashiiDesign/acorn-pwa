<template>

    <v-container>
<!-- Exactly the same as editClasses but with different information -->

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
            persistent-hint>
            
            </v-select>

            <v-btn elevation="0" tile color="#F26869"  full-width="100%" block class="my-3 mx-0" v-on:click="updateStudent">
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

         name:'',
         email: '',
         password: '',
         classes: [],
         assignedClasses: [],
         
            inputRules: [
            v => v.length >= 2 || 'Minimum length 2 characters',
        ],
         
     }),

    created(){     

//Getting classes at created lifecycle hook in order to add them to the assigned classes list 

        db.collection('classes').get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {

                this.classes.push(doc.data().className)
            })
        })
    }, 

//In-component guard: Called before the route that renders the component is confirmed 
    beforeRouteEnter (to, from, next) { //Gets the specific data where the student name equals the param specified in the router file
        db.collection('students').where('name', '==', to.params.name).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                next(vm => { //vm used to access component instance

                //When navigation is confirmed, data is added to component instance
                    vm.name = doc.data().name,
                    vm.email = doc.data().email
                    vm.password = doc.data().password
                    vm.assignedClasses = doc.data().assignedClasses
                })
            })
        })
    },

//Watches the route for any changes to fetchData 
    watch: {
        '$route': 'fetchData'        
    },
    
  
    methods: {
        fetchData() { //Fetching all the data where the param matches the route 
            db.collection('students'). where('name', '==', this.$route.params.name).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => { //Loops through and adds data to object 
 
                    this.name = doc.data().name
                    this.email = doc.data().email
                    this.password = doc.data().password
                    this.assignedClasses = doc.data().assignedClasses
                })
            })
        },

        previousPage(){
            router.go(-1) //Router function to go back to the previous route

        },

        updateStudent () {
            db.collection('students'). where('name', '==', this.$route.params.name).get()
           .then(querySnapshot => {
                querySnapshot.forEach(doc => { 

                    doc.ref.update({ //Updated information is sent to new object with the specified variables

                        name: this.name,
                        email: this.email,
                        password: this.password,
                        assignedClasses: this.assignedClasses

                    })
                    .then(() => { //Router then pushes back to the selected student which matches this router's parameter
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