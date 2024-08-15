<template>
  <div class="feedbacks-container">
    <div class="feedback-header">
      <button @click="cargarFeedbacks">Cargar Feedbacks</button>
      <button @click="exportToExcel">Exportar a Excel</button>
      <button @click="exportToPDF">Exportar a PDF</button>
    </div>
    <div v-if="feedbacks.length === 0">
      <p>No hay feedbacks disponibles.</p>
    </div>
    <div v-else>
      <div v-for="feedback in feedbacks" :key="feedback.idFeedback" class="feedback-item">
        <div class="user-info">
          <!-- 
          <img :src="feedback.avatarUrl" alt="User avatar" class="avatar">
          -->
          <div>
            <h3>{{ feedback.nombreUsuario }}</h3>
            <p>{{ feedback.info }}</p>
            <p>{{ feedback.nombreAdmin }}</p>
          </div>
        </div>
        <p class="feedback-date">{{ formatDate(feedback.fechaCreacionFeedback) }}</p>
        <p class="feedback-content">{{ feedback.descripcionFeedback }}</p>
        <div v-for="comentario in feedback.comentarios" :key="comentario.id" class="comentario">
          <h4>{{ comentario.autor }}</h4>
          <p>{{ comentario.contenido }}</p>
        </div>
        <input v-model="nuevoComentario[feedback.idFeedback]" placeholder="Añadir comentario...">
        <button @click="enviarComentario(feedback.idFeedback, feedback.usuarioId)">Enviar Comentario</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
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
            info: `${feedback.sapUsuario} | ${feedback.tipoFeedback} | ${feedback.rolUsuario}`,
            comentarios: comentarios
          };
        }));

        console.log('Feedbacks con comentarios:', feedbacks.value);


        /*
        const comentariosResponse = await AdminService.getComentarios();
        
        console.log('Respuesta de feedbacks:', feedbacksResponse);
        console.log('Respuesta de comentarios:', comentariosResponse);

        if (Array.isArray(comentariosResponse)) {
          feedbacks.value = feedbacksResponse.map(feedback => {
            const comentariosFiltrados = comentariosResponse.filter(c => c.feedbackId === feedback.idFeedback);
            return {
              idFeedback: feedback.idFeedback,
              nombreUsuario: feedback.nombreUsuario,
              info: `${feedback.sapUsuario} | ${feedback.tipoFeedback} | ${feedback.rolUsuario}`,
              nombreAdmin: feedback.nombreAdmin,
              fechaCreacionFeedback: feedback.fechaCreacionFeedback,
              descripcionFeedback: feedback.descripcionFeedback,
              usuarioId: feedback.usuarioId,
              comentarios: comentariosFiltrados
            };
          });
        } else {
          console.error('La respuesta de feedbacks o comentarios no es un array:', feedbacksResponse, comentariosResponse);
        }
        */
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