<template>
    <div class="page-background">
      <div class="image-container">
        <div class="export-buttons">
          <button @click="exportToExcel">
      <img src="@/assets/imagen excel(1).png" alt="Excel Icon" class="imagen1" />
          </button>
          <button @click="exportToPDF">
      <img src="@/assets/imagen pdf.png" alt="PDF Icon" class="imagen2"/>
          </button>
        </div>
      </div>
  <div class="feedbacks-container">
    <div class="feedback-header">
      <div class="title-section">
        <div class="filters">   
        </div>
      </div>
    </div>

    <div v-for="feedback in feedbacks" :key="feedback.idFeedback" class="feedback-item">
      <div class="user-info">
        <div class="user-details">
          <h3> <img src="@/assets/Recurso 5.png" alt="User Icon" class="user-icon" />
            {{ feedback.nombreUsuario }}</h3>
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

.user-icon {
  width: 200px; /* Ajusta el tamaño según tus necesidades */
  height: auto;
  margin-right: 10px; /* Espacio entre la imagen y el nombre */
  margin-left: 10px;
}


.feedbacks-container{
margin-top: -50px;
opacity: 0;
  animation: fadeInUp 1s ease-out forwards;
  animation-delay: 0.2s;

}

.page-background {
  background-color: #F1F1F2; /* Color de fondo claro para toda la página */
  min-height: 100vh; /* Asegura que el contenedor abarque toda la altura de la ventana */
  padding: 0%; /* Espaciado alrededor del contenido */
}

.image-container {
  display: flex; /* Utilizamos flexbox para alinear las imágenes */
  justify-content: center; /* Centra las imágenes horizontalmente */
  margin-bottom: 20px; /* Espacio debajo del contenedor de imágenes */
}

.imagen1{
width: 200px;
height: auto; /* Mantiene la proporción original */
margin: 0 10px; /* Elimina cualquier margen alrededor de las imágenes */
}

.imagen2{
width: 0px;
height: auto; /* Mantiene la proporción original */
margin: 0 10px; /* Elimina cualquier margen alrededor de las imágenes */
}


.feedback-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -20px;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px); /* Comienza 20px más abajo */
  }
  to {
    opacity: 1;
    transform: translateY(0); /* Llega a su posición final */
  }
}

.feedback-item {
  background-color: #cccac9; /* Color de fondo */
  border: 3.5px solid #222020; /* Bordes */
  padding: 15px;
  border-radius: 15px;
  width: 80%; /* Ajusta el ancho según tus necesidades */
  max-width: 1250px; /* Limita el ancho máximo para pantallas grandes */
  margin: 40px auto; /* Centramos el cuadro */
  box-shadow: 0px 27px 10px rgba(0, 0, 0, 0.1); /* Sombra suave */
  transform: translateX(-100%); /* Empieza fuera de la pantalla a la izquierda */
  animation: slideInFromSides 1s ease-out forwards;
  animation-delay: 0.4s; /* Delay para un efecto más dinámico */
  transition: transform 0.6s ease, box-shadow 0.3s ease;
}

@keyframes slideInFromSides {
  0% {
    opacity: 0;
    transform: translateX(-100%); /* Empieza fuera de la pantalla a la izquierda */
  }
  50% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    transform: translateX(0);
  }
}

.feedback-item:nth-child(even) {
  transform: translateX(100%); /* Para los cuadros pares, empiezan fuera de la pantalla a la derecha */
  animation: slideInFromSidesRight 1s ease-out forwards;
}

@keyframes slideInFromSidesRight {
  0% {
    opacity: 0;
    transform: translateX(100%); /* Empieza fuera de la pantalla a la derecha */
  }
  50% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    transform: translateX(0);
  }
}


.feedback-item:hover {
  transform: translateY(-10px); /* Elevar el cuadro al pasar el mouse */
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3); /* Sombra más pronunciada al pasar el mouse */
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
  transition: transform 0.3s ease; /* Transición para el botón */
}

.export-buttons button:hover {
  transform: scale(1.1); /* Aumenta el tamaño de los botones de exportación al pasar el mouse */
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95); /* Comienza ligeramente más pequeño */
  }
  to {
    opacity: 1;
    transform: scale(1); /* Llega a su tamaño normal */
  }
}

.export-buttons img {
  width: 50px;
  height: 50px;
  opacity: 0; /* Empieza invisible */
  animation: fadeIn 0.6s ease-out forwards;
  animation-delay: 0.4s; /* Diferente delay para un efecto más dinámico */
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
  background-color: #6e6767; /* Color gris oscuro (puedes ajustar el valor hexadecimal si lo deseas) */
  color: white; 
  transition: background-color 0.3s ease, transform 0.3s ease; /* Transición para el color de fondo */
}

.add-comment button:hover {
  background-color: #495057; /* Cambia a un tono más oscuro al pasar el mouse */
  transform: scale(1.05); /* Aumenta ligeramente el tamaño del botón */
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

body {
  font-family: 'Roboto', sans-serif; /* Fuente limpia y moderna */
  color: #333; /* Texto oscuro para mejor legibilidad */
}

h3 {
  font-family: 'Playfair Display', serif; /* Título elegante */
  font-weight: bold;
  color: #1f1a1a;
  text-align: center;
}

p {
  font-family: 'Open Sans', sans-serif; /* Fuente más ligera para los párrafos */
  color: #080606;
}
.comentario {
  background-color: #ca9da1;
  padding: 3px;
  margin-top: 10px;
  border-radius: 6px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.comentario:hover {
  transform: translateX(15px);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}
</style>