<template>
  <div class="directorio">
    <FilterComp @filter="buscar" @export-excel="exportToExcel" @export-pdf="exportToPDF" />
    <main>
      <div class="btn-agregar-container">
        <button class="btn-agregar-masivo" @click="abrirAgregarMasivo">Agregar Masivo</button> 
      </div>
      <div class="directorio-content">
        <div class="miembros-list">
          <div class="h2-titulo">
            <h2>Personal</h2>
          </div>
          <div v-for="miembro in miembros" :key="miembro.id" class="miembro-card">
            <div class="miembro-info">
              <p><strong>Nombre:</strong> {{ miembro.nombreUsuario }}</p>
              <p><strong>SAP:</strong> {{ miembro.sapUsuario }}</p>
              <p><strong>Email:</strong> {{ miembro.correoUsuario }}</p>
              <p><strong>Cargo:</strong> {{ miembro.cargoUsuario }}</p>
              <p><strong>Zona:</strong> {{ miembro.zonaUsuario }}</p>
              <p><strong>Empresa:</strong> {{ miembro.empresaUsuario }}</p>
              <p><strong>Tienda:</strong> {{ miembro.tiendaUsuario }}</p>
              <p><strong>Jornada:</strong> {{ miembro.jornadaUsuario }}</p>
              <p><strong>Categoría:</strong> {{ miembro.nombreRolUsuario }}</p>
            </div>
            <div class="miembro-actions">
              <select v-model="miembro.nuevaCategoria">
                <option value="Super Estrella">Super Estrella</option>
                <option value="Alto Potencial">Alto Potencial</option>
                <option value="Estrella Area">Estrella Area</option>
                <option value="Enigma">Enigma</option>
                <option value="Excelente Desempeño">Excelente Desempeño</option>
                <option value="Empleado Clave">Empleado Clave</option>
                <option value="Buen Desempeño">Buen Desempeño</option>
                <option value="Dilema">Dilema</option>
                <option value="Considerar Puesto">Considerar Puesto</option>
              </select>
              <button @click="actualizarMiembro(miembro)">Actualizar</button>
              <button @click="darFeedback(miembro)">Feedback</button>
              <button @click="() => { mostrarCursos(miembro) }">Cursos</button>
              <button @click="eliminarMiembro(miembro)">Eliminar</button>
            </div>
          </div>
        </div>
        <div class="cursos-usuario" ref="cursosUsuario">
          <div class="h2-titulo">
            <h2>Cursos</h2>
          </div>

          <div class="usuario-seleccionado" v-if="usuarioSeleccionado">
            <div class="h3-titulo">
              <h3>{{ usuarioSeleccionado.nombreUsuario }}</h3>
            </div>
            <ul class="usuario-cursos-container">
              <li class="usuario-curso" v-for="curso in usuarioSeleccionado.cursos" :key="curso.idCursoUsuario">
                <p><strong>Curso:</strong> {{ curso.nombreCursoUsuario }}</p>
                <p><strong>Fecha Creación:</strong> {{ formatDate(curso.fechaInicio) }}</p>
                <p><strong>Avance:</strong> {{ curso.avanceCurso }} %</p>
                <p><strong>Estado:</strong> {{ curso.estadoCurso }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
    <AgregarNuevoComp v-if="mostrarFormularioNuevo" @close="cerrarFormularioNuevo"
      @empleado-agregado="cargarMiembros" />
    <AgregarFeedbackComp v-if="showFeedbackModal" :miembro="miembroSeleccionado" @close="cerrarModalFeedback"
      @feedback-registrado="procesarFeedback" />
    <InfoCategoriaComp v-if="mostarFormularioInfo" @close="cerrarFormularioInfo" />
    <AgregarMasivoComp v-if="mostrarFormularioMasivo" @close="cerrarFormularioMasivo" @usuarios-agregados="cargarMiembros" />

  </div>
</template>

<script>
import axios from 'axios';
import AdminService from '@/services/AdminService';
import AgregarNuevoComp from '@/components/AgregarNuevoComp.vue';
import AgregarFeedbackComp from '@/components/AgregarFeedbackComp.vue';
import InfoCategoriaComp from '@/components/InfoCategoriaComp.vue';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import FilterComp from '@/components/FilterComp.vue';
import AgregarMasivoComp from '@/components/AgregarMasivoComp.vue';

export default {
  name: 'Directorio',
  components: {
    AdminService,
    AgregarFeedbackComp,
    FilterComp,
    AgregarNuevoComp,
    InfoCategoriaComp,
    AgregarMasivoComp,
  },
  data() {
    return {
      miembros: [],
      filters: {
        idUsuario: '',
        nombreUsuario: '',
        sapUsuario: '',
        correoUsuario: '',
        cargoUsuario: '',
        zonaUsuario: '',
        empresaUsuario: '',
        tiendaUsuario: '',
        jornadaUsuario: '',
        nombreRolUsuario: ''
      },
      showFeedbackModal: false,
      miembroSeleccionado: null,
      mostrarFormularioNuevo: false,
      mostarFormularioInfo: false,
      mostrarFormularioMasivo: false,
      usuarioSeleccionado: null,
      currentDate: new Date().toLocaleString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
  },
  mounted() {
    this.cargarMiembros();

    console.log('-------');
    const accessToken = localStorage.getItem('accessToken');
    const userRole = JSON.parse(localStorage.getItem('userRole'));
    console.log('accessToken:', accessToken);
    console.log('userRole:', userRole);
    console.log('-------');

    if (!accessToken) {
      console.error('AccessToken no encontrado');
      this.$router.push('/login');
    }

  },
  methods: {
    scrollToTopButton() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },
    async cargarMiembros() {
      try {
        const response = await AdminService.getUsuarios();
        this.miembros = await Promise.all(response.map(async usuario => {
          const cursos = await AdminService.getCursosDeUsuario(usuario.idUsuario);
          return {
            idUsuario: usuario.idUsuario,
            nombreUsuario: usuario.nombreUsuario,
            sapUsuario: usuario.sapUsuario,
            correoUsuario: usuario.correoUsuario,
            cargoUsuario: usuario.cargoUsuario,
            zonaUsuario: usuario.zonaUsuario,
            empresaUsuario: usuario.empresaUsuario,
            tiendaUsuario: usuario.tiendaUsuario,
            jornadaUsuario: usuario.jornadaUsuario,
            nombreRolUsuario: usuario.rolUsuario.nombreRolUsuario,
            nuevaCategoria: usuario.rolUsuario.nombreRolUsuario,
            cursos: cursos.data
          };
        }));
      } catch (error) {
        console.error('Error al cargar los miembros:', error);
      }
    },
    async buscar() {
      
    },
    eliminarFiltros() {
      this.filters = {
        nombreUsuario: '',
        correoUsuario: '',
        categoria: ''
      };
      this.cargarMiembros();
    },
    exportToExcel() {
      console.log('Exportar a Excel');
      if (!this.miembros || this.miembros.length === 0) {
        console.error('No hay datos para exportar');
        return;
      }

      try {
        const data = this.miembros.map(m => {
          const cursos = m.cursos ? m.cursos.map(curso => `${curso.nombreCursoUsuario} (${curso.estadoCurso})`).join(', ') : 'Sin cursos';
          return {
            ID: m.idUsuario,
            Nombre: m.nombreUsuario,
            Correo: m.correoUsuario,
            SAP: m.sapUsuario,
            Rol: m.nombreRolUsuario,
            Cursos: cursos
          }
        });

        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Miembros");

        console.log('Generando archivo Excel...');
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], { type: 'application/octet-stream' });

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'miembros_directorio.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
        console.log('Archivo Excel generado y descarga iniciada');
      } catch (error) {
        console.error('Error al exportar a Excel: ', error);
      }
    },
    exportToPDF(value) {
      console.log('Exportar a Excel', value);
      const doc = new jsPDF();
      const tableColumn = ["ID", "Nombre", "Correo", "SAP", "Rol", "Cursos"];
      const tableRows = [];

      this.miembros.forEach(m => {
        const cursos = m.cursos ? m.cursos.map(curso => `${curso.nombreCursoUsuario} (${curso.estadoCurso})`).join(', ') : 'Sin cursos';

        const miembroData = [
          m.idUsuario,
          m.nombreUsuario,
          m.correoUsuario,
          m.sapUsuario,
          m.nombreRolUsuario,
          cursos
        ];
        tableRows.push(miembroData);
      });

      doc.autoTable(tableColumn, tableRows, { startY: 20 });
      doc.text("Directorio de Miembros", 14, 15);
      doc.save(`directorio_miembros_${new Date().toISOString()}.pdf`);
    },
    darFeedback(miembro) {
      this.miembroSeleccionado = miembro;
      this.showFeedbackModal = true;
      // Implementar lógica para dar feedback
    },
    
    cerrarModalFeedback() {
      this.showFeedbackModal = false;
      this.miembroSeleccionado = null;
    },
    async procesarFeedback(feedbackData) {
      try {
        const feedbackDto = {
          descripcionFeedback: feedbackData.texto,
          tipoFeedback: feedbackData.tipo,
          fechaFeedback: new Date().toISOString()
        };
        const response = await AdminService.registrarFedback(feedbackDto, this.miembroSeleccionado.idUsuario);
        console.log('Feedback registrado', response);
        this.cerrarModalFeedback();
        await this.cargarMiembros();

      } catch (error) {
        console.error('Error al procesar feedback:', error);
      }
    },
    async actualizarMiembro(miembro) {
      try {
        const categoriaToIdRol = {
          'Super Estrella': 1,
          'Alto Potencial': 2,
          'Estrella Area': 3,
          'Enigma': 4,
          'Excelente Desempeño': 5,
          'Empleado Clave': 6,
          'Buen Desempeño': 7,
          'Dilema': 8,
          'Considerar Puesto': 9
        };

        const updatedUsuarioDto = {
          rolUsuario: {
            idRolUsuario: categoriaToIdRol[miembro.nuevaCategoria]
          },
          idUsuario: miembro.idUsuario
        };
        console.log(updatedUsuarioDto.rolUsuario);


        if (!updatedUsuarioDto.rolUsuario.idRolUsuario) {
          console.error('Categoría no válida seleccionada');
          return;
        }

        console.log('Actualizando usuario con:', updatedUsuarioDto);

        const response = await AdminService.updateUsuarioRol(miembro.idUsuario, updatedUsuarioDto);
        console.log('Response: ', response)

        const index = this.miembros.findIndex(m => m.idUsuario === miembro.idUsuario);
        if (index !== -1) {
          this.miembros[index] = { ...this.miembros[index], nombreRolUsuario: miembro.nuevaCategoria, ...response };
        }

        await this.cargarMiembros(); // Recargar la lista después de actualizar
      } catch (error) {
        console.error('Error al actualizar miembro:', error);
      }
    },
    async eliminarMiembro(miembro) {
      if (confirm('¿Está seguro de eliminar este usuario?')) {
        try {
          await AdminService.eliminarUsuario(miembro.idUsuario);
          this.cargarMiembros(); // Recargar la lista después de eliminar
        } catch (error) {
          console.error('Error al eliminar miembro:', error);
        }
      }
    },
    async mostrarCursos(miembro) {
      try {
        const response = await AdminService.getCursosDeUsuario(miembro.idUsuario);
        console.log(response.data)
        this.usuarioSeleccionado = {
          ...miembro,
          cursos: response.data
        };
        this.$nextTick(() => {
          this.$refs.cursosUsuario.scrollIntoView({ behavior: 'smooth' });
        });
      } catch (error) {
        console.error('Error al obtener los cursos:', error);
      }
    },
    async cerrarFormularioNuevo() {
      this.mostrarFormularioNuevo = false;
      this.cargarMiembros(); // Recargar la lista después de agregar un nuevo miembro
    },
    cerrarFormularioInfo() {
      this.mostarFormularioInfo = false;
    },
    async abrirAgregarMasivo(){
      console.log('abrirAgregarMasivo llamado');
      this.mostrarFormularioMasivo = true;
    },
    cerrarFormularioMasivo() {
      this.mostrarFormularioMasivo = false;
    },
    usuariosAgregados() {
      this.cerrarFormularioMasivo();
      this.cargarMiembros();
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
  }

};
</script>

<style scoped>
.h2-titulo {
  display: flex;
  justify-content: center;
  margin-bottom: 0%;
}

.h3-titulo {
  display: flex;
  justify-content: center;
  margin-bottom: 0%;
}

.miembro-info p {
  margin-bottom: 0.4rem;
}

.directorio {
  font-family: Arial, sans-serif;
}

header {
  background-color: #000;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav a {
  color: white;
  text-decoration: none;
  margin-right: 1rem;
}

nav a.active {
  font-weight: bold;
}

.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.directorio-content {
  display: flex;
}

.miembros-list {
  flex: 1;
}

.cursos-usuario {
  display: block;
  flex: 1;
  background-color: #f0f0f0;
}

.usuario-curso {
  border-bottom: 1px solid #525151;
  padding-top: 1rem;
}

.miembro-card {
  border: 4px solid #525151;
  border-radius: 10px;
  padding: 1rem 3rem;
  margin: 1rem 1rem;
  display: flex;
  align-items: center;
}

.miembro-foto {
  width: 64px;
  height: 64px;
  background-color: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
}

.miembro-info {
  flex: 2;
}

.miembro-actions {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

button {
  background-color: #333;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.btn-agregar-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

footer {
  background-color: #f1f1f1;
  padding: 1rem;
  text-align: center;
  font-size: 0.8rem;
}

.usuario-seleccionado {
  border: 4px solid #525151;
  border-radius: 10px;
  padding: 1rem 3rem;
  margin: 1rem 1rem;
  display: grid;
}

@media(max-width: 768px) {
  .directorio-content {
    display: flex;
    flex-direction: column;

  }
}

@media screen and (min-width: 768px) {
  .cursos-usuario {
    display: block;
  }
}
</style>