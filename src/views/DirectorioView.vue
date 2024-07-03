<template>
    <div class="directorio">
      <main>
  
        <div class="directorio-content">
          <div class="miembros-list">
            <div v-for="miembro in miembros" :key="miembro.id" class="miembro-card">
              <div class="miembro-foto">64x64</div>
              <div class="miembro-info">
                <h3>{{ miembro.nombreUsuario }}</h3>
                <p>{{ miembro.codigo }}</p>
                <p>{{ miembro.genero }}</p>
                <p>{{ miembro.correoUsuario }}</p>
                <p>{{ miembro.estado }}</p>
                <p>{{ miembro.categoria }}</p>
              </div>
              <div class="miembro-actions">
                <select v-model="miembro.nuevaCategoria">
                  <option value="Prometedor">Prometedor</option>
                  <option value="Riesgo">Riesgo</option>
                  <option value="Sobresaliente">Sobresaliente</option>
                </select>
                <button @click="darFeedback(miembro)">Feedback</button>
                <button @click="actualizarMiembro(miembro)">Actualizar</button>
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
  
      <AgregarNuevoEmpleado v-if="mostrarFormularioNuevo" @close="cerrarFormularioNuevo" @empleado-agregado="cargarMiembros" />
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import AdminService from '@/services/AdminService';
  
  export default {
    name: 'Directorio',
    components: {
      AdminService
    },
    data() {
      return {
        miembros: [],
        filters: {
          nombreUsuario: '',
          correoUsuario: '',
          sapUsuario: '',
          fechaInicio: '',
          fechaFin: ''
        },
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
    },
    methods: {
      async cargarMiembros() {
        try {
          const response = await AdminService.getUsuarios();
          console.log(response)
          this.miembros = response.map(usuario => ({
            nombreUsuario: usuario.nombreUsuario,
            correoUsuario: usuario.correoUsuario,
            sapUsuario: usuario.sapUsuario
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
          categoria: '',
          fechaInicio: '',
          fechaFin: ''
        };
        this.cargarMiembros();
      },
      exportarExcel() {
        // Implementar lógica para exportar a Excel
      },
      exportarPDF() {
        // Implementar lógica para exportar a PDF
      },
      darFeedback(miembro) {
        // Implementar lógica para dar feedback
      },
      async actualizarMiembro(miembro) {
        try {
          await axios.put(`https://api.etalent.com/directorio/${miembro.id}`, miembro);
          this.cargarMiembros(); // Recargar la lista después de actualizar
        } catch (error) {
          console.error('Error al actualizar miembro:', error);
        }
      },
      async eliminarMiembro(miembro) {
        if (confirm('¿Está seguro de eliminar este miembro?')) {
          try {
            await axios.delete(`https://api.etalent.com/directorio/${miembro.id}`);
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
    flex: 3;
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