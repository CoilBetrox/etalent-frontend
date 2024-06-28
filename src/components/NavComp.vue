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
            <router-link to="/" class="nav-link" active-class="active">Inicio</router-link>
            <router-link to="/feedbacks" class="nav-link" active-class="active">Feedbacks</router-link>
            <router-link to="/directorio" class="nav-link" active-class="active">Directorio</router-link>
            <router-link to="/perfil" class="nav-link" active-class="active">Mi perfil</router-link>
            <router-link to="/nosotros" class="nav-link" active-class="active">Nosotros</router-link>
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
export default {
  name: "NavComp",
  data() {
    return {
      currentDateTime: new Date().toLocaleString(),
      intervalId: null,
      isLoggedIn: false
    };
  },
  methods: {
    checkAuth() {
      this.isLoggedIn = !!localStorage.getItem('accessToken');
    },
    logout() {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userRole');
      this.isLoggedIn = false;
      this.$router.push('/login');
    },
    updateDateTime() {
      try {
        this.currentDateTime = new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + ' ' + new Date().toLocaleTimeString('es-ES');
      } catch (error) {
        console.error('Error al actualizar la fecha y hora:', error);
      }
    }
  },
  mounted() {
    this.checkAuth();
    this.updateDateTime();
    this.intervalId = setInterval(this.updateDateTime, 1000);
  },
  beforeUnmount() {
    clearInterval(this.intervalId);
  }
};
</script>