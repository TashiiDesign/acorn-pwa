<template>
<v-container>

    <v-btn tile elevation="0" color="#F26869" class="my-1 mx-0 pa-2" width="10%" height="10%" v-on:click="previousPage">
        <span class="white--text">Back</span>
    </v-btn>

    <v-card depressed elevation="0" class="my-2" >
        <v-card-title class="headline">Edit Class</v-card-title>
     </v-card>

    <v-form ref="form">
        <v-text-field :rules="inputRules" solo  clear-icon="mdi-close" rows="2" v-model="className" class="white white--text subtitle-2" label="Class Name">CLASS NAME</v-text-field>
        <v-textarea color="#D1E8D7" :rules="inputRulesInfo" solo  clear-icon="mdi-close" rows="2" v-model="classInfo" label="Class Information"></v-textarea>

    
        <div class="my-2">

            <v-app-bar width="100%" elevation="0" tile block height="30%" color="#85C4BB" class="my-5">
                <span class="white--text subtitle-2">SELECT CLASS LENGTH</span>
            </v-app-bar>

            <div>

                <v-date-picker no-title width="100%" v-model="dates" range class="my-3" show-current clearable @click:clear="dates = null" ></v-date-picker>

            <template >
                <v-text-field :rules="inputRulesDate" v-model="dateRangeText" label="Date Range" prepend-icon="mdi-calendar-range" readonly  ></v-text-field>
            </template>
            
        
            </div>


        </div>

           <v-app-bar width="100%" elevation="0" tile block height="30%" color="#85C4BB" class="my-5">
            <span class="white--text subtitle-2">SELECT CLASS DAYS AND TIMES</span>
        </v-app-bar>
    
            <v-select 
            v-model="days"
            :items="daysOfTheWeek"
            label="Select"
            multiple
            chips
            persistent-hint></v-select>

        <div v-for="day in days" :key="day" >
            <span block tile color="#F26869" class="black--text font-weight-bold ">{{ day }}
            </span> 
        </div>

      <v-app-bar width="100%" elevation="0" tile block height="30%" color="#85C4BB" class="my-5">
            <span class="white--text subtitle-2">EDIT ASSIGNED STUDENTS</span>
        </v-app-bar>

            <v-select 
            v-model="assignedStudents"
            :items="students"
            label="Select"
            multiple
            chips
            hint="Add students"
            persistent-hint></v-select>
            


    <v-btn :loading="loading" elevation="0" tile color="#F26869"  full-width="100%" block class="my-3 mx-0" v-on:click="updateClass">
        <span class="white--text">Update Class Information</span>
    </v-btn>

    </v-form>

</v-container>
  
  
</template>

<script>
import db from '@/firebase'
import router from '@/router'


export default {
     data() {
         return {

         className: ' ',
         classInfo: ' ',
         dates: [],
         days: [], 
         times: [],
         students: [],
         assignedStudents: [],
         daysOfTheWeek: ['MON', 'TUE', 'WED', 'THUR', 'FRI'],
         
            inputRules: [
            v => v.length >= 5 || 'Minimum length 5 characters',
            v => v.length <= 20 || 'Max Length 20 characters'
        ],
        inputRulesInfo: [
            v => v.length >= 5 || 'Minimum length 5 characters',
            v => v.length <= 30 || 'Max Length 30 characters'
        ], 
        inputRulesDate: [
            v => v.length >= 5 || 'Minimum length 5 characters',
        ],

        loading: false



         
     }
    },

        created(){ 
            

            db.collection('students').get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {

                    // const data = [
                    //    doc.data().firstName,
                    //     doc.data().lastName, 
                    // ]

                    this.students.push(doc.data().name)
                })
            })
        }, 


     

         beforeRouteEnter (to, from, next) { 
        db.collection('classes').where('className', '==', to.params.className).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                next(vm => {
                    vm.className = doc.data().className
                    vm.classInfo = doc.data().classInfo
                    vm.dates = doc.data().dates
                    vm.days = doc.data().days
                    vm.assignedStudents = doc.data().assignedStudents
                    vm.times = doc.data().times
                })
            })
        })

    }, 
    watch: {
        '$route': 'fetchData'        
    },
    
     
    
  
    methods: {

    
        fetchData() {
            db.collection('classes'). where('className', '==', this.$route.params.className).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    this.className = doc.data().className
                    this.classInfo = doc.data().classInfo
                    this.dates = doc.data().dates
                    this.days = doc.data().days
                    this.assignedStudents = doc.data().assignedStudents
                    this.times = doc.data().times
                })
            })

        },

 

        previousPage(){
            router.go(-1)

        },

        updateClass () {
            db.collection('classes'). where('className', '==', this.$route.params.className).get()
           .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    doc.ref.update({
                        className: this.className,
                        classInfo: this.classInfo, 
                        days: this.days,
                        dates: this.dates,
                        assignedStudents:this.assignedStudents,
                        times: this.times, 

                    })
                    .then(() => {
                        this.$router.push({name: 'selectedClass', 
                        params: {className: this.className}})
                    })
                })
            })
        }
    },

    computed: {
      dateRangeText () {
        return this.dates.join(' - ')
      },
    }


    

}
</script>

<style>
  router-link {
    text-decoration: none;
  }
</style>