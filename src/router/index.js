
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../auth/login.vue'
import Register from '../auth/register.vue'
import firebase from 'firebase'
//admin section
import Home from '../Home.vue'
import Students from '../admin-views/Students.vue'
import Classes from '../admin-views/Classes.vue'
import Timetable from '../admin-views/Timetable.vue'
import addClass from '../admin-views/addClass.vue'
import selectedClass from '../admin-views/selectedClass.vue'
import editClass from '../admin-views/editClass.vue'
import addStudent from '../admin-views/addStudent.vue'
import selectedStudent from '../admin-views/selectedStudent.vue'
import editStudent from '../admin-views/editStudent.vue'

//student section
import classInfo from '../student-views/class-info.vue'
import studentTimetable from '../student-views/student-timetable.vue'


Vue.use(VueRouter)

const routes = [

  //login

  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { 
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

  //admin views

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
      requiresAdmin: true
    }
  },
  {
    path: '/classes',
    name: 'classes',
    component: Classes,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: '/timetable',
    name: 'timetable',
    component: Timetable,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: '/add-class',
    name: 'addClass',
    component: addClass,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: '/selectedClass/:className',
    name: 'selectedClass',
    component: selectedClass,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: '/editClass/:className',
    name: 'editClass',
    component: editClass,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },

  {
    path: '/addStudent',
    name: 'addStudent',
    component: addStudent,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },

  {
    path: '/editStudent',
    name: 'editStudent',
    component: editStudent,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },

  {
    path: '/selectedStudent/:name',
    name: 'selectedStudent',
    component: selectedStudent,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },


  //student views 


  {
    path: '/class-info/:name',
    name: 'classInfo',
    component: classInfo,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/student-timetable/:name',
    name: 'studentTimetable',
    component: studentTimetable,
    meta: {
      requiresAuth: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//nav guards

router.beforeEach((to, from, next) => {
  //check for authentication guard
  if(to.matched.some(record => record.meta.requiresAuth)) {
    //check if not logged in
    if(!firebase.auth().currentUser){
      //go to login
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      //proceed to route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
  //  if(to.matched.some(record => record.meta.requiresGuest)) {
      //check if logged in
      if(firebase.auth().currentUser){
        //redirect to homepage
        next({
          path: '/',
          query: {
            redirect: to.fullPath
          }
        })
  } else {
    //proceed to route
    next();
    }  
  } else {
      //proceed to route
      next();
  }
});

  

export default router;