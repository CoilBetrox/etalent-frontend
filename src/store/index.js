import router from '@/router';
import { createStore } from 'vuex'

export default createStore({
  state: {
    isLoggedIn: !!localStorage.getItem('accessToken'),
    userRole: localStorage.getItem('userRole') || '',
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.isLoggedIn = value;
    },
    SET_USER_ROLE(state, role) {
      state.userRole = role;
    },
  },
  actions: {
    login({commit }){
      commit('SET_LOGGED_IN', true);
      commit('SET_USER_ROLE', localStorage.getItem('userRole'));
    },logout({ commit }){
      commit('SET_LOGGED_IN', false);
      commit('SET_USER_ROLE', '');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userRole');
      router.push('/login');
    },
  },
  getters: {
    isLoggedIn: state => state.isLoggedIn,
    userRole: state => state.userRole,
  },
});

