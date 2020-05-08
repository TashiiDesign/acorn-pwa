<template>

<v-container>

    <v-btn tile elevation="0" color="#F26869" class="my-1 mx-0 pa-2" width="10%" height="10%" v-on:click="previousPage">
        <span class="white--text">Back</span>
    </v-btn>

    <v-card depressed elevation="0" class="my-2" >
        <v-card-title class="headline">Add Class</v-card-title>
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
            <span block tile color="#F26869" class="black--text font-weight-bold ">{{ day }}s at 
                       <v-text-field type="time" solo label="Input Time" v-model="times"> </v-text-field>
            </span> 
        </div>


        


        <v-app-bar width="100%" elevation="0" tile block height="30%" color="#85C4BB" class="my-5">
            <span class="white--text subtitle-2">ASSIGN STUDENTS</span>
        </v-app-bar>
           

    
            <v-select 
            v-model="assignedStudents"
            :items="students"
            label="Select"
            multiple
            chips
            hint="Add students"
            persistent-hint></v-select>

        
    <v-btn :loading="loading" elevation="0" tile color="#F26869"  full-width="100%" block class="my-3 mx-0" v-on:click="submit">
        <span class="white--text">Add New Class</span>
    </v-btn> 

    </v-form>

</v-container>
  

</template>

<script>
import db from '@/firebase'
import router from '@/router'

//@vuese
export default {
    data () {
      return {
        className: '',
        classInfo: '',
        date: new Date().toISOString().substr(0, 10),
        menu: false,
        modal: false,
        menu2: false,
        dates: [],
        daysOfTheWeek: ['MON', 'TUE', 'WED', 'THUR', 'FRI'],
        days: [],
        times: [],
        students: [],
        assignedStudents: [],

        
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

        loading: false,
        checked: false,
        
     
      }

      
    },

     created(){

            db.collection('students').get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {

                    this.students.push(doc.data().name)
                })
            })
        }, 

     methods: {

         addDays(){
             

         },

         previousPage(){
             router.go(-1)

         },

        submit(){
            if(this.$refs.form.validate()){ 
                this.loading = true; 
            const classes = {
                className: this.className, 
                classInfo: this.classInfo,
                dates: this.dates,
                days: this.days,
                assignedStudents: this.assignedStudents,
                times:this.times
            }

            db.collection('classes').add(classes).then(() => {
                this.loading = false;
                router.push('/classes')
                
            }) //async task
            }
        }, 

        logDays(){
            console.log(this.days)
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
