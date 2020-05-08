<template>
  <v-container>
      
<div class="d-flex flex-column">
  <router-link to='/students' class="router-link">
  <div class="d-flex justify-space-between justify-space-around">
    <v-btn tile color="#9DC8B5" width="90%"  height="100%" class="ma-5 pa-3 text-center">
      <span class="white--text subtitle-1 font-weight-medium">Manage Students</span>
    </v-btn>
  </div>
  </router-link>

  <router-link to='/classes' class="router-link" >
  <div class="d-flex justify-space-between justify-space-around">
    <v-btn tile color="#9DC8B5" width="90%" height="100%" class="ma-5 pa-3 text-center">
      <span class="white--text subtitle-1 font-weight-medium">Manage Classes</span>
    </v-btn>
  </div>
  </router-link>

  <router-link to='/timetable' class="router-link" >
  <div  class="d-flex justify-space-between justify-space-around">
    <v-btn tile color="#9DC8B5" width="90%" height="100%" class="ma-5 pa-3 text-center">
    <span class="white--text subtitle-1 font-weight-medium">Manage Timetable</span>
    </v-btn>
  </div>
  </router-link>

</div>

  </v-container>
</template>

<script>
export default {

}
</script>

<style>

</style>