<template >
  <!-- App.vue -->

<v-app>
   <app-header class="hidden-sm-and-up"></app-header>

  <!-- Sizes your content based upon application components -->
  <v-content class="hidden-sm-and-up">

    <!-- Provides the application the proper gutter -->
    <v-container fluid >

      <!-- If using vue-router -->
      <router-view></router-view>
    </v-container>
  </v-content>

  <v-footer>
   <app-footer></app-footer>
  </v-footer>
</v-app>
</template>

<script>

import Header from './components/Header';
import Footer from './components/Footer';

export default {

  name: 'App',

    components:{
         'app-header': Header,
         'app-footer': Footer
    },

    
  data: () => ({
    //
  }),
};
</script>
