<template>

    <v-container>

        <v-btn tile elevation="0" color="#F26869" class="my-1 mx-0 pa-2" width="10%" height="10%" v-on:click="previousPage">
                <span class="white--text">Back</span>
        </v-btn>

        <v-card depressed elevation="0" class="my-2" >
            <v-card-title class="headline">Register Student</v-card-title>
        </v-card>

        <v-form ref="form">

            <v-text-field :rules="inputRules" solo rows="2" v-model="name" class="white white--text subtitle-2" label="Name"></v-text-field>

            <v-text-field :rules="inputRules" solo rows="2" v-model="email" class="white white--text subtitle-2" label="Email"></v-text-field>
            <v-text-field :rules="inputRules" solo rows="2" v-model="password" class="white white--text subtitle-2" label="Password"></v-text-field>

        
            
            <v-app-bar width="100%" elevation="0" tile block height="30%" color="#85C4BB" class="my-5">
                <span class="white--text subtitle-2">ASSIGN CLASSES</span>
            </v-app-bar>
        
        <!-- v-model attaches the assigned classes, :items adds the classes to the select menu to be chosen -->
                <v-select
                v-model="assignedClasses"
                :items="classes"
                label="Select"
                multiple
                chips
                hint="Add Classes"
                persistent-hint></v-select>


            <v-btn :loading="loading" elevation="0" tile color="#F26869"  full-width="100%" block class="mt-8 mx-0" v-on:click="submit">
                <span class="white--text">Register New Student</span>
            </v-btn>

        
        </v-form>

            
</v-container>
  
</template>

<script>
import db from '@/firebase'
import router from '@/router'

export default {
    data: () => ({
        name: '',
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
    
    created(){ //Queries the Classes collection to get the classes which can be assigned to the student 

            db.collection('classes').get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {

                    this.classes.push(doc.data().className) //Pushes the class names into the classes array defined at the top
                })
            })
        }, 


    methods: {

         previousPage(){ //Returns to previous page 
             router.go(-1)

         },

         submit(){ //Submit function to add the new information for the student

            if(this.$refs.form.validate()){ //Check if form is valid before continuing 
                this.loading = true; 
                
            const students = { //Student object 

                name: this.name,
                email: this.email,
                password: this.password,
                assignedClasses: this.assignedClasses
            }

            db.collection('students').add(students) //Adds the new information to the database 
            .then(() => { //Returns a promise 
                this.loading = false;
                router.push('/students') //After student information has been submitted, router pushes to the students page
                
            }) //async task
            }
        }, 

    }
}
</script>

<style>
  router-link {
    text-decoration: none;
  }
</style>