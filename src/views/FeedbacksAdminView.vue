<template>
    <div class="container mt-4">
      <h1>Administración de Feedbacks</h1>
      <div v-if="loading">Cargando usuarios...</div>
      <div v-else>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>SAP</th>
              <th>Estado</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="usuario in usuarios" :key="usuario.idUsuario">
              <td>{{ usuario.idUsuario }}</td>
              <td>{{ usuario.nombreUsuario }}</td>
              <td>{{ usuario.correoUsuario }}</td>
              <td>{{ usuario.sapUsuario }}</td>
              <td>{{ usuario.estadoUsuario }}</td>
              <td>{{ usuario.rolUsuario.nombreRolUsuario }}</td>
              <td>
                <button @click="openFeedbackModal(usuario)" class="btn btn-primary btn-sm">
                  Agregar Feedback
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Modal para agregar feedback -->
      <div class="modal fade" id="feedbackModal" tabindex="-1" aria-labelledby="feedbackModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="feedbackModalLabel">Agregar Feedback para {{ selectedUser?.nombreUsuario }}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="submitFeedback">
                <div class="mb-3">
                  <label for="feedbackComment" class="form-label">Comentario</label>
                  <textarea v-model="feedbackComment" class="form-control" id="feedbackComment" rows="3" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Enviar Feedback</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  export default {
    name: 'FeedbackAdminView',
    setup() {
      const usuarios = ref([]);
      const loading = ref(true);
      const selectedUser = ref(null);
      const feedbackComment = ref('');
  
      const fetchUsuarios = async () => {
        try {
          const response = await axios.get('/api/usuarios');
          usuarios.value = response.data;
          loading.value = false;
        } catch (error) {
          console.error('Error al cargar usuarios:', error);
          loading.value = false;
        }
      };
  
      const openFeedbackModal = (usuario) => {
        selectedUser.value = usuario;
        feedbackComment.value = '';
        // Asumiendo que estás usando bootstrap para el modal
        const modal = new bootstrap.Modal(document.getElementById('feedbackModal'));
        modal.show();
      };
  
      const submitFeedback = async () => {
        try {
          await axios.post('/api/feedbacks', {
            usuarioId: selectedUser.value.idUsuario,
            comentario: feedbackComment.value
          });
          alert('Feedback enviado con éxito');
          // Cerrar el modal
          const modal = bootstrap.Modal.getInstance(document.getElementById('feedbackModal'));
          modal.hide();
        } catch (error) {
          console.error('Error al enviar feedback:', error);
          alert('Error al enviar feedback');
        }
      };
  
      onMounted(() => {
        fetchUsuarios();
      });
  
      return {
        usuarios,
        loading,
        selectedUser,
        feedbackComment,
        openFeedbackModal,
        submitFeedback
      };
    }
  };
  </script>