<template>
  <div class="feedback-admin">
    <h2>f</h2>
    <main>
      <div v-for="feedback in feedbacks" :key="feedback.id" class="feedback-card">
        <div class="user-profile">
          <div class="profile-image">64x64</div>
          <div class="user-details">
            <h2>{{ feedback.nombreApellido }}</h2>
            <p>{{ feedback.detalle }}</p>
          </div>
        </div>
        
        <div class="feedback-info">
          <p>Feedback creado por {{ feedback.creadoPor }}</p>
          <p>{{ feedback.fechaCreacion }}</p>
        </div>
        
        <div class="feedback-content">
          <p>{{ feedback.contenido }}</p>
        </div>
        
        <div class="comentarios">
          <h3>Comentarios</h3>
          <div v-for="comentario in feedback.comentarios" :key="comentario.id" class="comentario">
            <h4>{{ comentario.autor }}</h4>
            <p>{{ comentario.contenido }}</p>
          </div>
        </div>
        
        <div class="nuevo-comentario">
          <input v-model="nuevoComentario" placeholder="Escribe un comentario...">
          <button @click="enviarComentario(feedback.id)">Enviar Comentario</button>
        </div>
      </div>
    </main>

  </div>  
</template>

<script>
import axios from 'axios';

export default {
  name: 'FeedbacksAdminView',
  data() {
    return {
      feedbacks: [],
      nuevoComentario: '',
      currentDate: new Date().toLocaleString('es-ES', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
  },
  mounted() {
    this.cargarFeedbacks();
  },
  methods: {
    async cargarFeedbacks() {
      try {
        const response = await axios.get('http://localhost:8081/api/feedbacks');
        this.feedbacks = response.data;
      } catch (error) {
        console.error('Error al cargar los feedbacks:', error);
      }
    },
    async enviarComentario(feedbackId) {
      if (!this.nuevoComentario.trim()) return;
      
      try {
        await axios.post(`http:localhost:8081//api/feedbacks/${feedbackId}/comentarios`, {
          contenido: this.nuevoComentario
        });
        this.nuevoComentario = '';
        await this.cargarFeedbacks(); // Recargar los feedbacks para mostrar el nuevo comentario
      } catch (error) {
        console.error('Error al enviar el comentario:', error);
      }
    }
  }
};
</script>

<style scoped>
.feedback-admin {
  font-family: Arial, sans-serif;
}

header {
  background-color: #000;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav a {
  color: white;
  text-decoration: none;
  margin-right: 1rem;
}

nav a.active {
  font-weight: bold;
}

.feedback-card {
  border: 1px solid #ddd;
  margin-bottom: 1rem;
  padding: 1rem;
}

.user-profile {
  display: flex;
  align-items: center;
}

.profile-image {
  width: 64px;
  height: 64px;
  background-color: #ccc;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feedback-info {
  font-size: 0.9rem;
  color: #666;
}

.comentarios {
  margin-top: 1rem;
}

.nuevo-comentario {
  margin-top: 1rem;
}

.nuevo-comentario input {
  width: 80%;
  padding: 0.5rem;
}

button {
  background-color: #000;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

footer {
  background-color: #f1f1f1;
  padding: 1rem;
  text-align: center;
  font-size: 0.8rem;
}
</style>