import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
      users: []
    },
    mutations: {
      getUsers (state, v) {
        state.users = v;
        console.log(v);
      }
    }
})
  