<template>
  <nav class="navbar navbar-expand-lg bg-dark">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">Etalent</router-link>
      <button 
        class="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav" 
        aria-controls="navbarNav" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-between" id="navbarNav">
        <ul class="navbar-nav">
          <template v-if="isLoggedIn">
            <template v-if="userRole.includes('AdminTienda')">
              <router-link to="/" class="nav-link" active-class="active">Inicio</router-link>
              <router-link to="/feedbacks" class="nav-link" active-class="active">Feedbacks</router-link>
              <router-link to="/directorio" class="nav-link" active-class="active">Directorio</router-link>
              <router-link to="/perfil" class="nav-link" active-class="active">Mi perfil</router-link>
              <router-link to="/nosotros" class="nav-link" active-class="active">Nosotros</router-link>
            </template>
            <template v-else-if="userRole.includes('AdminDO')">
              <router-link to="/" class="nav-link" active-class="active">Inicio</router-link>
              <router-link to="/feedbacksAdmin" class="nav-link" active-class="active">Feedbacks General</router-link>
              <router-link to="/directorioAdmin" class="nav-link" active-class="active">Directorio General</router-link>
              <router-link to="/cursosAdmin" class="nav-link" active-class="active">Cursos General</router-link>
              <router-link to="/perfil" class="nav-link" active-class="active">Mi perfil</router-link>
              <router-link to="/nosotros" class="nav-link" active-class="active">Nosotros</router-link>
            </template>
          </template>
        </ul>
        <div class="d-flex align-items-center">
          <span class="nav-link text-light">{{ currentDateTime }}</span> 
          <button v-if="isLoggedIn" @click="logout" class="btn btn-outline-light">Logout</button>
          <router-link v-else to="/login" class="btn btn-outline-light">Login</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: "NavComp",
  data() {
    return {
      currentDateTime: new Date().toLocaleString(),
      intervalId: null,
      //isLoggedIn: false
    };
  },
  computed: {
    ...mapState(['isLoggedIn', 'userRole']),
  },
  methods: {
    ...mapActions(['logout']),
    updateDateTime() {
      try {
        this.currentDateTime = new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + ' | ' + new Date().toLocaleTimeString('es-ES');
      } catch (error) {
        console.error('Error al actualizar la fecha y hora:', error);
      }
    },
    
  },
  mounted() {
    //this.checkAuth();
    console.log('Mounted isLoggedIn:', this.isLoggedIn);
    console.log('Mounted userRole:', this.userRole);
    this.updateDateTime();
    this.intervalId = setInterval(this.updateDateTime, 1000);
  },
  beforeUnmount() {
    clearInterval(this.intervalId);
  },
  watch: {
    isLoggedIn(newVal) {
      console.log('watch isLoggedIn:', newVal);
      if (newVal) {
        this.$forceUpdate();
      }
    },
    userRole(newVal) {
      console.log('watch userRole:', newVal);
      if (newVal) {
        this.$forceUpdate();
      }
    }
  }
};
</script>
<style>
.navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255, 1)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

.nav-link.active {
  color: #fff;
  font-weight: bold;
  border: 1px solid transparent;
  border-color: #f8f9fa;
  border-radius: 4px;
}
</style>