<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card mt-5">
          <div class="card-body">
            <h2 class="card-title text-center">Olvidé mi contraseña</h2>
            <form @submit.prevent="handleSubmit">
              <div class="form-group">
                <input v-model="email" type="email" class="form-control" required placeholder="Correo electrónico">
              </div>
              <button type="submit" class="btn btn-primary btn-block">Enviar enlace de restablecimiento</button>
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
  name: 'ForgotPassword',
  data() {
    return {
      email: '',
      message: '',
      error: ''
    };
  },
  methods: {
    async handleSubmit() {
      this.message = '';
      this.error = '';

      if (!this.email) {
        this.error = 'Por favor, ingresa tu correo electrónico.';
        return;
      }

      try {
        console.log('Enviando solicitud de restablecimiento de contraseña...');
        const response = await axios.post(`${process.env.VUE_APP_API_URL}/api/admins/auth/forgot-password`, null, {
          params: { email: this.email }
        });
        console.log('Respuesta del servidor:', response.data);
        this.message = 'Se ha enviado un enlace de restablecimiento a tu correo electrónico.';
        this.email = ''; // Limpiar el campo de correo electrónico
      } catch (error) {
        console.error('Error al solicitar restablecimiento de contraseña:', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
          this.error = error.response.data.message || 'Hubo un problema al procesar tu solicitud. Por favor, inténtalo de nuevo.';
        } else if (error.request) {
          console.error('No response received:', error.request);
          this.error = 'No se pudo conectar con el servidor. Por favor, verifica tu conexión a internet.';
        } else {
          console.error('Error setting up request:', error.message);
          this.error = 'Hubo un problema al procesar tu solicitud. Por favor, inténtalo de nuevo.';
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