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
        solo-inverted>
        
        </v-autocomplete>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      
    </v-toolbar>

    <v-card depressed elevation="0" class="my-2" >
      <v-card-title class="headline">Class Information</v-card-title>
    </v-card>



    <div width="100%" class="d-flex justify-space-between justify-space-around">

      <v-chip-group v-model="days" column multiple >
        <v-chip filter outlined v-for="week in daysOfTheWeek" :key="week">
          {{week}}
        </v-chip>
      </v-chip-group>
      
    </div>

  <!-- Add class button -->
  <v-btn fixed bottom right fab color="#F26869">

    <router-link class="router-link" to='/add-class'> 
      <v-icon class=" white--text ">mdi-plus</v-icon>
    </router-link>
    
  </v-btn>

    
  <!-- Retreiving and looping through classes from database 
  and adding parameter within URL to get specific class when clicked -->

    <div id="scroll-target" class=" mt-3 " v-for="event in classes" :key="event.className" >
      <router-link class="router-link" v-bind:to="'/selectedClass/' + event.className">
          <v-btn width="104%" color="#D1E8D7"  class="mb-4 d-flex justify-start">
              <span class="darkgrey--text" >{{ event.className }}</span>
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
      classes: [], //Empty classes array for database data to be pushed into later
      searchData: [],
      offsetTop: 0,
      data: '',
      days: [], //Empty days array for database data to be pushed into later
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

//Using a lifecycle hook to get database collection when component/instance is created

    created(){ 
      db.collection('classes').get() //Standard Firebase syntax for querying database
      .then(querySnapshot => { //Returns a promise 

        querySnapshot.forEach(doc => {

          const data = { 
            'id': doc.id, 
            'className': doc.data().className,
            'classInfo': doc.data().classInfo, 
            'dates': doc.data().dates, 
            'days': doc.data().days,
            'times': doc.data().times

          }
          this.classes.push(data) //Pushes data into the empty Classes array created above
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