<template>
    <div class="directorio">
      <!-- 
        <FilterComp
        @export-excel="exportToExcel"
        @export-pdf="exportToPDF"
        @filter="aplicarFiltros"
      />
      -->
      <FilterComp
        @export-excel="exportToExcel"
        @export-pdf="exportToPDF"
      />
      <main>
        <div class="directorio-content">
          <div class="miembros-list">
            <div v-for="miembro in miembros" :key="miembro.id" class="miembro-card">
              <div class="miembro-foto">64x64</div>
              <div class="miembro-info">
                <p>{{ miembro.nombreUsuario }}</p>
                <p>{{ miembro.sapUsuario }}</p>
                <p>{{ miembro.correoUsuario }}</p>
                <p>{{ miembro.cargoUsuario }}</p>
                <p>{{ miembro.zonaUsuario }}</p>
                <p>{{ miembro.empresaUsuario }}</p>
                <p>{{ miembro.tiendaUsuario }}</p>
                <p>{{ miembro.jornadaUsuario }}</p>
                <p>{{ miembro.nombreRolUsuario }}</p>
              </div>
              <div class="miembro-actions">
                <select v-model="miembro.nuevaCategoria">
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
                <button @click="actualizarMiembro(miembro)">Actualizar</button>
                <button @click="darFeedback(miembro)">Feedback</button>
                <button @click="eliminarMiembro(miembro)">Eliminar</button>
              </div>
            </div>
          </div>
          <div class="criterios-categoria">
            <h2>Criterio para cambiar la categoría</h2>
            <p>[Agregar infografía para cambiar la categoría]</p>
          </div>
        </div>
      </main>
      <AgregarNuevoComp v-if="mostrarFormularioNuevo" @close="cerrarFormularioNuevo" @empleado-agregado="cargarMiembros" />
      <AgregarFeedbackComp 
        v-if="showFeedbackModal" 
        :miembro="miembroSeleccionado" 
        @close="cerrarModalFeedback"
        @feedback-registrado="procesarFeedback"
      />
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import AdminService from '@/services/AdminService';
  import AgregarNuevoComp from '@/components/AgregarNuevoComp.vue';
  import AgregarFeedbackComp from '@/components/AgregarFeedbackComp.vue';
  import * as XLSX from 'xlsx';
  import jsPDF from 'jspdf';
  import 'jspdf-autotable';
  import FilterComp from '@/components/FilterComp.vue';
  
  export default {
    name: 'Directorio',
    components: {
      AdminService,
      AgregarFeedbackComp,
      FilterComp,
      AgregarNuevoComp
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
          nombreRolUsuario:''
        },
        showFeedbackModal: false,
        miembroSeleccionado: null,
        mostrarFormularioNuevo: false,
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
      async cargarMiembros() {
        try {
          const response = await AdminService.getUsuarios();
          this.miembros = response.map(usuario => ({
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
            nuevaCategoria: usuario.rolUsuario.nombreRolUsuario
          }));
        } catch (error) {
          console.error('Error al cargar los miembros:', error);
        }
      },
      buscar() {
        // Implementar lógica de búsqueda con los filtros
        // Ejemplo básico:
        axios.get('https://api.etalent.com/directorio', { params: this.filters })
          .then(response => {
            this.miembros = response.data;
          })
          .catch(error => {
            console.error('Error en la búsqueda:', error);
          });
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
        if(!this.miembros || this.miembros.length === 0){
          console.error('No hay datos para exportar');
          return;
        }

        try {
          const data = this.miembros.map( m => ({
            ID: m.idUsuario,
            Nombre: m.nombreUsuario,
            Correo: m.correoUsuario,
            SAP: m.sapUsuario,
            Estado: '',
            Rol: m.nombreRolUsuario
          }));

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
        const tableColumn = ["ID", "Nombre", "Correo", "SAP", "Estado", "Rol"];
        const tableRows = [];

        this.miembros.forEach( m => {
          const miembroData = [
            m.idUsuario,
            m.nombreUsuario,
            m.correoUsuario,
            m.sapUsuario,
            m.nombreRolUsuario
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
      cerrarModalFeedback(){
        this.showFeedbackModal = false;
        this.miembroSeleccionado = null;
      },
      async procesarFeedback(feedbackData){
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
            'Enigma': 1,
            'Esencial': 2,
            'Eminente': 3,
            'Dilema': 4,
            'Prometedor': 5,
            'Experto': 6,
            'Riesgo': 7,
            'Destacado': 8,
            'Sobresaliente': 9
          }

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
      cerrarFormularioNuevo() {
        this.mostrarFormularioNuevo = false;
        this.cargarMiembros(); // Recargar la lista después de agregar un nuevo miembro
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