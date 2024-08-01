import router from '@/router';
import { createStore } from 'vuex';
import { checkTokenExpiration, setTokenExpiration } from '@/utils/tokenManager';

export default createStore({
  state: {
    isLoggedIn: !!localStorage.getItem('accessToken'),
    userRole: JSON.parse(localStorage.getItem('userRole')) || '',
    alert: null,
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.isLoggedIn = value;
      console.log('state isLoggedIn', state.isLoggedIn);
    },
    SET_USER_ROLE(state, role) {
      state.userRole = role;
      console.log('state userRole', role);
      console.log('state', state);
    },
    SET_ALERT(state, alert) {
      state.alert = alert;
    },
  },
  actions: {
    login({ commit }, { accessToken, userRole, expiresIn = 3600 }) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('userRole', JSON.stringify(userRole));
      commit('SET_LOGGED_IN', true);
      commit('SET_USER_ROLE', userRole);
      setTokenExpiration(expiresIn);
      checkTokenExpiration();
    },
    logout({ commit }) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userRole');
      localStorage.removeItem('tokenExpiration');
      commit('SET_LOGGED_IN', false);
      commit('SET_USER_ROLE', '');
      router.push('/login');
    },
    checkAuth({ commit, dispatch }) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        commit('SET_LOGGED_IN', true);
        commit('SET_USER_ROLE', JSON.parse(localStorage.getItem('userRole')) || '');
        checkTokenExpiration();
      } else {
        dispatch('logout');
      }
    },
    clearAlert({ commit }) {
      commit('SET_ALERT', null);
    },
  },
  getters: {
    isLoggedIn: state => state.isLoggedIn,
    userRole: state => state.userRole,
    alert: state => state.alert,
  },
});