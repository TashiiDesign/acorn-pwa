<template>
<v-container>

    <v-sheet height="200" elevation="0" class="white">
        
      <v-card depressed elevation="0" class="my-2" >
        <v-card-title class="headline">Login</v-card-title>
      </v-card>
    </v-sheet>

    <!-- Registers a reference to be used within the script to check if the form is valid -->
    <v-form ref="form" v-model="valid" lazy-validation class="center mt-5">

    <!-- Rules can be added when using form validation which are configured within the script -->
        <v-text-field
            prepend-icon="mdi-email"
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required>
        </v-text-field>

    <!-- In order to hide and show the password, a toggle is added to the icon with an attached click event -->
        <v-text-field
            v-model="password"
            prepend-icon="mdi-lock"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            :type="show1 ? 'text' : 'password'"
            label="Password"
            hint="At least 8 characters"
            required
            @click:append="show1 = !show1"
          ></v-text-field>

    <!-- If the form does not meet the critera to be valid, the button is disabled -->
        <v-btn
            :disabled="!valid"
            color="success"
            class="mt-5"
            v-on:click="login"> Login <!-- Login click functionality -->
        </v-btn>

    <!-- Button to go to Register instead -->
        <router-link class="router-link" to="/register">
        <v-btn class="mt-5 ml-6" > or register </v-btn>
        </router-link>
        
    </v-form>

</v-container>
  
</template>


<script>
import firebase from 'firebase'

export default {
   data: () => ({

      //Assigns default booleans
      show1: false, 
      valid: true,

      password: '',
      email: '',

      //Adding rules for the password 
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length > 3) || 'Password must be more than 3 characters',
      ],

      //Adding rules for the email 
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid', 
      ],
    }),
    

    methods: {

      //Firebase login functionality, standard syntax
      login: function (e) {
        firebase
        .auth ()
        .signInWithEmailAndPassword(this.email, this.password)
        .then( //Returns a promise 
          user => {
            alert('Login Successful' );
            console.log(user)
            this.$router.push('/') //Goes to the main homepage view if user is signed in
          },
          err => {
            alert(err.message); 
          }
        );

        e.preventDefault(); 
        
        
        this.$refs.form.validate() //Checks for form validation using the reference created above
      },
      
    }
}
</script>

<style>
  /* No underlines on links*/
  router-link {
    text-decoration: none;
  }
</style>