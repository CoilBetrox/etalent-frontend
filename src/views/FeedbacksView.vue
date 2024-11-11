<template>
  <div class="feedbacks-container">
    <div class="feedback-header">
      <button @click="cargarFeedbacks" class="styled-button">Cargar Feedbacks</button>
      <button @click="exportToExcel" class="styled-button">Exportar a Excel</button>
      <button @click="exportToPDF" class="styled-button">Exportar a PDF</button>
    </div>
    <div v-if="feedbacks.length === 0">
      <p>No hay feedbacks disponibles.</p>
    </div>
    <div v-else>
      <div v-for="feedback in feedbacks" :key="feedback.idFeedback" class="feedback-item">
        <div class="user-info">
          <div>
            <p class="feedback-date">{{ formatDate(feedback.fechaCreacionFeedback) }}</p>
            <h3><strong>Para:</strong> {{ feedback.nombreUsuario }}</h3>
            <p>{{ feedback.info }}</p>
            <p><strong>De:</strong> {{ feedback.nombreAdmin }}</p>
          </div>
        </div>
        <p>Comentarios:</p>
        <p class="feedback-content">{{ feedback.descripcionFeedback }}</p>
        <div v-for="comentario in feedback.comentarios" :key="comentario.id" class="comentario">
          <h4>{{ comentario.autor }}</h4>
          <p>{{ comentario.contenido }}</p>
        </div>
        <div class="input-comment-section">
          <input v-model="nuevoComentario[feedback.idFeedback]" placeholder="Añadir comentario...">
          <button @click="enviarComentario(feedback.idFeedback, feedback.usuarioId)">Enviar Comentario</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import AdminService from '@/services/AdminService';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default {
  setup() {
    const feedbacks = ref([]);
    const nuevoComentario = ref({});

    const obtenerFeedbacks = async () => {
      try {
        const feedbacksResponse = await AdminService.getFeedbacks();

        if (!Array.isArray(feedbacksResponse) || feedbacksResponse.length === 0) {
          feedbacks.value = [];
          return;
        }

        feedbacks.value = await Promise.all(feedbacksResponse.map(async (feedback) => {
          const comentarios = await AdminService.getComentariosPorFeedback(feedback.idFeedback);
          return {
            ...feedback,
            info: `SAP: ${feedback.sapUsuario} | Tipo: ${feedback.tipoFeedback} | Categoría: ${feedback.rolUsuario}`,
            comentarios: comentarios
          };
        }));

        console.log('Feedbacks con comentarios:', feedbacks.value);

      } catch (error) {
        console.error('Error al obtener feedbacks y comentarios:', error);
      }
    };

    const enviarComentario = async (feedbackId, usuarioId) => {
      try {
        const comentarioFeedbackDto = {
          contenido: nuevoComentario.value[feedbackId],
          usuarioId: usuarioId,
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
      return new Date(date).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }).replace(',', '');
    };

    const exportToExcel = () => {
      const worksheetData = feedbacks.value.map(feedback => ({
        'ID Feedback': feedback.idFeedback,
        'Nombre Usuario': feedback.nombreUsuario,
        'Info': feedback.info,
        'Fecha Creación': formatDate(feedback.fechaCreacionFeedback),
        'Descripción': feedback.descripcionFeedback,
        'Comentarios': feedback.comentarios.map(com => `${com.autor}: ${com.contenido}`).join('\n')
      }));

      const worksheet = XLSX.utils.json_to_sheet(worksheetData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Feedbacks');
      XLSX.writeFile(workbook, 'feedbacks.xlsx');
    };

    const exportToPDF = () => {
      const doc = new jsPDF();
      const tableData = feedbacks.value.map(feedback => [
        feedback.idFeedback,
        feedback.nombreUsuario,
        feedback.info,
        formatDate(feedback.fechaCreacionFeedback),
        feedback.descripcionFeedback,
        feedback.comentarios.map(com => `${com.autor}: ${com.contenido}`).join('\n')
      ]);

      autoTable(doc, {
        head: [['ID Feedback', 'Nombre Usuario', 'Info', 'Fecha Creación', 'Descripción', 'Comentarios']],
        body: tableData
      });

      doc.save('feedbacks.pdf');
    };

    const cargarFeedbacks = () => {
      obtenerFeedbacks();
    };

    return {
      feedbacks,
      nuevoComentario,
      enviarComentario,
      cargarFeedbacks,
      formatDate,
      exportToExcel,
      exportToPDF
    };
  }
}
</script>

<style scoped>
.feedbacks-container {
  background-color: #F1F1F2;
  padding: 20px;
  min-height: 100vh;
}

.feedback-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.feedback-header button {
  margin: 5px;
  flex: 1 1 100%;
}

button {
  display: block;
  width: 60%;
  padding: 10px;
  background-color: #e62e2e;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1em;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

button:hover {
  background-color: #c1272d;
  transform: scale(1.05);
}

.feedback-item {
  border: 4px solid #525151;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 1250px;
  margin: 20px auto;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.user-info div {
  flex-grow: 1;
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

.input-comment-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-comment-section input {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
}

.input-comment-section button {
  padding: 10px;
  background-color: #1e201e;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

@media (min-width: 768px) {
  .feedback-header {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .feedback-header button {
    flex: 1;
    margin: 0 5px; /* Espaciado entre los botones */
    width: auto; /* Asegura que no tome el 100% del ancho */
  }

  .input-comment-section {
    flex-direction: row;
  }

  .input-comment-section input {
    width: calc(100% - 120px);
    margin-right: 10px;
    margin-top: 0;
  }

  .input-comment-section button {
    margin-top: 0;
  }
}
</style>