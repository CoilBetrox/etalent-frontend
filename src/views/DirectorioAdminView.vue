<template>
  <div class="directorio">
    <FilterComp @filter="buscar" @export-excel="exportToExcel" @export-pdf="exportToPDF" />
    <main>
      <div class="directorio-content">
        <div class="jefes-tienda">
          <h2>Jefes Tienda</h2>
          <div v-for="admin in admins" :key="admin.idAdmin" class="miembro-card">

            <div class="miembro-info">
              <p>{{ admin.idAdmin }}</p>
              <p>{{ admin.nombreAdmin }}</p>
              <p>{{ admin.sapAdmin }}</p>
              <p>{{ admin.correoAdmin }}</p>
              <p>{{ admin.cargoAdmin }}</p>
              <p>{{ admin.zonaAdmin }}</p>
              <p>{{ admin.empresaAdmin }}</p>

            </div>
            <div class="miembro-actions">
              <button @click="seleccionarAdmin(admin)">Seleccionar</button>
              <button @click="actualizarAdmin(admin)">Actualizar Jefe</button>
              <!-- 
              <button @click="eliminarAdmin(admin)">Eliminar</button>
              -->
            </div>
          </div>
        </div>

        <div class="personal-tienda" v-if="usuarios.length > 0">
          <h2>Personal Tienda</h2>
          <div v-for="usuario in usuarios" :key="usuario.idUsuario" class="miembro-card">

            <div class="miembro-info">
              <p>{{ usuario.nombreUsuario }}</p>
              <p>{{ usuario.sapUsuario }}</p>
              <p>{{ usuario.correoUsuario }}</p>
              <p>{{ usuario.cargoUsuario }}</p>
              <p>{{ usuario.zonaUsuario }}</p>
              <p>{{ usuario.empresaUsuario }}</p>
              <p>{{ usuario.tiendaUsuario }}</p>
              <p>{{ usuario.jornadaUsuario }}</p>
              <p>{{ usuario.rolUsuario.nombreRolUsuario }}</p>
            </div>
            <div class="miembro-actions">
              <select v-model="usuario.nuevaCategoria">
                <option value="Enigma">Enigma</option>
                <option value="Esencial">Esencial</option>
                <option value="Eminente">Eminente</option>
                <option value="Dilema">Dilema</option>
                <option value="Prometedor">Prometedor</option>
                <option value="Experto">Experto</option>
                <option value="Riesgo">Riesgo</option>
                <option value="Destacado">Destacado</option>
                <option value="Sobresaliente">Sobresaliente</option>
              </select>
              <button @click="actualizarMiembro(usuario)">Actualizar</button>
              <button @click="darFeedback(usuario)">Feedback</button>
              <button @click="mostrarCursos(usuario)">Cursos</button>
              <!-- 
              <button @click="eliminarMiembro(usuario)">Eliminar</button>
              -->
            </div>
          </div>
        </div>

        <div class="cursos-usuario" v-if="usuarioSeleccionado">
          <h2>Cursos</h2>
          <div v-if="usuarioSeleccionado">
            <h3>{{ usuarioSeleccionado.nombreUsuario }}</h3>
            <button @click="asignarCurso(usuarioSeleccionado)">Asignar Curso</button>
            <ul>
              <li v-for="curso in usuarioSeleccionado.cursos" :key="curso.idCursoUsuario">
                <p>{{ curso.nombreCursoUsuario }}</p>
                <p>{{ formatDate(curso.fechaInicio) }}</p>
                <p>{{ curso.avanceCurso }} %</p>
                <p>{{ curso.estadoCurso }}</p>
              </li>
            </ul>
          </div>
          <div v-else>
            <p>Seleccione un usuario para ver los cursos asignados.</p>
          </div>
        </div>

      </div>
    </main>
    <AgregarNuevoComp v-if="mostrarFormularioNuevo" @close="cerrarFormularioNuevo" @empleado-agregado="cargarAdmins" />
    <AgregarFeedbackComp v-if="showFeedbackModal" :miembro="miembroSeleccionado" @close="cerrarModalFeedback"
      @feedback-registrado="procesarFeedback" />
    <ActualizarJefeTiendaComp v-if="mostrarAcualizarJefeTienda" @close="cerrarActualizarJefeTienda"
      @success="handleSuccess" />
    <AsignarCursoComp v-if="showAsignarCursoModal" :usuario="usuarioSeleccionado" @close="cerrarModalAsignarCurso"
      @curso-asignado="handleCursoAsignado" />
    <p v-if="mensajeExito" class="success-message">{{ mensajeExito }}</p>
  </div>
</template>

<script>
import AdminService from '@/services/AdminService';
import AgregarNuevoComp from '@/components/AgregarNuevoComp.vue';
import AgregarFeedbackComp from '@/components/AgregarFeedbackComp.vue';
import ActualizarJefeTiendaComp from '@/components/ActualizarJefeTiendaComp.vue';
import AsignarCursoComp from '@/components/AsignarCursoComp.vue';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import FilterComp from '@/components/FilterComp.vue';

export default {
  name: 'DirectorioAdminView',
  components: {
    AgregarNuevoComp,
    AgregarFeedbackComp,
    ActualizarJefeTiendaComp,
    AsignarCursoComp,
    FilterComp
  },
  data() {
    return {
      admins: [],
      usuarios: [],
      filters: {
        nombre: ''
      },
      showFeedbackModal: false,
      miembroSeleccionado: null,
      mostrarFormularioNuevo: false,
      usuarioSeleccionado: null,
      mostrarAcualizarJefeTienda: false,
      mensajeExito: '',
      showAsignarCursoModal: false,
    };
  },
  mounted() {
    this.cargarAdmins();

    AdminService.getUsuariosByAdmin(1).then(usuarios => {
      console.log(usuarios);
    }).catch(error => {
      console.error('Error al cargar los usuarios:', error);
    });
  },
  methods: {
    handleSuccess(mensaje) {
      this.mensajeExito = mensaje;
      this.mostrarAcualizarJefeTienda = false;
      // Ocultar el mensaje después de 3 segundos
      setTimeout(() => {
        this.mensajeExito = '';
      }, 3000);
    },
    async cargarAdmins() {
      try {
        const response = await AdminService.getAdminsByRol();
        this.admins = await Promise.all(response.map(async admin => {
          const usuarios = await AdminService.getUsuariosByAdmin(admin.idAdmin);
          const usuariosConCursos = await Promise.all(usuarios.map(async usuario => {
            const cursos = await AdminService.getCursosDeUsuario(usuario.idUsuario);
            return {
              ...usuario,
              cursos: cursos.data
            };
          }));
          return {
            ...admin,
            usuarios: usuariosConCursos
          };
        }));
      } catch (error) {
        console.error('Error al cargar los admins:', error);
      }
    },
    async seleccionarAdmin(admin) {
      try {
        const usuarios = await AdminService.getUsuariosByAdmin(admin.idAdmin);
        console.log(admin.idAdmin);
        this.usuarios = usuarios.map(usuario => {
          return {
            ...usuario,
            nuevaCategoria: usuario.rolUsuario.nombreRolUsuario
          };
        });
      } catch (error) {
        console.error('Error al cargar los usuarios:', error);
      }
    },
    buscar() {
      // Implementar lógica de búsqueda con los filtros
    },
    eliminarFiltros() {
      this.filters.nombre = '';
      this.cargarAdmins();
    },
    exportToExcel() {
      const adminsData = this.admins.map(admin => {
        const usuariosData = admin.usuarios.map(usuario => {
          const cursosData = usuario.cursos ? usuario.cursos.map(curso => `${curso.nombreCursoUsuario} (${curso.estadoCurso})`).join(', ') : 'Sin cursos';

          return {
            Usuario: usuario.nombreUsuario,
            SAP: usuario.sapUsuario,
            Correo: usuario.correoUsuario,
            Cargo: usuario.cargoUsuario,
            Zona: usuario.zonaUsuario,
            Empresa: usuario.empresaUsuario,
            Tienda: usuario.tiendaUsuario,
            Jornada: usuario.jornadaUsuario,
            Rol: usuario.rolUsuario.nombreRolUsuario,
            Cursos: cursosData
          };
        });

        return {
          Admin: admin.nombreAdmin,
          SAP: admin.sapAdmin,
          Correo: admin.correoAdmin,
          Cargo: admin.cargoAdmin,
          Zona: admin.zonaAdmin,
          Empresa: admin.empresaAdmin,
          Usuarios: usuariosData
        };
      });

      const wb = XLSX.utils.book_new();

      adminsData.forEach(admin => {
        const ws = XLSX.utils.json_to_sheet(admin.Usuarios);
        XLSX.utils.book_append_sheet(wb, ws, admin.Admin);
      });

      XLSX.writeFile(wb, 'directorio_admins.xlsx');
    },
    exportToPDF() {
      const doc = new jsPDF();

      this.admins.forEach(admin => {
        doc.setFontSize(18);
        doc.text(`Admin: ${admin.nombreAdmin}`, 10, 10);

        const usuariosData = admin.usuarios.map(usuario => [
          usuario.nombreUsuario,
          usuario.sapUsuario,
          usuario.correoUsuario,
          usuario.cargoUsuario,
          usuario.zonaUsuario,
          usuario.empresaUsuario,
          usuario.tiendaUsuario,
          usuario.jornadaUsuario,
          usuario.rolUsuario.nombreRolUsuario
        ]);

        doc.autoTable({
          head: [['Nombre', 'SAP', 'Correo', 'Cargo', 'Zona', 'Empresa', 'Tienda', 'Jornada', 'Rol']],
          body: usuariosData,
          startY: doc.previousAutoTable ? doc.previousAutoTable.finalY + 10 : 20
        });

        admin.usuarios.forEach(usuario => {
          doc.setFontSize(14);
          doc.text(`Cursos de ${usuario.nombreUsuario}`, 10, doc.previousAutoTable.finalY + 10);

          const cursosData = usuario.cursos.map(curso => [
            curso.nombreCursoUsuario,
            this.formatDate(curso.fechaInicio),
            `${curso.avanceCurso} %`,
            curso.estadoCurso
          ]);

          doc.autoTable({
            head: [['Curso', 'Fecha Inicio', 'Avance (%)', 'Estado']],
            body: cursosData,
            startY: doc.previousAutoTable ? doc.previousAutoTable.finalY + 10 : 10
          });
        });

        if (this.admins.indexOf(admin) !== this.admins.length - 1) {
          doc.addPage();
        }
      });

      doc.save('directorio_admins.pdf');
    },
    darFeedback(miembro) {
      this.miembroSeleccionado = miembro;
      this.showFeedbackModal = true;
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
        await this.cargarAdmins(); // Recargar la lista de usuarios await this.cargarMiembros()
      } catch (error) {
        console.error('Error al procesar feedback:', error);
      }
    },
    async actualizarMiembro(usuario) {
      try {
        const categoriaToIdRol = {
          'Enigma': 1,
          'Esencial': 2,
          'Eminente': 3,
          'Dilema': 4,
          'Prometedor': 5,
          'Experto': 6,
          'Riesgo': 7,
          'Destacado': 8,
          'Sobresaliente': 9
        };

        const updatedUsuarioDto = {
          rolUsuario: {
            idRolUsuario: categoriaToIdRol[usuario.nuevaCategoria]
          }
        };
        console.log(updatedUsuarioDto.rolUsuario);

        if (!updatedUsuarioDto.rolUsuario.idRolUsuario) {
          console.error('Categoría no válida seleccionada');
          return;
        }

        console.log('Actualizando usuario con:', updatedUsuarioDto);

        //Actualiza estado local del usuario
        const index = this.usuarios.findIndex(m => m.idUsuario === usuario.idUsuario);
        if (index !== -1) {
          this.usuarios[index].rolUsuario = { idRolUsuario: categoriaToIdRol[usuario.nuevaCategoria], nombreRolUsuario: usuario.nuevaCategoria };
        }

        console.log('Usuario actualizado en el estado local:', this.usuarios[index])

      } catch (error) {
        console.error('Error al actualizar usuario:', error);
      }
    },
    async eliminarMiembro(miembro) {
      if (confirm('¿Está seguro de eliminar este usuario?')) {
        try {
          await AdminService.eliminarUsuario(miembro.idUsuario);
          await this.cargarAdmins; // Recargar la lista de usuarios
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
      } catch (error) {
        console.error('Error al obtener los cursos:', error);
      }
    },
    cerrarFormularioNuevo() {
      this.mostrarFormularioNuevo = false;
      this.cargarAdmins();
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }).replace(',', '');
    },
    actualizarAdmin(admin) {
      this.mostrarAcualizarJefeTienda = true;
    },
    cerrarActualizarJefeTienda() {
      this.mostrarAcualizarJefeTienda = false;
    },
    asignarCurso(usuario) {
      this.usuarioSeleccionado = usuario;
      this.showAsignarCursoModal = true;
    },
    cerrarModalAsignarCurso() {
      this.showAsignarCursoModal = false;
      this.usuarioSeleccionado = null;
    },
    handleCursoAsignado() {
      this.cerrarModalAsignarCurso();
      this.mostrarCursos(this.usuarioSeleccionado);
    },
  }
};
</script>

<style scoped>
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

.criterios-categoria {
  flex: 1;
  background-color: #f0f0f0;
  padding: 20px;
}

.miembro-card {
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
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

footer {
  background-color: #f1f1f1;
  padding: 1rem;
  text-align: center;
  font-size: 0.8rem;
}
</style>