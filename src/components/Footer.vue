<template>
  <div class="black" height="20%">

    <v-footer fixed padless app >
     
      <v-row justify="center" no-gutters>
        <v-btn v-for="link in links" :key="link" text class="overline">
          {{ link }}
        </v-btn>
        <v-col class="py-1 text-center black--text" cols="12">
          <span class="overline"> {{ new Date().getFullYear() }} — ACORN </span>
        </v-col>
      </v-row>

    </v-footer>

  </div>

</template>

<script>
export default {

  data: () => ({

    links: [
      'TERMS AND CONDITIONS', 
      'PRIVACY POLICY'
    ]

  })
}
</script>

<style>

</style>