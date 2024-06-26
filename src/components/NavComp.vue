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
          <router-link to="/" class="nav-link" active-class="active">Inicio</router-link>
          <router-link to="/feedbacks" class="nav-link" active-class="active">Feedbacks</router-link>
          <router-link to="/directorio" class="nav-link" active-class="active">Directorio</router-link>
          <router-link to="/perfil" class="nav-link" active-class="active">Mi perfil</router-link>
          <router-link to="/nosotros" class="nav-link" active-class="active">Nosotros</router-link>
        </ul>
        <div class="d-flex align-items-center">
          <span class="nav-link text-light">{{ currentDateTime }}</span> 
          <button v-if="isLoggedIn" class="btn btn-outline-light">Logout</button> 
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
      isLoggedIn: false // Reemplazar con la lógica de inicio de sesión real
    };
  },
  mounted() {
  this.intervalId = setInterval(() => {
    try {
      this.currentDateTime = new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + ' ' + new Date().toLocaleTimeString('es-ES'); 
    } catch (error) {
      console.error('Error al actualizar la fecha y hora:', error);
      // Manejar el error de alguna manera (por ejemplo, detener el intervalo)
    }
  }, 1000);
},

  beforeDestroy() {
    clearInterval(this.intervalId); // Detener el intervalo al desmontar
  }
};
</script>