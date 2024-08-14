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
              <p>Avance Curso: {{ curso.avanceCurso }} %</p>
              <p>Estado Curso: {{ curso.estadoCurso }}</p>
            </div>
            <div class="curso-actions">
              <button @click="seleccionarCurso(curso)">Seleccionar</button>
              <select v-model="curso.nuevoAvance">
                <option value="0">0</option>
                <option value="10">10</option>
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
            </div>
          </div>
        </div>

        <div class="cursos-integrantes">
          <h1 v-if="cursoSeleccionado">Integrantes del Curso: {{ cursoSeleccionado.nombre }}</h1>
          <h1 v-else>Integrantes del Curso</h1>

          <div v-if="usuarios && usuarios.length > 0">
            <div v-for="usuario in usuarios" :key="usuario.idUsuario" class="curso-item">
              <div class="curso-info">
                <p>{{ usuario.nombreUsuario }}</p>
                <p>{{ usuario.sapUsuario }}</p>
                <p>{{ usuario.correoUsuario }}</p>
                <p>{{ usuario.cargoUsuario }}</p>
                <p>{{ usuario.zonaUsuario }}</p>
                <p>{{ usuario.empresaUsuario }}</p>
                <p>{{ usuario.tiendaUsuario }}</p>
                <p>{{ usuario.jornadaUsuario }}</p>
              </div>
            </div>
          </div>
          <p v-else-if="cursoSeleccionado">No hay usuarios asignados a este curso.</p>
          <p v-else>Seleccione un curso para ver sus integrantes.</p>
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
          nuevoAvance: curso.avanceCurso,
          nuevoEstado: curso.estadoCurso
        }));
        console.log(response);
      } catch (error) {
        console.error('Error al cargar cursos:', error);
      }
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
  display: flex;
  width: 50%;
}

.curso-info {
  flex: 2;
}

.curso-actions {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

</style>
