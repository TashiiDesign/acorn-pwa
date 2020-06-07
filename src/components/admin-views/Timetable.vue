<template>

<v-container>

 <v-card depressed elevation="0" class="my-2" >
    <v-card-title class="headline">Timetable</v-card-title>
  </v-card>

<v-row class="fill-height">
    <v-col>

      
      <v-sheet height="64">

        <v-toolbar flat color="white">
          
          <v-spacer></v-spacer>

          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>


          <v-btn outlined class="ml-2 mr-2" color="grey darken-2" @click="setToday">Today</v-btn>

          <v-toolbar-title>{{ title }}</v-toolbar-title>

          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small>mdi-chevron-right</v-icon>
            <v-spacer></v-spacer>
          </v-btn>

          
          <v-spacer></v-spacer>
                
        </v-toolbar>
        
      </v-sheet>

      <v-sheet>

        <v-calendar ref="calendar" v-model="focus" color="#85C4BB" :events="events" :now="today" :type="type" @click:event="showEvent"
        >
        </v-calendar>

        <v-card v-model="selectedOpen" color="#9DC8B5" class="white--text mt-5" :close-on-content-click="false" :activator="selectedElement" flat tile>

            <v-card-title v-html="selectedEvent.name"></v-card-title>
              <v-chip color="white" v-for="day in selectedEvent.days" :key="day" class="ml-2">{{ day }}</v-chip>
            <v-card-text class="white--text" v-html="selectedEvent.info">
              <span v-html="selectedEvent.details"></span>
            </v-card-text>

          </v-card>

      </v-sheet>
    </v-col>
  </v-row>

</v-container>
  
</template>

<script>

import db from '@/firebase'

export default {
    data: () => ({
        today: new Date().toISOString().substr(0, 10),
        focus: new Date().toISOString().substr(0, 10),
        type: 'month',
        name: '', 
        start: null, 
        end: null,
        info: '',
        dates: [],
        days: [], 
        color: '#85C4BB', 
        events: [], 
        selectedEvent: {},
        selectedOpen: false,
        selectedElement: null,

    
    
    }), 
    
  //https://vuetifyjs.com/en/components/calendars/#calendars
  
    computed: {
      title () {
        const { start, end } = this
        if (!start || !end) {
          return ''
        }

        const startMonth = this.monthFormatter(start)
        const endMonth = this.monthFormatter(end)
        const suffixMonth = startMonth === endMonth ? '' : endMonth

        const startYear = start.year
        const endYear = end.year
        const suffixYear = startYear === endYear ? '' : endYear

        const startDay = start.day + this.nth(start.day)
        const endDay = end.day + this.nth(end.day)

        switch (this.type) {
          case 'month':
            return `${startMonth} ${startYear}`
          case 'week':
          case '4day':
            return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`
          case 'day':
            return `${startMonth} ${startDay} ${startYear}`
        }
        return ''
      },
      monthFormatter () {
        return this.$refs.calendar.getFormatter({
          timeZone: 'UTC', month: 'long',
        })
      },
    },
    

    mounted () {
      this.getEvents();
      // this.$refs.calendar.checkChange()
    }, 

    

    methods: {

        async getEvents(){ //Another way of working with asynchonous tasks 
          let snapshot = await db.collection('classes').get();
          let events = [];
          let days = []

          
          snapshot.forEach(doc => {

             const data = {
               'id': doc.id,
               'name': doc.data().className,
               'info': doc.data().classInfo,
               'dates':doc.data().dates,
               'start':doc.data().dates[0],
               'end':doc.data().dates[1],
               'days':doc.data().days
               

            }

            events.push(data);
            
          })

          this.events = events;
          this.days = days;

          
          
          
    },

      setToday () {
        this.focus = this.today
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      showEvent ({ nativeEvent, event,  }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          setTimeout(() => this.selectedOpen = true, 10)
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          setTimeout(open, 10)
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },

      nth (d) {
        return d > 3 && d < 21
          ? 'th'
          : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
      },
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
      formatDate (a, withTime) {
        return withTime
          ? `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()} ${a.getHours()}:${a.getMinutes()}`
          : `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`
      },
    },
  }
</script>

<style>

</style>