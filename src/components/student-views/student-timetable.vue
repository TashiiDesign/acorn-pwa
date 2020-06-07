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
import firebase from 'firebase'

export default {
    data: () => ({
        today: new Date().toISOString().substr(0, 10),
        focus: new Date().toISOString().substr(0, 10),
        type: 'month',
        name: '', 
        assignedClasses: '',
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
    
    created(){

    firebase.auth()
    .onAuthStateChanged(function(user) {

        userInfo(user);

    })

    const userInfo = (user) => {

      if(user){ //Checks if there is a user to avoid errors

        db.collection('students').doc(user.uid).get()
        .then(doc => {
      
          this.assignedClasses = doc.data().assignedClasses
          console.log(this.assignedClasses)

        })
      } 
    }
    },

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

        async getEvents(){
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
            // days.push(doc.data().days)
            
          })

          this.events = events;
          this.days = days;

          
          
          
    },

    // viewDay ({ date }) {
    //     this.focus = date
    //     this.type = 'day'
    //   },
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
      // updateRange ({ start, end }) {
      //   const events = []

      //   const min = new Date(`${start.date}T00:00:00`)
      //   const max = new Date(`${end.date}T23:59:59`)
      //   const days = (max.getTime() - min.getTime()) / 86400000
      //   const eventCount = this.rnd(days, days + 20)

      //   for (let i = 0; i < eventCount; i++) {
      //     const allDay = this.rnd(0, 3) === 0
      //     const firstTimestamp = this.rnd(min.getTime(), max.getTime())
      //     const first = new Date(firstTimestamp - (firstTimestamp % 900000))
      //     const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
      //     const second = new Date(first.getTime() + secondTimestamp)

      //     events.push({
      //       name: this.name[this.rnd(0, this.name.length - 1)],
      //       start: this.formatDate(first, !allDay),
      //       end: this.formatDate(second, !allDay),
      //     })
      //   }

      //   this.start = start
      //   this.end = end
      //   this.events = events
      // },
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