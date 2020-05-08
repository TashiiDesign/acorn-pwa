<template>
<div v-if="!$route.meta.hideNavigation">
    <v-responsive>
<v-app-bar depressed tile text color="#E2EEE4" class="align-items flex-direction: column">
    
    <v-card width="40%" outlined elevation="0" class="d-flex ma-0 transparent">

         <v-avatar class="ma-0 white">
            <v-icon>mdi-account-circle</v-icon>
        </v-avatar>
        <v-card-title class="body-2 pa-2">ADMIN</v-card-title>

    </v-card>
    
          <v-spacer></v-spacer>
      <v-btn depressed color="#9DC8B5" > 
            <v-icon fab color="white" class="">mdi-bell</v-icon>
        </v-btn>

</v-app-bar>

    <v-app-bar width="100%" color="#E2EEE4" depressed tile class="d-flex justify-center justify-space-around elevation-0">
        <!-- <nav class="px-2 " > -->

            
            <v-btn height="90%" small tile depressed color="#9DC8B5" class="#F26869 mx-1 "  >
                <!-- <v-icon small block class="pa-1" >mdi-home</v-icon>  -->
                <router-link to='/' class="white--text router-link ">Home</router-link>
            </v-btn>
         
            <v-divider vertical></v-divider>

            <v-btn height="90%"  small tile depressed color="#9DC8B5" class="#F26869 mx-1 ">
                <!-- <v-icon small class="pa-1">mdi-star</v-icon> -->
                <router-link to='/students' class="white--text router-link  ">Students</router-link>
            </v-btn>

            <v-divider vertical></v-divider>

            <v-btn height="90%"  small tile depressed color="#9DC8B5" class="#F26869 mx-1">
                <!-- <v-icon small class="pa-1">mdi-pencil</v-icon>  -->
                <router-link to='/classes' class="white--text router-link ">Classes</router-link>
            </v-btn>

            <v-divider vertical></v-divider>

            <v-btn  height="90%"  small tile depressed color="#9DC8B5" class="#F26869 mx-1">
                <!-- <v-icon small class="pa-1">mdi-calendar</v-icon>  -->
                <router-link to='/timetable' class="white--text router-link  ">Timetable</router-link>
            </v-btn>
  

        <!-- </nav> -->
    </v-app-bar>
    </v-responsive>
</div>


</template>

<style>
    router-link{
        text-decoration: none;
    }
</style>

<script>

//import Nav from './Nav';

export default {

     components:{
        // 'app-nav': Nav,
     },
      data: () => ({
          

    //
  }),
};
</script>

<style>

</style>