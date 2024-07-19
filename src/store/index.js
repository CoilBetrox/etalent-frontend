import router from '@/router';
import { createStore } from 'vuex';

export default createStore({
  state: {
    isLoggedIn: !!localStorage.getItem('accessToken'),
    userRole: JSON.parse(localStorage.getItem('userRole')) || '',
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
    login({ commit }, { accessToken, userRole }) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('userRole', JSON.stringify(userRole));
      commit('SET_LOGGED_IN', true);
      commit('SET_USER_ROLE', userRole);
    },
    logout({ commit }) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userRole');
      commit('SET_LOGGED_IN', false);
      commit('SET_USER_ROLE', '');
      router.push('/login');
    },
  },
  getters: {
    isLoggedIn: state => state.isLoggedIn,
    userRole: state => state.userRole,
  },
});