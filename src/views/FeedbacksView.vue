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
import AdminService from '@/services/AdminService';

export default {
  setup() {
    const feedbacks = ref([]);
    const nuevoComentario = ref({});

    const obtenerFeedbacks = async () => {
      try {
        const response = await AdminService.getFeedbacks();
        console.log(response);
        feedbacks.value = response.data.map(feedback => ({
          id: feedback.id,
          nombreApellido: feedback.nombreApellido,
          info: `${feedback.numeroEmpleado} | ${feedback.genero} | ${feedback.departamento} | ${feedback.estado} | ${feedback.nivel}`,
          fecha: feedback.fecha,
          contenido: feedback.contenido,
          comentarios: feedback.comentarios.map(comentario => ({
            id: comentario.id,
            autor: comentario.autor,
            contenido: comentario.contenido
          }))
        }));
      } catch (error) {
        console.error('Error al obtener feedbacks:', error);
      }
    };

    const enviarComentario = async (feedbackId) => {
      try {
        await AdminService.enviarComentario(feedbackId, nuevoComentario.value[feedbackId]);
        nuevoComentario.value[feedbackId] = '';
        await obtenerFeedbacks(); // Recargar feedbacks
      } catch (error) {
        console.error('Error al enviar comentario:', error);
      }
    };

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString();
    };

    const agregarNuevoFeedback = () => {
      // Lógica para agregar nuevo feedback
      console.log('Agregar nuevo feedback');
    };

    onMounted(obtenerFeedbacks);

    return {
      feedbacks,
      nuevoComentario,
      enviarComentario,
      formatDate,
      agregarNuevoFeedback
    };
  }
}
</script>
  
<style scoped>
.feedbacks-container {
  padding: 20px;
}

.feedback-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.feedback-item {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 5px;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  margin-right: 15px;
}

.feedback-date {
  font-size: 0.9em;
  color: #888;
  margin-bottom: 10px;
}

.feedback-content {
  margin-bottom: 10px;
}

.comentario {
  padding-left: 20px;
  border-left: 2px solid #eee;
  margin-bottom: 10px;
}

input {
  width: calc(100% - 120px);
  padding: 10px;
  margin-top: 10px;
  margin-right: 10px;
}

button {
  padding: 10px 20px;
  cursor: pointer;
}
</style>
