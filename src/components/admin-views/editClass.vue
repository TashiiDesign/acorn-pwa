<template>
<v-container>
<!-- On click function for back button -->
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

<!-- Clearable date picker component -->
            <div>
                <v-date-picker no-title width="100%" v-model="dates" range class="my-3" show-current clearable @click:clear="dates = null" ></v-date-picker>

<!-- v-model daterangetext allows text to be joined together using a computed property within the script -->
                <template>
                    <v-text-field :rules="inputRulesDate" v-model="dateRangeText" label="Date Range" prepend-icon="mdi-calendar-range" readonly  ></v-text-field>
                </template>
            </div>

        </div>

        <v-app-bar width="100%" elevation="0" tile block height="30%" color="#85C4BB" class="my-5">
            <span class="white--text subtitle-2">SELECT CLASS DAYS AND TIMES</span>
        </v-app-bar>
    
<!-- v-select creates select field, gets the days from v-model and uses the :items directive to get the selected days --> 
        <v-select 
        v-model="days"
        :items="daysOfTheWeek"
        label="Select"
        multiple
        chips
        persistent-hint>

        </v-select>

<!-- Loop through and output the days -->
        <div v-for="day in days" :key="day" >
            <span block tile color="#F26869" class="black--text font-weight-bold ">{{ day }}</span> 
        </div>

        <v-app-bar width="100%" elevation="0" tile block height="30%" color="#85C4BB" class="my-5">
            <span class="white--text subtitle-2">EDIT ASSIGNED STUDENTS</span>
        </v-app-bar>

<!-- Same structure as days -->
        <v-select 
        v-model="assignedStudents"
        :items="students"
        label="Select"
        multiple
        chips
        hint="Add students"
        persistent-hint>
        
        </v-select>
<!-- Button to update the class information defined in a method -->
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
     data: () => ({
         className: ' ',
         classInfo: ' ',
         dates: [],
         days: [], 
         times: [],
         students: [],
         assignedStudents: [],
         daysOfTheWeek: ['MON', 'TUE', 'WED', 'THUR', 'FRI'],
         
    //Defining Form Rules
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

    }),

    created(){ 
        
        //Getting students at created lifecycle hook in order to add them to the assigned students list 

        db.collection('students').get()
        .then(querySnapshot => { //Returns a promise 
            querySnapshot.forEach(doc => {

                this.students.push(doc.data().name) //Pushes the name field to the students array created above 
            })
        })
    }, 

//In-component guard: Called before the route that renders the component is confirmed 
    beforeRouteEnter (to, from, next) { //Gets the specific data where the className equals the param specified in the router file
        db.collection('classes').where('className', '==', to.params.className).get() 
        .then(querySnapshot => { //Returns a promise 
            querySnapshot.forEach(doc => {

                next(vm => { //vm used to access component instance 

                //When navigation is confirmed, data is added to component instance
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

    //Watches the route for any changes to fetchData 
    watch: {
        '$route': 'fetchData'        
    },

     
    methods: {
    
        fetchData() { //Fetching all the data where the param matches the route 
            db.collection('classes'). where('className', '==', this.$route.params.className).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {  //Loops through and adds data to object 
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
            router.go(-1) //Router function to go back to the previous route

        },

        updateClass () {
            db.collection('classes'). where('className', '==', this.$route.params.className).get()
           .then(querySnapshot => {
                querySnapshot.forEach(doc => {

                    doc.ref.update({ //Updated information is sent to new object with the specified variables
                    
                        className: this.className,
                        classInfo: this.classInfo, 
                        days: this.days,
                        dates: this.dates,
                        assignedStudents:this.assignedStudents,
                        times: this.times, 

                    })
                    .then(() => { //Router then pushes back to the selected class which matches this router's parameter
                        this.$router.push({name: 'selectedClass', 
                        params: {className: this.className}})
                    })
                })
            })
        }
    },

    computed: { //.join method to concatenate all elements in the array 
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