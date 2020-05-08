<template>
<v-container>

    <v-sheet height="200" elevation="0" class="white">
        
    <v-card depressed elevation="0" class="my-2" >
      <v-card-title class="headline">Login</v-card-title>
    </v-card>
    </v-sheet>


    <v-form ref="form" v-model="valid" lazy-validation class="center mt-5">

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
            hint="At least 8 characters"
            required
            @click:append="show1 = !show1"
          ></v-text-field>

        <v-btn
            :disabled="!valid"
            color="success"
            class="mt-5"
            v-on:click="login"> Login
        </v-btn>

        <router-link class="router-link" to="/register">
        <v-btn class="mt-5 ml-6" > or register </v-btn>
        </router-link>
        

    </v-form>

</v-container>
  
</template>


<script>

//@vuese
import firebase from 'firebase'


export default {
   data: () => ({

        show1: false,
        valid: true,

          password: '',
          email: '',
          passwordRules: [
          v => !!v || 'Password is required',
          v => (v && v.length > 3) || 'Password must be more than 3 characters',
        ],

         emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
         ],
    }),
    

    methods: {
      login: function (e) {
        firebase
        .auth ()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            alert(`Logged in as ${user.email}`);
            this.$router.push('/')
          },
          err => {
            alert(err.message);
          }
        );

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