<template>
  <div class="directorio">
    <FilterComp @filter="buscar" @export-excel="exportToExcel" @export-pdf="exportToPDF" />
    <main>
      <div class="btn-agregar-container">
        <button class="btn-agregar-masivo" @click="abrirAgregarMasivoJefe">Agregar Masivo</button> 
      </div>
      <div class="directorio-content">
        <div class="jefes-tienda">
          <h2>Jefes Tienda</h2>
          <div v-for="admin in admins" :key="admin.idAdmin" class="miembro-card">

            <div class="miembro-info">
              <p><strong>Id: </strong>{{ admin.idAdmin }}</p>
              <p><strong>Nombre: </strong>{{ admin.nombreAdmin }}</p>
              <p><strong>SAP: </strong>{{ admin.sapAdmin }}</p>
              <p><strong>Correo: </strong>{{ admin.correoAdmin }}</p>
              <p><strong>Cargo: </strong>{{ admin.cargoAdmin }}</p>
              <p><strong>Zona: </strong>{{ admin.zonaAdmin }}</p>
              <p><strong>Empresa: </strong>{{ admin.empresaAdmin }}</p>
              <p><strong>Estado: </strong>{{ admin.estadoAdmin }}</p>

            </div>
            <div class="miembro-actions">
              <button @click="seleccionarAdmin(admin)">Seleccionar</button>
              <button @click="actualizarAdmin(admin)">Actualizar Jefe</button>
              <select v-model="admin.newEstadoAdmin" @change="actualizarEstadoJefeTienda(admin)">
                <option value="" disabled>Estado</option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
              <!--<button @click="abrirAgregarMasivo">Agregar Personal</button>-->
            </div>

          </div>
        </div>

        <div class="personal-tienda"  ref="personalTienda">
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
              <button @click="actualizarMiembro(usuario)">Actualizar</button>
              <button @click="darFeedback(usuario)">Feedback</button>
              <button @click="mostrarCursos(usuario)">Cursos</button>
              <!-- 
              <button @click="eliminarMiembro(usuario)">Eliminar</button>
              -->
            </div>
          </div>
        </div>

        <div class="cursos-usuario"  ref="cursosUsuario">
          <h2>Cursos</h2>
          <div v-if="usuarioSeleccionado">
            <div class="header-cursos-usuario">
              <h3>{{ usuarioSeleccionado.nombreUsuario }}</h3>
              <button @click="asignarCurso(usuarioSeleccionado)">Asignar Curso</button>
            </div>
            <ul class="usuario-cursos-container">
              <li class="usuario-curso" v-for="curso in usuarioSeleccionado.cursos" :key="curso.idCursoUsuario">
                
                <p><strong>Nombre: </strong>{{ curso.nombreCursoUsuario }}</p>
                <p><strong>Inicio: </strong>{{ formatDate(curso.fechaInicio) }}</p>
                <p><strong>Fin: </strong>{{ formatDate(curso.fechaFin) }}</p>
                <p><strong>Progreso: </strong>{{ curso.avanceCurso }} %</p>
                <p><strong>Estado: </strong>{{ curso.estadoCurso }}</p>
                <div class="curso-actions">
                  <select v-model="curso.avanceCurso">
                    <option value="0">0</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="40">40</option>
                    <option value="60">60</option>
                    <option value="80">80</option>
                    <option value="100">100</option>
                  </select>
                  <select v-model="curso.estadoCurso">
                    <option value="Activo">Activo</option>
                    <option value="Detenido">Detenido</option>
                    <option value="Completo">Completo</option>
                  </select>
                  <button @click="actualizaCurso(curso)" :disabled="!usuarioSeleccionado">Actualizar</button>
                </div>
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
    <AgregarJefeMasivoComp v-if="mostrarFormularioMasivoJefe" @close="cerrarFormularioMasivoJefe" @usuarios-agregados="cargarMiembros" />
    <AgregarMasivoComp v-if="mostrarFormularioMasivo" @close="cerrarFormularioMasivo" @usuarios-agregados="cargarMiembros" />
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
import AgregarJefeMasivoComp from '@/components/AgregarJefeMasivoComp.vue';
import AgregarMasivoComp from '@/components/AgregarMasivoComp.vue';

export default {
  name: 'DirectorioAdminView',
  components: {
    AgregarNuevoComp,
    AgregarFeedbackComp,
    ActualizarJefeTiendaComp,
    AsignarCursoComp,
    FilterComp,
    AgregarJefeMasivoComp,
    AgregarMasivoComp
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
      adminSeleccionado: null,
      mostrarFormularioMasivoJefe: false,
      mostrarFormularioMasivo: false,
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
    async actualizaCurso(curso){
      if (!this.usuarioSeleccionado) {
        console.error('No hay usuario seleccionado');
        return;
      }
      try {
        const updatedCursoUsuarioDto = {
          avanceCurso: curso.avanceCurso,
          estadoCurso: curso.estadoCurso
        };
        await AdminService.updateCursoUsuario(curso.idCursoUsuario, updatedCursoUsuarioDto);
        console.log('Cuso acualizado con éxito');
        alert('Progreso y Estado actualizado correctamente.')
      } catch (error) {
        console.error('Error al actualizar curso:', error);
      }
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
          console.log('-----------',response);
          
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
        this.$nextTick(() => {
          this.$refs.personalTienda.scrollIntoView({ behavior: 'smooth' });
        });
      } catch (error) {
        console.error('Error al cargar los usuarios:', error);
      }
    },
    buscar() {
      
    },
    eliminarFiltros() {
      this.filters.nombre = '';
      this.cargarAdmins();
    },
    exportToExcel() {
      const adminsData = this.admins.map(admin => {
        const usuariosData = admin.usuarios.map(usuario => {
          const cursosData = usuario.cursos ? usuario.cursos.map(curso => `(${curso.nombreCursoUsuario} ${curso.avanceCurso} ${curso.estadoCurso})`).join(', ') : 'Sin cursos';

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

      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).replaceAll('/', '-');

      const formattedTime = currentDate.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
      }).replaceAll(':', '-');

      const fileName = `Etalent_Informe_General_${formattedDate}-${formattedTime}.xlsx`;

      XLSX.writeFile(wb, fileName);
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

      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).replaceAll('/', '-');

      const formattedTime = currentDate.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
      }).replaceAll(':', '-');

      const fileName = `Etalent_Informe_General_${formattedDate}-${formattedTime}.pdf`;

      doc.save(fileName);
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
            idRolUsuario: categoriaToIdRol[usuario.nuevaCategoria]
          },
          idUsuario: usuario.idUsuario
        };
        console.log(updatedUsuarioDto.rolUsuario);

        if (!updatedUsuarioDto.rolUsuario.idRolUsuario) {
          console.error('Categoría no válida seleccionada');
          return;
        }

        console.log('Actualizando usuario con:', updatedUsuarioDto);

        const response = await AdminService.updateUsuarioRol(usuario.idUsuario, updatedUsuarioDto);
        console.log('Respuestponse: ', response);

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
    async abrirAgregarMasivo(){
      console.log('abrirAgregarMasivo llamado');
      this.mostrarFormularioMasivo = true;
    },
    cerrarFormularioMasivo() {
      this.mostrarFormularioMasivo = false;
    },
    async abrirAgregarMasivoJefe(){
      console.log('abrirAgregarMasivo llamado');
      this.mostrarFormularioMasivoJefe = true;
    },
    cerrarFormularioMasivoJefe() {
      this.mostrarFormularioMasivoJefe = false;
    },
    async seleccionarAdminNew(admin) {
      this.adminSeleccionado = this.adminSeleccionado === admin ? null : admin;
    },
    async actualizarEstadoJefeTienda(admin) {
      try {
        this.adminSeleccionado = admin;

        const updatedEstado = admin.newEstadoAdmin;
        console.log("updatedEstado:",updatedEstado);
        

        if (!updatedEstado) {
          console.error('Por favor selecciona un estado válido');
          return;
        }
        
        const response = await AdminService.updateEstadoAdmin(admin.idAdmin, { 
          estadoAdmin: updatedEstado 
        });
        console.log('---Response actualizarEstadoJefeTienda',response);
        

        if (response) {
          const adminIndex = this.admins.findIndex(a => a.idAdmin === admin.idAdmin);
          if (adminIndex !== -1) {
            this.admins[adminIndex].estadoAdmin = updatedEstado;
            this.admins[adminIndex].newEstadoAdmin = null;
            this.admins = [...this.admins];
          }
          alert('Estado Actualizado Correctamente.');
          
        } else {
          console.error('Error en la actualización:', response);
        } 
        
      } catch (error) {
        console.error('Error al actualizar el estado:', error);
        alert('Error al actualizar el estado. Por favor, inténtelo de nuevo.');

      } finally {
        this.adminSeleccionado = null;
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
        this.$nextTick(() => {
          this.$refs.cursosUsuario.scrollIntoView({ behavior: 'smooth' });
        });
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
    async asignarCurso(usuario) {
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
  justify-content: space-between;
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
  flex: 1;
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

h2 {
  display: flex;
  justify-content: center;
}

.jefes-tienda {
  flex: 1;
}

.personal-tienda {
  display: block;
  flex: 1;
  background-color: #f0f0f0

}

.usuario-cursos-container {
  border: 4px solid #525151;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-radius: 10px;
  padding: 1rem 3rem;
  margin: 1rem 1rem;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.usuario-curso {
  border-bottom: 1px solid #525151;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}

.cursos-usuario {
  flex: 1;
  border-bottom: 1px solid #525151;
}

.curso-actions {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.header-cursos-usuario {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem 1rem;
  align-items: center;
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