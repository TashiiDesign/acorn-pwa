<template>
<v-container>

<!-- Same as Login -->

    <v-sheet height="200" elevation="0" class="white">

          <v-card depressed elevation="0" class="my-2" >
            <v-card-title class="headline">Register</v-card-title>
          </v-card>
        
    </v-sheet>


    <v-form ref="form" v-model="valid" lazy-validation class="center mt-5">

        <v-text-field
            prepend-icon="mdi-account"
            v-model="name"
            label="Full Name"
            required>
        </v-text-field>

        <v-text-field
            prepend-icon="mdi-email"
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required>
        </v-text-field>

        <v-text-field
            v-model="password"
            prepend-icon="mdi-lock"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            :type="show1 ? 'text' : 'password'"
            label="Password"
            hint="At least 6 characters"
            required
            @click:append="show1 = !show1"
          ></v-text-field>

        <v-btn
            :disabled="!valid"
            color="success"
            class="mt-5"
            v-on:click="register"> Register
        </v-btn>

        <router-link class="router-link" to="/login">
            <v-btn class="mt-5 ml-6" > or login </v-btn>
        </router-link>

    </v-form>

</v-container>
  
</template>


<script>
import firebase from 'firebase'
import db from '@/firebase'

export default {
   data: () => ({

        show1: false,
        valid: true,
          name: '',
          password: '',
          email: '',
          passwordRules: [
          v => !!v || 'Password is required',
          v => (v && v.length > 6) || 'Password must be more than 6 characters',
        ],

         emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
         ],
    }),

    methods: {
      //Firebase Register functionality, standard syntax
      register: function (e) {
        firebase
        .auth ()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          cred => { //get user credentials and set the firestore id to match the user id in the authentication
            return db.collection('students').doc(cred.user.uid).set({ 
              email: this.email,
              password: this.password,
              name: this.name
            });
 
          }).then(() => {

            alert('Account Created');
            this.$router.push('/')
          },
          
          err => {
            alert(err.message);
          })

        e.preventDefault();
        
        
        this.$refs.form.validate()
      },
    }
}
</script>

<style>
  router-link {
    text-decoration: none;
  }
</style>