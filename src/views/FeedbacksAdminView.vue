<template>
    <div class="page-background">
  <div class="feedbacks-container">
    <div class="feedback-header">
      <div class="title-section">
        <div class="filters">   
        </div>
      </div>
      <div class="export-buttons">
        <button @click="exportToExcel">
          <img src="@/assets/imagen excel(1).png" alt="Excel Icon" />
        </button>
        <button @click="exportToPDF">
          <img src="@/assets/imagen pdf.png" alt="PDF Icon" />
        </button>
      </div>
    </div>

    <div v-for="feedback in feedbacks" :key="feedback.idFeedback" class="feedback-item">
      <div class="user-info">
        <div class="user-details">
          <h3>{{ feedback.nombreUsuario }}</h3>
          <p>{{ feedback.info }}</p>
          <p>
            Feedback creado por: {{ feedback.nombreAdmin }} -
            {{ formatDate(feedback.fechaCreacionFeedback) }}
          </p> 
        </div>
      </div>
      <p class="feedback-content">{{ feedback.descripcionFeedback }}</p>

      <div v-for="comentario in feedback.comentarios" :key="comentario.id" class="comentario">
        <p><strong>{{ comentario.nombreAdmin }}</strong></p>
        
        <div class="comment-header">
          <strong class="admin-name">{{ comentario.autor }}</strong> 
        </div>
        <p>{{ comentario.contenido }}</p>
      </div>

      <div class="add-comment">
        <textarea id="newComment" v-model="nuevoComentario[feedback.idFeedback]" placeholder="Agregar comentario..."></textarea>
        <button @click="enviarComentario(feedback.idFeedback, feedback.usuarioId)">Enviar Comentario</button>
      </div>
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
        const comentariosResponse = await AdminService.getComentarios();
        
        console.log('Respuesta de feedbacks:', feedbacksResponse);
        console.log('Respuesta de comentarios:', comentariosResponse);

        if (Array.isArray(feedbacksResponse) && Array.isArray(comentariosResponse)) {
          feedbacks.value = feedbacksResponse.map(feedback => ({
            idFeedback: feedback.idFeedback,
            nombreUsuario: feedback.nombreUsuario,
            info: `${feedback.sapUsuario} | ${feedback.tipoFeedback} | ${feedback.rolUsuario}`,
            nombreAdmin: feedback.nombreAdmin,
            fechaCreacionFeedback: feedback.fechaCreacionFeedback,
            descripcionFeedback: feedback.descripcionFeedback,
            usuarioId: feedback.usuarioId,
            comentarios: comentariosResponse.filter(c => c.feedbackId === feedback.idFeedback)
          }));
        } else {
          console.error('La respuesta de feedbacks o comentarios no es un array:', feedbacksResponse, comentariosResponse);
        }
      } catch (error) {
        console.error('Error al obtener feedbacks y comentarios:', error);
      }
    };

    const enviarComentario = async (feedbackId, usuarioId) => {
  try {
    // Validación para evitar comentarios vacíos
    if (nuevoComentario.value[feedbackId].trim() === '') {
      alert('Por favor, ingresa un comentario antes de enviar.'); 
      return; // Detener la función si el comentario está vacío
    }

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


    onMounted(obtenerFeedbacks);

    return {
      feedbacks,
      nuevoComentario,
      enviarComentario,
      formatDate,
      exportToExcel,
      exportToPDF
    };
  }
}
</script>

<style scoped>

.page-background {
  background-color: #F1F1F2; /* Color de fondo claro para toda la página */
  min-height: 100vh; /* Asegura que el contenedor abarque toda la altura de la ventana */
  padding: -100%; /* Espaciado alrededor del contenido */
}

.feedback-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.feedback-item {
  border: 4px solid #525151; /* Add a border */ 
  padding: 15px; 
  margin-bottom: 19px;
  border-radius: 10px;
  width: 80%; /* Ajusta el ancho según tus necesidades */
  max-width: 1250px; /* Limita el ancho máximo para pantallas grandes */
  margin: 20px auto; /* Centramos el cuadro con márgenes automáticos */

}
.title-section {
  display: flex;
  align-items: center;
}

.title-section h1 {
  margin-right: 20px;
}

.filters {
  display: flex;
  align-items: center;
}

.filters select,
.filters input {
  margin-right: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.filters button {
  padding: 8px 15px;
  background-color: #007bff; /* Example blue color */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.export-buttons button {
  background: 10px;
  border: none;
  padding: 0;
  cursor: pointer;
  margin-left: 20px;
  min-height: 10vh;
}

.export-buttons img {
  width: 50px;
  height: 50px;
}

.user-details {
  flex-grow: 1; /* Allow user details to take up available space */
}

.user-details p {
  margin: 5px 0; /* Adjust margin for better spacing */
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.comment-date {
  font-size: 0.8em;
  color: #888;
}

.add-comment {
  margin-top: 15px;
  border-top: 1px solid #cac3c3;
  padding-top: 20px;
  display: flex;           /* Usamos flexbox para alinear */
  flex-direction: column;  /* Colocamos los elementos en columna */
  align-items: center;     /* Centramos horizontalmente */
}


.add-comment button {
  /* ... tus estilos existentes ... */
  background-color: #343a40; /* Color gris oscuro (puedes ajustar el valor hexadecimal si lo deseas) */
  color: white; 
}

.add-comment label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  text-align: left; /* Alineamos el texto a la izquierda */

}


.add-comment textarea {
  width: 80%;
  height: 80px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  margin-bottom: 10px;
}
</style>