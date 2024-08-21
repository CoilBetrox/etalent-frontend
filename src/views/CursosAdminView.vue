<template>
  <div class="page-background">
    <div class="image-container">
        <img src="@/assets/logo eta-rm.png" alt="ETARM" class="icon-image2">
      </div> 
  <div class="cursos-admin-view">
    <main >  
       <div class="d-flex justify-content-center align-items-center">
  <button @click="mostrarModalAgregarCurso" class="btn btn-secondary mb-3"> 
      Agregar Curso
  </button>

  <!-- <img src="@/assets/imagen pdf.png" alt="PDF" class="icon-image1 mx-2"> -->
  <!--<img src="@/assets/imagen excel(1).png" alt="Excel" class="icon-image mx-2"> --> 

  </div>
      <div class="cursos-admin-content">
        <div class="cursos-list">
          <h1 class="titulo-curso">Cursos</h1>
          <div v-for="curso in cursos" :key="curso.idCursoUsuario" class="curso-item">
            <div class="curso-info">
              <h3>{{ curso.nombreCursoUsuario }}</h3>
              <p>{{ curso.descripcionCurso }}</p>
              <p>Fecha Inicio: {{ curso.fechaInicio }}</p>
              <p>Fecha Fin: {{ curso.fechaFin }}</p>
              <p>Avance Curso: {{ curso.avanceCurso }} %</p>
              <p>Estado Curso: {{ curso.estadoCurso }}</p>
            </div>
            <div class="curso-actions">
              <button @click="seleccionarCurso(curso)" class="btn btn-gris1" >Seleccionar</button>
              <select v-model="curso.nuevoAvance" class="btn btn-gris0">
                <option value="0">0</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="40">40</option>
                <option value="60">60</option>
                <option value="80">80</option>
                <option value="100">100</option>
              </select>
              <select v-model="curso.nuevoEstado" class="btn btn-gris0">
                <option value="Activo">Activo</option>
                <option value="Detenido">Detenido</option>
                <option value="Completo">Completo</option>
              </select>
              <button @click="actualizaCurso(curso)" class="btn btn-gris1">Actualizar</button>
            </div>
          </div>
        </div>

        <div ref="cursosIntegrantes" class="cursos-integrantes">
          <h1 v-if="cursoSeleccionado" class="titulo-integrantes0">Integrantes del curso: {{ cursoSeleccionado.nombre }}</h1>
          <h1 v-else class="titulo-integrantes">Integrantes</h1>

          <div v-if="usuarios && usuarios.length > 0">
            <div v-for="usuario in usuarios" :key="usuario.idUsuario" class="curso-item">
              <div class="curso-info">
                <p><strong>Nombre:</strong> {{ usuario.nombreUsuario }}</p>
                <p><strong>SAP:</strong> {{ usuario.sapUsuario }}</p>
                <p> {{ usuario.correoUsuario }}</p>
                <p> {{ usuario.cargoUsuario }}</p>
                <p>{{ usuario.zonaUsuario }}</p>
                <p>{{ usuario.empresaUsuario }}</p>
                <p> {{ usuario.tiendaUsuario }}</p>
                <p> {{ usuario.jornadaUsuario }}</p>
              </div>
            </div>
          </div>
          <p v-else-if="cursoSeleccionado" class="no-usuarios">No hay usuarios asignados a este curso.</p>
          <p v-else class="titulo-seleccione">Seleccione un curso para ver sus integrantes.</p>
        </div>
      </div>
     </main>

    <AgregarCursoComp v-if="showCursosModal" @close="cerrarCursosModal" @curso-agregado="cargarCursos" />
  </div>
  </div>
</template>

<script>
import AgregarCursoComp from '@/components/AgregarCursoComp.vue';
import AdminService from '@/services/AdminService';

export default {
  components: {
    AgregarCursoComp,
  },
  data() {
    return {
      cursos: [],
      usuarios: [], // Aquí se almacenan los cursos obtenidos desde el backend
      showCursosModal: false,
    };
  },
  methods: {
    mostrarModalAgregarCurso() {
      this.showCursosModal = true;
    },
    async cargarCursos() {
      try {
        const response = await AdminService.mostrarCursosAll();
        this.cursos = response.map(curso => ({
          ...curso,
          fechaInicio: this.formatDate(curso.fechaInicio),
          fechaFin: this.formatDate(curso.fechaFin),
          nuevoAvance: curso.avanceCurso,
          nuevoEstado: curso.estadoCurso
        }));
        console.log(response);
      } catch (error) {
        console.error('Error al cargar cursos:', error);
      }
    },
    formatDate(fecha) {
      const date = new Date(fecha);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript son 0-11
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },

    async seleccionarCurso(curso) {
      try {
        const response = await AdminService.mostrarIntegrantesCurso(curso.idCursoUsuario);
        const cursoData = response.data || response;
        console.log(cursoData)
        this.usuarios = cursoData.usuarios;
        this.cursoSeleccionado = {
          id: cursoData.idCursoUsuario,
          nombre: cursoData.nombreCursoUsuario
        };
        
         // Añadir clase para la animación
          const cursoIntegrantes = this.$refs.cursosIntegrantes;
          cursoIntegrantes.classList.remove('fadeIn');  // Elimina cualquier animación anterior
          void cursoIntegrantes.offsetWidth;           // Fuerza un reflow para reiniciar la animación
          cursoIntegrantes.classList.add('fadeIn');    // Añade la clase para la nueva animación

      } catch (error) {
        console.error('Error al seleccionar curso:', error);
        this.usuarios = [];
        this.cursoSeleccionado = null;
      }
    },
    async eliminarCurso(cursoId) {
      try {
        await axios.delete(`/api/cursos/${cursoId}`);
        this.cargarCursos(); // Recargar la lista de cursos después de eliminar
      } catch (error) {
        console.error('Error al eliminar curso:', error);
      }
    },
    cerrarCursosModal() {
      this.showCursosModal = false;
    },
    async actualizaCurso(curso){
      try {
        const updatedCursoUsuarioDto = {
          avanceCurso: curso.nuevoAvance,
          estadoCurso: curso.nuevoEstado
        };
        await AdminService.updateCursoUsuario(curso.idCursoUsuario, updatedCursoUsuarioDto);
        console.log('Cuso acualizado con éxito');
        await this.cargarCursos();
      } catch (error) {
        console.error('Error al actualizar curso:', error);
      }
    }
  },
  mounted() {
    this.cargarCursos(); // Cargar los cursos cuando se monta la vista
  },
};
</script>

<style scoped>

.page-background {
  background-color: #F1F1F2; /* Color de fondo claro para toda la página */
  min-height: 100vh; /* Asegura que el contenedor abarque toda la altura de la ventana */
  padding: -100%; /* Espaciado alrededor del contenido */
  animation: backgroundShift 10s ease-in-out infinite;
}


.d-flex {
  margin-top: -100px; /* Ajusta el valor según necesites */
  margin-left: auto;
  margin-right: auto;
  width: fit-content; /* O ajusta el ancho según lo necesites */
}

.icon-image, .icon-image1 {
  width: 80px;
  height: 80px;
  margin: 0 10px;
  cursor: pointer;
  transition: transform 0.3s;
}

.icon-image:hover, .icon-image1:hover {
  transform: scale(1.1);
}

.image-container {
  display: flex;
  justify-content: flex-end; /* Alinea el contenido al final del contenedor */
}

.icon-image2 {
  width: 120px; /* Ajusta el tamaño según sea necesario */
  height: auto; /* Mantiene la relación de aspecto */
  margin: 10px;
  
} 

.titulo-curso {
  margin-left: 100px; /* Ajusta este valor según el desplazamiento que desees */
  font-family: 'Roboto', sans-serif; /* Fuente moderna */
  font-size: 2.5rem; /* Tamaño del texto */
  font-weight: bold; /* Peso de la fuente */
  color: #161515; /* Color del texto */
}

.titulo-integrantes0 {
  margin-left: 10%; /* Empuja el texto hacia la derecha */
  margin-right: 0%; /* Ajusta este valor según la separación deseada desde el borde derecho */
  text-align: right; /* Alinea el texto a la derecha */
  width: auto; /* Ajusta el ancho automáticamente para adaptarse al contenido */
  display: block; /* Usa bloque para asegurar que el texto se comporte como un bloque */
  white-space: nowrap; /* Evita que el texto se divida en varias líneas */

  /* DISEÑO LETRAS*/
  font-family: 'Arial', sans-serif; /* Cambia la fuente según tus preferencias */
  font-size: 2.6rem; /* Tamaño del texto */
  font-weight: bold; /* Peso de la fuente */
  color: #111010; /* Color del texto */
}

.cursos-integrantes {
  margin-left: 700px;
  width: 25%; /* Ajusta el ancho del cuadro según sea necesario */
  max-width: 1000px; /* Limita el ancho máximo del cuadro */
  height: 80%; /* Permite que la altura se ajuste automáticamente al contenido */
  min-height: 200px; /* Establece una altura mínima si es necesario */
  transition: all 0.3s ease; /* Transición suave para cualquier cambio */
  /* Otros estilos existentes */

}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px); /* Inicia un poco más arriba */
  }
  to {
    opacity: 1;
    transform: translateY(0); /* Termina en su posición original */
  }
}

.fadeIn {
  animation: fadeIn 1s ease-in-out; /* Duración de 1 segundo, ajustable */
}


.titulo-integrantes {
  margin-left: 160px; /* Ajusta este valor según lo necesites */
  margin-bottom: 50px; /* Ajusta este valor para aumentar el espacio entre el texto y el cuadro de información */
  white-space: nowrap; /* Evita que el texto se divida en varias líneas */
  overflow: hidden; /* Esconde el texto que se salga del contenedor */
  text-overflow: ellipsis; /* Añade puntos suspensivos si el texto es demasiado largo */
  text-align: center; /* Centra el texto horizontalmente */
  width: 100%; /* Asegura que el ancho ocupe todo el contenedor */

    /* DISEÑO LETRAS*/
  font-family: 'Arial', sans-serif; /* Cambia la fuente según tus preferencias */
  font-size: 2.5rem; /* Tamaño del texto */
  font-weight: bold; /* Peso de la fuente */
  color: #070707; /* Color del texto */
}

.titulo-seleccione {
  display: flex;
  justify-content: flex-start; /* Alinea el texto hacia la derecha */
  margin-left: 160px; /* Puedes ajustar este valor según la alineación que desees */
  width: 250%; /* Asegura que el contenedor ocupe todo el ancho disponible */
  white-space: nowrap; /* Evita que el texto se divida en varias líneas */
  overflow: hidden; /* Esconde el texto que se salga del contenedor */
  text-overflow: ellipsis; /* Añade puntos suspensivos si el texto es demasiado largo */
   
  /* DISEÑO LETRAS*/
  font-family: 'Arial', sans-serif; /* Cambia la fuente según tus preferencias */
  font-size: 1.5rem; /* Tamaño del texto */
  color: #555; /* Color del texto */

}

.no-usuarios {
  margin-left: 30px;
  text-align: center; /* Centra el texto horizontalmente */
  width: 250%; /* Asegura que el ancho ocupe todo el contenedor */
  display: flex;
  justify-content: center; /* Centra horizontalmente */
  align-items: center; /* Centra verticalmente */
  height: 100%; /* Asegura que el contenedor ocupe toda la altura disponible */
  padding-top: 60px; /* Ajusta este valor para subir el texto un poco más si es necesario */

  /* Añadir animación */
  animation: fadeIn 1s ease-in-out;

  /* Estilo del texto */
  font-family: 'Arial', sans-serif; /* Cambia la fuente según tus preferencias */
  font-size: 1.5rem; /* Tamaño del texto */
  font-weight: bold; /* Peso de la fuente */
  color: #d81111; /* Color del texto */
  background-color: #f8d7da; /* Fondo suave rojo */
  border: 1px solid #f5c6cb; /* Borde rojo */
  border-radius: 10px; /* Bordes redondeados */
  padding: 20px; /* Espaciado interno */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Sombra sutil */
}

/* Añadir keyframes para la animación */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-50px); /* Inicia un poco más arriba */
  }
  to {
    opacity: 1;
    transform: translateY(0); /* Termina en su posición original */
  }
}

 
.cursos-admin-view {
  padding: 20px;
  width: 90%; /* Ajusta el ancho según lo necesites */
  margin: 0 auto; /* Centra el contenedor horizontalmente */

}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.curso-item {
  animation: fadeIn 0.5s ease-in-out;
}

.curso-item {
  background: #cccac9; /* Fondo blanco para el cuadro */
  border-radius: 100px; /* Bordes redondeados */
  box-shadow: 0 10px 10px rgba(231, 20, 20, 0.1); /* Sombra sutil */
  padding: 35px; /* Espaciado interno */
  margin-bottom: 25px; /* Espaciado inferior */
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(350% - 50px); /* Ajusta el ancho */
  text-align: center; /* Centra el texto horizontalmente */
  animation: fadeIn 0.5s ease-in-out;
}



.curso-item:hover {
  background-color: #e0e0e0;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px);
  transition: all 0.3s ease;
}


.cursos-admin-content {
  display: flex;
  width: 50%;
}

.curso-info, .usuario-info {
  
  font-family: 'Verdana', sans-serif;
  font-size: 1rem;
  color: #000000;
  text-align: left;
}

.curso-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}



.btn-gris0 {
    background-color: #524c4c; /* Ajusta el tono de gris según tus preferencias */
    color: #fafafa;
    margin-left: 0px; /* Ajusta este valor según cuánto desees mover los botones a la derecha */
    }

.btn-gris1 {
  background-color: #C20E1A; /* Ajusta el tono de gris según tus preferencias */
  color: #fffafa;

}

.btn {
  border-radius: 5px;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.btn:hover {
  transform: scale(1.05);
  background-color: #080707;
}

.form-select {
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ced4da;
}

strong {
  font-weight: bold; /* Aplica negrilla al texto */
}


</style>
