//The Vuetify Plugin config

import Vue from 'vue';
import Vuetify from 'vuetify/lib';


Vue.use(Vuetify)

export default new Vuetify({
    theme: {
        themes:{
        primary: '#9DC8B5',
        secondary: '#85C4BB',
        accent: '#F26869',
        anchor: '#FEFBF2',
        info: '#4D4D4D',
        }
    },

    iconfont: 'mdi', //Enables ability to use material icons 
});

//https://stackoverflow.com/questions/49805913/vuejs-vuetify-color-theme-not-working