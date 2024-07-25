<template>
    <div class="directorio">
      
      <main>
        <div class="directorio-content">
          <div class="jefes-tienda">
            <h2>Jefes Tienda</h2>
            <div v-for="admin in admins" :key="admin.idAdmin" class="miembro-card">
              
              <div class="miembro-info">
                <p>{{ admin.nombreAdmin }}</p>
                <p>{{ admin.sapAdmin }}</p>
                <p>{{ admin.correoAdmin }}</p>
                <p>{{ admin.cargoAdmin }}</p>
                <p>{{ admin.zonaAdmin }}</p>
                <p>{{ admin.empresaAdmin }}</p>

              </div>
              <div class="miembro-actions">
                <button @click="seleccionarAdmin(admin)">Seleccionar</button>
                <button @click="actualizarAdmin(admin)">Actualizar</button>
                <!-- 
                <button @click="eliminarAdmin(admin)">Eliminar</button>
                -->
              </div>
            </div>
          </div>

          <div class="personal-tienda" v-if="usuarios.length > 0">
            <h2>Personal Tienda</h2>
            <div v-for="usuario in usuarios" :key="usuario.idUsuario" class="miembro-card">
              <div class="miembro-foto">64x64</div>
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
                <!-- 
                <button @click="eliminarMiembro(usuario)">Eliminar</button>
                -->
              </div>
            </div>
          </div>
        </div>
      </main>
      <AgregarNuevoComp v-if="mostrarFormularioNuevo" @close="cerrarFormularioNuevo" @empleado-agregado="cargarAdmins" />
      <AgregarFeedbackComp
        v-if="showFeedbackModal"
        :miembro="miembroSeleccionado"
        @close="cerrarModalFeedback"
        @feedback-registrado="procesarFeedback"
      />
    </div>
  </template>
  
  <script>
  import AdminService from '@/services/AdminService';
  import AgregarNuevoComp from '@/components/AgregarNuevoComp.vue';
  import AgregarFeedbackComp from '@/components/AgregarFeedbackComp.vue';
  
  export default {
    name: 'DirectorioAdminView',
    components: {
      AgregarNuevoComp,
      AgregarFeedbackComp
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
        mostrarFormularioNuevo: false
      };
    },
    mounted() {
      this.cargarAdmins();

      AdminService.getUsuariosByAdmin(1).then(usuarios => {
        console.log(usuarios);
      }).catch (error => {
        console.error('Error al cargar los usuarios:', error);
      });
    },
    methods: {
      async cargarAdmins() {
        try {
          const response = await AdminService.getAdminsByRol();
          console.log(response);
          this.admins = response;
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
      exportarExcel() {
        // Implementar lógica para exportar a Excel
      },
      exportarPDF() {
        // Implementar lógica para exportar a PDF
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
      cerrarFormularioNuevo() {
        this.mostrarFormularioNuevo = false;
        this.cargarAdmins();
      }
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