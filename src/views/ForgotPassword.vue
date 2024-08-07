<template>
    <div>
      <h2>Olvidé mi contraseña</h2>
      <form @submit.prevent="handleSubmit">
        <input v-model="email" type="email" required placeholder="Correo electrónico">
        <button type="submit">Enviar enlace de restablecimiento</button>
      </form>
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import AdminService from '@/services/AdminService';
  
  export default {
    setup() {
      const email = ref('');
      const message = ref('');
  
      const handleSubmit = async () => {
        try {
          await AdminService.forgotPassword(email.value);
          message.value = 'Se ha enviado un enlace de restablecimiento a tu correo electrónico.';
        } catch (error) {
          console.error('Error al solicitar restablecimiento de contraseña:', error);
          message.value = 'Hubo un problema al procesar tu solicitud. Por favor, inténtalo de nuevo.';
        }
      };
  
      return { email, message, handleSubmit };
    }
  }
  </script>