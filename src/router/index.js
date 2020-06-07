
//Importing all Components for use with Router functionality 

import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/auth/login.vue'
import Register from '../components/auth/register.vue'
import firebase from 'firebase'

//Admin section
import Home from '../components/Home.vue'
import Students from '../components/admin-views/Students.vue'
import Classes from '../components/admin-views/Classes.vue'
import Timetable from '../components/admin-views/Timetable.vue'
import addClass from '../components/admin-views/addClass.vue'
import selectedClass from '../components/admin-views/selectedClass.vue'
import editClass from '../components/admin-views/editClass.vue'
import addStudent from '../components/admin-views/addStudent.vue'
import selectedStudent from '../components/admin-views/selectedStudent.vue'
import editStudent from '../components/admin-views/editStudent.vue'


//Student Section
import classInfo from '../components/student-views/class-info.vue'
import studentTimetable from '../components/student-views/student-timetable.vue'


//Enables use of Vue Router
Vue.use(VueRouter)

//Array of Routes. Specifying which components to show at which paths of application
const routes = [

  //Login Routes 

  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { //Meta property allows restrictions or methods to be added 
      hideNavigation: true,
      requiresGuest: true,

    }
    
  },

  
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: { 
      hideNavigation: true,
      requiresGuest: true,
    }
  },

  //Admin Routes
  

  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },

  {
    path: '/students',
    name: 'students',
    component: Students,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/classes',
    name: 'classes',
    component: Classes,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/timetable',
    name: 'timetable',
    component: Timetable,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/add-class',
    name: 'addClass',
    component: addClass,
    meta: {
      requiresAuth: true,
 
    }
  },
  {
    path: '/selectedClass/:className', //param specific
    name: 'selectedClass',
    component: selectedClass,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/editClass/:className', //param specific
    name: 'editClass',
    component: editClass,
    meta: {
      requiresAuth: true,
    }
  },

  {
    path: '/addStudent',
    name: 'addStudent',
    component: addStudent,
    meta: {
      requiresAuth: true,
    }
  },

  {
    path: '/editStudent',
    name: 'editStudent',
    component: editStudent,
    meta: {
      requiresAuth: true,
    }
  },

  {
    path: '/selectedStudent/:name', //param specific
    name: 'selectedStudent',
    component: selectedStudent,
    meta: {
      requiresAuth: true,
    }
  },


  //Student Routes


  {
    path: '/class-info/', 
    name: 'classInfo',
    component: classInfo,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/student-timetable/', //param specific
    name: 'studentTimetable',
    component: studentTimetable,
    meta: {
      requiresAuth: true
    }
  },
]

const router = new VueRouter({
  mode: 'history', //Either Hash or History can be added as a mode
  //History allows the ability to go to a previous path (back button). Also removes # from URL

  base: process.env.BASE_URL,
  routes 
})

//Navigation Guards

//beforeEach(to, from, next) checks when to add the statements below

router.beforeEach((to, from, next) => {

  //To: checks for a navigation guard (ex. RequiresAuth - which is declared above)
  if(to.matched.some(record => record.meta.requiresAuth)) {

    //Checks if a user is NOT logged in
    if(!firebase.auth().currentUser){

      //If no user is logged in, redirect back to Login 
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });

    } else {
      //Otherwise proceed to the intended route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {

      //Checks if a user IS logged in
      if(firebase.auth().currentUser){

        //If logged in, redirects to the homepage
        next({
          path: '/',
          query: {
            redirect: to.fullPath
          }
        })
  } else {
    //Otherwise proceed to route
    next();
    }  
  } else {
      //In all other circumstances, proceed to route
      next();
  }
});

  
//Export the router
export default router; 
