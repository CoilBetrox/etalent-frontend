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
      const roleToSave = Array.isArray(userRole) ? userRole[0] : userRole;
      localStorage.setItem('accessToken', accessToken);
      //localStorage.setItem('userRole', JSON.stringify(userRole));
      localStorage.setItem('userRole', JSON.stringify(roleToSave));
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
      //router.push('/');
    },
    checkAuth({ commit, dispatch }) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        commit('SET_LOGGED_IN', true);
        //commit('SET_USER_ROLE', JSON.parse(localStorage.getItem('userRole')) || '');
        const storedRole = JSON.parse(localStorage.getItem('userRole'));
        const roleToSet = Array.isArray(storedRole) ? storedRole[0] : storedRole;
        commit('SET_USER_ROLE', roleToSet);
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