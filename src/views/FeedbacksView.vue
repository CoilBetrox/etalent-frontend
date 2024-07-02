FEEDBACK
<template>
  <div class="feedbacks">
    <div v-for="feedback in feedbackList" :key="feedback.id" class="feedback-card">
      <div class="header">
        <img src="https://via.placeholder.com/64" alt="Foto de Perfil" class="profile-pic" />
        <div class="user-info">
          <h3>{{ feedback.nombre }}</h3>
          <p>{{ feedback.sap }} | {{ feedback.genero }} | {{ feedback.departamento }} | {{ feedback.estado }} | {{ feedback.valoracion }}</p>
        </div>
      </div>
      <div class="feedback-details">
        <p><strong>Feedback creado por {{ feedback.creadoPor }}</strong></p>
        <p>{{ feedback.fecha }}</p>
        <p>{{ feedback.mensaje }}</p>
      </div>
      <div class="comments">
        <h4>Comentarios</h4>
        <p><strong>{{ feedback.comentarioAutor }}</strong></p>
        <p>{{ feedback.comentarioTexto }}</p>
      </div>
      <div class="comment-form">
        <input type="text" v-model="newComment" placeholder="Escribe tu comentario aquí" />
        <button @click="submitComment(feedback.id)">Enviar Comentario</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      feedbackList: [
        {
          id: 1,
          nombre: 'Nombre Apellido',
          sap: '2011528',
          genero: 'Femenino',
          departamento: 'Tecnología',
          estado: 'Activo',
          valoracion: 'Prometedor',
          creadoPor: 'Nombre',
          fecha: '18 de Junio del 2024',
          mensaje: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed faucibus libero.',
          comentarioAutor: 'Admin Desarrollo Organizacional',
          comentarioTexto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed faucibus libero.'
        },
        {
          id: 2,
          nombre: 'Nombre Apellido',
          sap: '2011528',
          genero: 'Femenino',
          departamento: 'Tecnología',
          estado: 'Activo',
          valoracion: 'Prometedor',
          creadoPor: 'Nombre',
          fecha: '18 de Junio del 2024',
          mensaje: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed faucibus libero.',
          comentarioAutor: 'Admin Desarrollo Organizacional',
          comentarioTexto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed faucibus libero.'
        }
      ],
      newComment: ''
    };
  },
  methods: {
    submitComment(feedbackId) {
      // Aquí puedes manejar el envío del comentario
      console.log('Comentario enviado para el feedback', feedbackId, this.newComment);
      this.newComment = ''; // Resetea el campo de comentario
    }
  }
};
</script>

<style scoped>
.feedbacks {
  max-width: 600px;
  margin: 0 auto;
}

.feedback-card {
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 5px;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.profile-pic {
  width: 64px;
  height: 64px;
  margin-right: 1rem;
}

.user-info h3 {
  margin: 0;
  font-size: 1.25rem;
}

.user-info p {
  margin: 0;
  color: #555;
}

.feedback-details p,
.comments p {
  margin: 0.5rem 0;
}

.comments h4 {
  margin-top: 1rem;
}

.comment-form {
  margin-top: 1rem;
  display: flex;
  align-items: center;
}

.comment-form input {
  flex: 1;
  padding: 0.5rem;
  margin-right: 0.5rem;
}

.comment-form button {
  padding: 0.5rem 1rem;
  background-color: #333;
  color: white;
  border: none;
  cursor: pointer;
}

.comment-form button:hover {
  background-color: #555;
}
</style>
