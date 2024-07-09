<template>
  <div class="feedbacks-container">
    <div v-for="feedback in feedbacks" :key="feedback.idFeedback" class="feedback-item">
      <div class="user-info">
        <img :src="feedback.avatarUrl" alt="User avatar" class="avatar">
        <div>
          <h3>{{ feedback.nombreUsuario }}</h3>
          <p>{{ feedback.info }}</p>
        </div>
      </div>
      <p class="feedback-date">{{ formatDate(feedback.fechaCreacionFeedback) }}</p>
      <p class="feedback-content">{{ feedback.descripcionFeedback }}</p>
      <div v-for="comentario in feedback.comentarios" :key="comentario.id" class="comentario">
        <p>{{ comentario.contenido }}</p>
        <h4>{{ comentario.autor }}</h4>
      </div>
      <input v-model="nuevoComentario[feedback.idFeedback]" placeholder="Añadir comentario...">
      <button @click="enviarComentario(feedback.idFeedback)">Enviar Comentario</button>
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
        const feedbacksResponse = await AdminService.getFeedbacks();
        const comentariosResponse = await AdminService.getComentarios();
        
        console.log('Respuesta de feedbacks:', feedbacksResponse);
        console.log('Respuesta de comentarios:', comentariosResponse);

        if (Array.isArray(feedbacksResponse) && Array.isArray(comentariosResponse)) {
          feedbacks.value = feedbacksResponse.map(feedback => ({
            idFeedback: feedback.idFeedback,
            nombreUsuario: feedback.nombreUsuario,
            info: `${feedback.sapUsuario} | ${feedback.estadoUsuario} | ${feedback.rolUsuario}`,
            fechaCreacionFeedback: feedback.fechaCreacionFeedback,
            descripcionFeedback: feedback.descripcionFeedback,
            avatarUrl: 'URL_POR_DEFECTO_AVATAR',
            comentarios: comentariosResponse.filter(c => c.feedbackId === feedback.idFeedback)
          }));
        } else {
          console.error('La respuesta de feedbacks o comentarios no es un array:', feedbacksResponse, comentariosResponse);
        }
      } catch (error) {
        console.error('Error al obtener feedbacks y comentarios:', error);
      }
    };

    const enviarComentario = async (feedbackId) => {
      try {
        const comentarioFeedbackDto = {
          contenido: nuevoComentario.value[feedbackId]
        };
        
        const response = await AdminService.createComentario(comentarioFeedbackDto, feedbackId);
        console.log('Respuesta al crear comentario:', response);
        nuevoComentario.value[feedbackId] = '';
        await obtenerFeedbacks(); // Recargar feedbacks y comentarios
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