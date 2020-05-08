<template>

<v-container class="pl-0">

  <v-toolbar
    dark
    color="#F26869">

    <v-autocomplete
      v-model="select"
      :loading="loading"
      :items="searchData"
      :search-input.sync="search"
      cache-items
      class="mx-4"
      flat
      hide-no-data
      hide-details
      label="Search Students"
      solo-inverted
    ></v-autocomplete>
    <v-btn icon>
      <v-icon >mdi-magnify</v-icon>
    </v-btn>
  </v-toolbar>

  <v-card depressed elevation="0" class="my-2" >
    <v-card-title class="headline">Registered Students</v-card-title>
  </v-card>

  

  <div id="scroll-target" class=" mt-3 " v-for="student in students" :key="student.name" >
     <router-link class="router-link" v-bind:to="'/selectedStudent/' + student.name">
        <v-btn color="#D1E8D7" width="104%" class="mb-4 d-flex justify-start"> 
          <span class="darkgrey--text">{{ student.name }}</span>  
          <v-spacer></v-spacer>
          <v-icon class="ml-2">mdi-arrow-right-drop-circle</v-icon>
        </v-btn>
      </router-link>
  </div>

<v-btn fixed bottom right fab color="#F26869">
  <router-link class="router-link" to='/addStudent'> 
    <v-icon class="white--text">mdi-plus</v-icon>
  </router-link>
   
  </v-btn>

 <v-row
        v-scroll:#scroll-target="onScroll"
        align="center"
        justify="center"
        style="height: auto"
      >
</v-row>


</v-container>
  
</template>


<script>

import db from '@/firebase'

export default {
      data: () => ({
      students: [],
      offsetTop: 0,
      data: '',
      searchData: [],
      loading: false,
      search: null,
      select: null,
    }),

      watch: {
        search (val) {
          val && val !== this.select && this.querySelections(val)
        },
      },

    methods: {
      onScroll (e) {
        this.offsetTop = e.target.scrollTop
      },
       querySelections (v) { //add (v) if using ajax query
        this.loading = true
        // Simulated ajax query
        setTimeout(() => {
          this.items = this.students.filter(e => {
             return (e || '').toString().toLowerCase().indexOf((v || '').toString().toLowerCase()) > -1
          })
          this.loading = false
        }, 500)
      },

    },

    computed: {
   
  },
 

    created(){

      db.collection('students').get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            'id': doc.id, 
            // 'firstName': doc.data().firstName,
            // 'lastName': doc.data().lastName, 
            'name': doc.data().name,
            'email': doc.data().email, 
            'password': doc.data().password,
            'assignedClasses': doc.data().assignedClasses,

          }
          this.students.push(data)
          this.searchData.push(doc.data().name)
        })
      })
    }, 

    

}
</script>

<style>
  router-link {
    text-decoration: none;
  }
</style>