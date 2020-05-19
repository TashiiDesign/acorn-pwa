<template>
    <v-container class="pl-0">
        <!-- Displays the Name of the person logged in based on their display name -->
        <v-card depressed elevation="0" class="my-2" >
            <v-card-title class="headline">Hello, Admin</v-card-title>
            <v-card-subtitle class="subtitle-1" >What would you like to do?</v-card-subtitle>
        </v-card>

        <router-link class="router-link" to='/students'>
        <div class="d-flex justify-center pb-8 "> 
        <v-btn color="#9DC8B5" width="80%" class="mt-3 white--text">Manage Students</v-btn>
        </div>
        </router-link>

        <router-link class="router-link" to='/classes'>
        <div class="d-flex justify-center pb-8"> 
            <v-btn color="#9DC8B5" width="80%" class="mt-3 white--text">Manage Classes</v-btn>
        </div>
        </router-link>

        <router-link class="router-link" to='/timetable'>
        <div class="d-flex justify-center pb-8 "> 
            <v-btn color="#9DC8B5"  width="80%" class="mt-3 mb-3 white--text">Timetable</v-btn>
        </div>
        </router-link>

    </v-container>

</template>