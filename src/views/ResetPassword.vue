<template>
    <div>
      <h2>Restablecer contraseña</h2>
      <form @submit.prevent="handleSubmit">
        <input v-model="password" type="password" required placeholder="Nueva contraseña">
        <input v-model="confirmPassword" type="password" required placeholder="Confirmar nueva contraseña">
        <button type="submit">Restablecer contraseña</button>
      </form>
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import AdminService from '@/services/AdminService';
  
  export default {
    setup() {
      const route = useRoute();
      const router = useRouter();
      const password = ref('');
      const confirmPassword = ref('');
      const message = ref('');
  
      const handleSubmit = async () => {
        if (password.value !== confirmPassword.value) {
          message.value = 'Las contraseñas no coinciden.';
          return;
        }
  
        try {
          const { token } = route.params;
          await AdminService.resetPassword(token, password.value);
          message.value = 'Tu contraseña ha sido restablecida con éxito.';
          setTimeout(() => router.push('/login'), 3000);
        } catch (error) {
          console.error('Error al restablecer la contraseña:', error);
          message.value = 'Hubo un problema al restablecer tu contraseña. Por favor, inténtalo de nuevo.';
        }
      };
  
      return { password, confirmPassword, message, handleSubmit };
    }
  }
  </script>