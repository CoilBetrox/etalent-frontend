<template>
  <div class="page-background">
  <div class="directorio">
    <FilterComp @filter="buscar" @export-excel="exportToExcel" @export-pdf="exportToPDF" />
    <main>
      <div class="directorio-content">
        <div class="jefes-tienda">
          <h2>Jefes Tienda</h2>
          <div v-for="admin in admins" :key="admin.idAdmin" class="miembro-card">

            <div class="miembro-info">
              <p> <strong>ID:</strong> {{ admin.idAdmin }}</p>
              <p> <strong>Nombre:</strong> {{ admin.nombreAdmin }}</p>
              <p> <strong> SAP:</strong>{{ admin.sapAdmin }}</p>
              <p> <strong>Correo:</strong> {{ admin.correoAdmin }}</p>
              <p> <strong>Cargo:</strong> {{ admin.cargoAdmin }}</p>
              <p> <strong>Zona:</strong> {{ admin.zonaAdmin }}</p>
              <p> <strong>Empresa:</strong> {{ admin.empresaAdmin }}</p>

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
          <div v-for="usuario in usuarios" :key="usuario.idUsuario" class="miembro-card2">

            <div class="miembro-info">
              <p> <strong>Nombre:</strong>{{ usuario.nombreUsuario }}</p>
              <p><strong>SAP:</strong>{{ usuario.sapUsuario }}</p>
              <p><strong>Correo:</strong>{{ usuario.correoUsuario }}</p>
              <p><strong>Cargo:</strong>{{ usuario.cargoUsuario }}</p>
              <p><strong>Zona:</strong>{{ usuario.zonaUsuario }}</p>
              <p><strong>Empresa:</strong>{{ usuario.empresaUsuario }}</p>
              <p><strong>Tienda:</strong>{{ usuario.tiendaUsuario }}</p>
              <p><strong>Jornada:</strong>{{ usuario.jornadaUsuario }}</p>
              <p><strong>Rol:</strong>{{ usuario.rolUsuario.nombreRolUsuario }}</p>
            </div>
            <div class="miembro-actions1">
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
              
            </div>
          </div>
        </div>

        <div class="cursos-usuario" v-if="usuarioSeleccionado">
          <div class="titulo-curso">
          <h2>Cursos</h2>
          </div>
          <div class="miembro-card3">
          <div v-if="usuarioSeleccionado">
            <h3>{{ usuarioSeleccionado.nombreUsuario }}</h3>
            <div class="btn-AsignarCurso">
            <button @click="asignarCurso(usuarioSeleccionado)">Asignar Curso</button>
            </div>
            <ul >
              <li v-for="curso in usuarioSeleccionado.cursos" :key="curso.idCursoUsuario">
                <p> <strong>Nombre del Curso: </strong>{{ curso.nombreCursoUsuario }}</p>
                <p><strong>Fecha Inicio del Curso: </strong>{{ formatDate(curso.fechaInicio) }}</p>
                <p> <strong>Avance del Curso: </strong>{{ curso.avanceCurso }} %</p>
                <p><strong>Estado del Curso: </strong>{{ curso.estadoCurso }}</p>
              </li>
            </ul>
          </div>
          
          <div v-else>
            <p>Seleccione un usuario para ver los cursos asignados.</p>
          </div>
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

h2 {
  font-family: 'Arial', sans-serif; /* Cambia la fuente según tus preferencias */
  font-weight: bold;
  color: #1f1a1a;
  text-align: center;
}
.titulo-curso{
  margin-right: -45px;
}

/* Añadir una animación simple */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.page-background{
  background-color: #F1F1F2; /* Color de fondo claro para toda la página */
  min-height: 100vh; /* Asegura que el contenedor abarque toda la altura de la ventana */
  animation: fadeIn 1s ease-in-out;

}



.jefes-tienda{
  margin-left: 195px; /* Desplazar el contenedor hacia la derecha */
  margin-right: 60px; /* Desplazar el contenedor hacia la derecha */
  
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

.criterios-categoria {
  flex: 1;
  background-color: #f0f0f0;
  padding: 20px;
}

.miembro-card {
  border: 4px solid #525151;
  border-radius: 15px; /* Bordes redondeados */
  padding: 7px; /* Mayor padding para un diseño más espacioso */
  margin-bottom: 15px; /* Espacio inferior entre tarjetas */
  display: flex;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra para un efecto de profundidad */
  background-color: #cccac9; /* Fondo blanco para las tarjetas */

  font-family: 'Arial', sans-serif; /* Cambia la fuente según tus preferencias */
  font-size: 1rem; /* Tamaño del texto */
  color: #111010; /* Color del texto */
}

.miembro-card2 {
  border: 4px solid #525151;
  border-radius: 15px; /* Bordes redondeados */
  padding: 7px; /* Mayor padding para un diseño más espacioso */
  margin-bottom: 15px; /* Espacio inferior entre tarjetas */
  display: flex;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra para un efecto de profundidad */
  background-color: #ca9da1; /* Fondo blanco para las tarjetas */

  font-family: 'Arial', sans-serif; /* Cambia la fuente según tus preferencias */
  font-size: 1rem; /* Tamaño del texto */
  color: #111010; /* Color del texto */
}

.miembro-card3 {
  border: 4px solid #525151;
  border-radius: 15px; /* Bordes redondeados */
  padding: 7px; /* Mayor padding para un diseño más espacioso */
  display: flex;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra para un efecto de profundidad */
  background-color: #cccac9; /* Fondo blanco para las tarjetas */
  margin-left: 60px;
  margin-top: 45px;
  text-align: center;

  font-family: 'Arial', sans-serif; /* Cambia la fuente según tus preferencias */
  font-size: 1rem; /* Tamaño del texto */
  color: #111010; /* Color del texto */

  
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
  margin-right: 50px; /* Espacio entre la información y las acciones */

}

.miembro-actions {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.miembro-actions1{
display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
}

.miembro-actions1 select {
  background-color: #333; /* Fondo más claro */
  color: #ebe4e4; /* Color del texto */
  padding: 10px; /* Espaciado interno */
  border: 2px solid #333; /* Borde con color */
  border-radius: 5px; /* Bordes redondeados */
  font-size: 16px; /* Tamaño de la fuente */
  width: 100%; /* Ancho completo del contenedor */
  box-shadow: 0px 4px 6px rgba(177, 39, 39, 0.1); /* Sombra para darle profundidad */
  transition: all 0.3s ease; /* Animación en la transición */
}

.miembro-actions1 select:focus {
  border-color: #007BFF; /* Color del borde al estar en foco */
  outline: none; /* Eliminar el borde predeterminado del foco */
  box-shadow: 0px 0px 10px rgba(0, 123, 255, 0.5); /* Sombra más intensa al enfocar */
}

button {
  background-color: #333;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px; /* Bordes redondeados en los botones */
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

button:hover {
  background-color: #dd1717; /* Color de fondo al pasar el cursor */
  transform: scale(1.05); /* Aumentar el tamaño del botón */

}

.btn-AsignarCurso{
  padding-top: 10px;  /* Espacio arriba del texto */
    padding-bottom: 10px;  /* Espacio abajo del texto */
    padding-left: 15px;  /* Espacio a la izquierda del texto */
    padding-right: 15px;  /* Espacio a la derecha del texto */
}
footer {
  background-color: #f1f1f1;
  padding: 1rem;
  text-align: center;
  font-size: 0.8rem;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-50%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.slide-in {
  animation: slideIn 0.6s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn 1s ease-out;
}

.fade-on-hover:hover {
  animation: fadeIn 0.5s ease-out;
}


</style>