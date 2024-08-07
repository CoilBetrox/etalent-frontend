<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card mt-5">
          <div class="card-body">
            <h1 class="card-title text-center">Verificación de Correo Electrónico</h1>
            <p v-if="message">{{ message }}</p>
            <p v-if="error" class="text-danger">{{ error }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'VerifyEmail',
  data() {
    return {
      message: '',
      error: ''
    };
  },
  created() {
    console.log('VerifyEmail component created');
    const token = this.$route.query.token;
    console.log('Token:', token);
    this.verifyEmail(token);
  },
  methods: {
    async verifyEmail(token) {
      if (!token) {
      this.error = 'No se proporcionó un token de verificación.';
      return;
      }
    
      try {
        console.log('Enviando solicitud de verificación...');
        const response = await axios.post('http://localhost:8081/api/admins/auth/verify-email', null, {
          params: { token }
        });
        console.log('Respuesta del servidor:', response.data);
        this.message = response.data;
        setTimeout(() => {
          this.$router.push('/login');
        }, 10000);
      } catch (error) {
        console.error('Error al verificar el email:', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error setting up request:', error.message);
        }
        this.error = 'El token de verificación es inválido o ha expirado.';
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