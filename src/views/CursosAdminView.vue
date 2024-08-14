<template>
  <div class="cursos-admin-view">
    <main>

      <button @click="mostrarModalAgregarCurso" class="btn btn-primary mb-3">
        Agregar Curso
      </button>
      <div class="cursos-admin-content">
        <div class="cursos-list">
          <h1>Cursos</h1>
          <div v-for="curso in cursos" :key="curso.idCursoUsuario" class="curso-item">
            <div class="curso-info">
              <h3>{{ curso.nombreCursoUsuario }}</h3>
              <p>{{ curso.descripcionCurso }}</p>
              <p>Fecha Inicio: {{ curso.fechaInicio }}</p>
              <p>Fecha Fin: {{ curso.fechaFin }}</p>
              <p>Avance Curso: {{ curso.avanceCurso }}</p>
              <p>Estado Curso: {{ curso.estadoCurso }}</p>
            </div>
            <div class="curso-actions">
              <button @click="seleccionarCurso(curso)">Seleccionar</button>
              <select v-model="curso.nuevoAvance">
                <option value="20">20</option>
                <option value="40">40</option>
                <option value="60">60</option>
                <option value="80">80</option>
                <option value="100">100</option>
              </select>
              <select v-model="curso.nuevoEstado">
                <option value="Activo">Activo</option>
                <option value="Detenido">Detenido</option>
                <option value="Completo">Completo</option>
              </select>
              <button @click="actualizaCurso(curso)">Actualizar</button>
              <button @click="eliminarCurso(curso.id)">Eliminar</button>
            </div>
          </div>
        </div>

        <div class="cursos-integrantes">
          <h1>Integrantes Curso</h1>
        </div>

      </div>
    </main>

    <AgregarCursoComp v-if="showCursosModal" @close="cerrarCursosModal" @curso-agregado="cargarCursos" />
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
      cursos: [], // Aquí se almacenan los cursos obtenidos desde el backend
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
        this.cursos = response;
      } catch (error) {
        console.error('Error al cargar cursos:', error);
      }
    },
    async seleccionarCurso(curso) {
      try {
        const response = await axios.get(`/api/cursos/${curso.id}/usuarios`);
        this.usuariosIntegrantes = response.data;
      } catch (error) {
        console.error('Error al seleccionar curso:', error);
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
.cursos-admin-view {
  padding: 20px;
}

.curso-item {
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.cursos-admin-content {
  display: flex
}
</style>
