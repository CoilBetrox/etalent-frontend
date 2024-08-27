<template>
  <div class="cursos-admin-view">
    <main>

      <div class="btn-agrega-content">
        <button @click="mostrarModalAgregarCurso" class="btn btn-primary mb-3 btn-cursos">
          Agregar Curso
        </button>
      </div>
      <div class="cursos-admin-content">
        <div class="cursos-list">
          <h1>Cursos</h1>
          <div v-for="curso in cursos" :key="curso.idCursoUsuario" class="curso-item">
            <div class="curso-info">
              <h3> {{ curso.nombreCursoUsuario }}</h3>
              <p>{{ curso.descripcionCurso }}</p>
              <p><strong>Fecha Inicio:</strong> {{ formatDate(curso.fechaInicio) }}</p>
              <p><strong>Fecha Fin:</strong> {{ formatDate(curso.fechaFin) }}</p>
              <p><strong>Avance Curso:</strong> {{ curso.avanceCurso }} %</p>
              <p><strong>Estado Curso:</strong> {{ curso.estadoCurso }}</p>
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

        <div class="cursos-integrantes" ref="cursosIntegrantes">
          <h1 v-if="cursoSeleccionado">Integrantes del Curso: <h3>{{ cursoSeleccionado.nombre }}</h3></h1>
          <h1 v-else>Integrantes del Curso</h1>

          <div v-if="usuarios && usuarios.length > 0">
            <div v-for="usuario in usuarios" :key="usuario.idUsuario" class="curso-item">
              <div class="curso-info">
                <p><strong>Nombre:</strong> {{ usuario.nombreUsuario }}</p>
                <p><strong>Sap:</strong> {{ usuario.sapUsuario }}</p>
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
        this.$nextTick(() => {
          this.$refs.cursosIntegrantes.scrollIntoView({ behavior: 'smooth' });
        });
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
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }).replace(',', '');
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
  border: 4px solid #525151;
  padding: 1rem 3rem;
  border-radius: 10px;
  margin: 1rem 1rem;
  display: flex;
  align-items: center;
}

.cursos-admin-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.curso-info {
  flex: 2;
}

.curso-actions {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.cursos-list {
  flex: 1;
}

.cursos-integrantes {
  flex: 1;
  background-color: #f0f0f0;
}

button {
  background-color: #333;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.btn-cursos {
  display: block;
  padding: 10px;
  background-color: #e62e2e;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.btn-cursos:hover {
  background-color: #c1272d;
  transform: scale(1.05);
}

.btn-agrega-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}


@media(max-width: 768px) {
  .cursos-admin-content {
    display: flex;
    flex-direction: column;
  }
}

</style>