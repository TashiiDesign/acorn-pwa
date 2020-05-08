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
      label="Search Classes"
      solo-inverted
    ></v-autocomplete>
    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
  </v-toolbar>

   <v-card depressed elevation="0" class="my-2" >
    <v-card-title class="headline">Class Information</v-card-title>
  </v-card>
 
 <!-- <v-chip-group width="100%" class="d-flex justify-space-between justify-space-around">
  <div v-for="week in daysOfTheWeek" :key="week">
    <v-btn color="#9DC8B5" tile depressed class="mr-2 pa-0 d-flex">
          <span class="white--text">{{ week }}</span>
    </v-btn>
  </div>
 </v-chip-group> -->


  <div width="100%" class="d-flex justify-space-between justify-space-around">
    <v-chip-group v-model="days" column multiple >
      <v-chip filter outlined v-for="week in daysOfTheWeek" :key="week">
        {{week}}
      </v-chip>
    </v-chip-group>
  </div>

<v-btn fixed bottom right fab color="#F26869">
  <router-link class="router-link" to='/add-class'> 
    <v-icon class=" white--text ">mdi-plus</v-icon>
  </router-link>
   
  </v-btn>

  
  <div id="scroll-target" class=" mt-3 " v-for="event in classes" :key="event.className" >
    <router-link class="router-link" v-bind:to="'/selectedClass/' + event.className">
        <v-btn width="104%" color="#D1E8D7"  class="mb-4 d-flex justify-start">
            <span class="darkgrey--text" >{{ event.className }}</span>
            <!-- <span class="white px-1 mx-3 font-weight-bold" color="#F26869">{{ event.days[0] }}</span>
            <span class="white px-1 mx-0 font-weight-bold" color="#F26869">{{ event.days[1] }}</span> -->
            <v-spacer></v-spacer>
            <v-icon class="ml-2">mdi-arrow-right-drop-circle</v-icon>
        </v-btn>
        </router-link>
  </div>
 
</v-container>
</template>


<script>
import db from '@/firebase'

export default {
      data: () => ({
      classes: [],
      searchData: [],
      offsetTop: 0,
      data: '',
      days: [],
      daysOfTheWeek: ['MON', 'TUE', 'WED', 'THUR', 'FRI'],
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

      querySelections (v) {
        this.loading = true
        // Simulated ajax query
        setTimeout(() => {
          this.items = this.searchData.filter(e => {
            return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
          })
          this.loading = false
        }, 500)
      },

      filterDays() {
        this.classes.days.includes()

      }, 

    },

    


    created(){

      db.collection('classes').get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            'id': doc.id, 
            'className': doc.data().className,
            'classInfo': doc.data().classInfo, 
            'dates': doc.data().dates, 
            'days': doc.data().days,
            'times': doc.data().times

          }
          this.classes.push(data)
          this.searchData.push(doc.data().className)
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