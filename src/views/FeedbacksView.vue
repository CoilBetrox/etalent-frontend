<template>
    <div class="feedbacks-container">
      <div v-for="feedback in feedbacks" :key="feedback.id" class="feedback-item">
        <div class="user-info">
          <img :src="feedback.avatarUrl" alt="User avatar" class="avatar">
          <div>
            <h3>{{ feedback.nombreApellido }}</h3>
            <p>{{ feedback.info }}</p>
          </div>
        </div>
        <p class="feedback-date">{{ formatDate(feedback.fecha) }}</p>
        <p class="feedback-content">{{ feedback.contenido }}</p>
        <div v-for="comentario in feedback.comentarios" :key="comentario.id" class="comentario">
          <h4>{{ comentario.autor }}</h4>
          <p>{{ comentario.contenido }}</p>
        </div>
        <input v-model="nuevoComentario[feedback.id]" placeholder="Añadir comentario...">
        <button @click="enviarComentario(feedback.id)">Enviar Comentario</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  export default {
    setup() {
      const feedbacks = ref([]);
      const nuevoComentario = ref({});
  
      const obtenerFeedbacks = async () => {
        try {
          const response = await axios.get('/api/feedbacks');
          feedbacks.value = response.data.slice(0, 10); // Limitamos a 10 feedbacks
        } catch (error) {
          console.error('Error al obtener feedbacks:', error);
        }
      };
  
      const enviarComentario = async (feedbackId) => {
        try {
          await axios.post(`/api/feedbacks/${feedbackId}/comentarios`, {
            contenido: nuevoComentario.value[feedbackId]
          });
          nuevoComentario.value[feedbackId] = '';
          await obtenerFeedbacks(); // Recargar feedbacks
        } catch (error) {
          console.error('Error al enviar comentario:', error);
        }
      };
  
      const formatDate = (date) => {
        return new Date(date).toLocaleDateString();
      };
  
      onMounted(obtenerFeedbacks);
  
      return {
        feedbacks,
        nuevoComentario,
        enviarComentario,
        formatDate
      };
    }
  }
  </script>
  
  <style scoped>
  /* Añade estilos aquí */
  </style>
