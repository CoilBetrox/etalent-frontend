<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card mt-5">
          <div class="card-body">
            <h2 class="card-title text-center">Restablecer contraseña</h2>
            <form @submit.prevent="handleSubmit">
              <div class="form-group">
                <input v-model="password" type="password" class="form-control" required placeholder="Nueva contraseña">
              </div>
              <div class="form-group">
                <input v-model="confirmPassword" type="password" class="form-control" required placeholder="Confirmar nueva contraseña">
              </div>
              <button type="submit" class="btn btn-primary btn-block">Restablecer contraseña</button>
            </form>
            <p v-if="message" class="mt-3 text-success">{{ message }}</p>
            <p v-if="error" class="mt-3 text-danger">{{ error }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ResetPassword',
  data() {
    return {
      password: '',
      confirmPassword: '',
      message: '',
      error: '',
      token: ''
    };
  },
  created() {
    this.token = this.$route.query.token;
    if (!this.token) {
      this.error = 'Token no proporcionado. Por favor, utiliza el enlace enviado a tu correo electrónico.';
    }
  },
  methods: {
    async handleSubmit() {
      this.message = '';
      this.error = '';

      if (this.password !== this.confirmPassword) {
        this.error = 'Las contraseñas no coinciden.';
        return;
      }

      if (!this.token) {
        this.error = 'Token no válido. Por favor, utiliza el enlace enviado a tu correo electrónico.';
        return;
      }

      try {
        console.log('Enviando solicitud de restablecimiento de contraseña...');
        const response = await axios.post('http://localhost:8081/api/admins/auth/reset-password', null, {
          params: { 
            token: this.token,
            newPassword: this.password
          }
        });
        console.log('Respuesta del servidor:', response.data);
        this.message = 'Tu contraseña ha sido restablecida con éxito.';
        setTimeout(() => this.$router.push('/login'), 3000);
      } catch (error) {
        console.error('Error al restablecer la contraseña:', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
          this.error = error.response.data.message || 'Hubo un problema al restablecer tu contraseña. Por favor, inténtalo de nuevo.';
        } else if (error.request) {
          console.error('No response received:', error.request);
          this.error = 'No se pudo conectar con el servidor. Por favor, verifica tu conexión a internet.';
        } else {
          console.error('Error setting up request:', error.message);
          this.error = 'Hubo un problema al restablecer tu contraseña. Por favor, inténtalo de nuevo.';
        }
      }
    }
  }
};
</script>

<style scoped>
.container {
  padding: 2rem;
}
</style>