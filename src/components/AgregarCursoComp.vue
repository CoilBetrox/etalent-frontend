<template>
    <div class="modal" @click.self="$emit('close')">
      <div class="modal-content">
        <h2>Agregar Curso</h2>
        <form @submit.prevent="addCurso">
          <div class="form-group">
            <label for="nombreCurso">Nombre Curso</label>
            <input id="nombreCurso" v-model="curso.nombreCursoUsuario" placeholder="Nombre Curso" required>
          </div>
          
          <div class="form-group">
            <label for="descripcionCurso">Descripcion Curso</label>
            <input id="descripcionCurso" v-model="curso.descripcionCurso" placeholder="Descripción curso" required>
          </div>
          
          <div class="form-group">
            <label for="fechaInicio">Fecha Inicio</label>
            <input id="fechaInicio" v-model="curso.fechaInicio" placeholder="YYYY-MM-DD" required>
          </div>

          <div class="form-group">
            <label for="fechaFin">Fecha Fin</label>
            <input id="fechaFin" v-model="curso.fechaFin" placeholder="YYYY-MM-DD" required>
          </div>

          <button type="submit">Agregar Nuevo</button>
          <button type="button" @click="$emit('close')">Cancelar</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import AdminService from '@/services/AdminService';
  export default {
    name: 'AgregarNuevoComp',
    data() {
      return {
        curso: {
          nombreCursoUsuario: '',
          descripcionCurso: '',
          fechaInicio: '',
          fechaFin: '',
          avanceCurso: '',
          estadoCurso: ''
        }
      };
    },
    methods: {
      async addCurso() {
        try {
          const response = await AdminService.agregarCurso({
            nombreCursoUsuario: this.curso.nombreCursoUsuario,
            descripcionCurso: this.curso.descripcionCurso,
            fechaInicio: this.curso.fechaInicio,
            fechaFin: this.curso.fechaFin,
            avanceCurso: 0,
            estadoCurso: 'Activo'
          });
          console.log('Curso agregado:', response);
          this.$emit('close');
        } catch (error) {
          console.error('Error al agregar curso:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: baseline;
  }
  
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    width: 400px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input, select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  button {
    background-color: #333;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
  }
  
  button:hover {
    background-color: #555;
  }
  </style>