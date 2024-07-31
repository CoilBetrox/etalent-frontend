<template>
    <div class="modal" @click.self="$emit('close')">
      <div class="modal-content">
        <h2>Actualizar Jefe de Tienda</h2>
        <p>Cambia de jefe de tienda a partir de los código SAP, es encesario que el Jefe de Tienda entrante tenga una cuenta vacía creada</p>
        <form @submit.prevent="cambiaJefeTienda">
          <div class="form-group">
            <label for="sapAntiguo">SAP Antiguo (Saliente)</label>
            <input id="sapAntiguo" v-model="jefesTienda.sapJefeSaliente" placeholder="SAP del Jefe de Tienda saliente" required>
          </div>
          
          <div class="form-group">
            <label for="sapNuevo">SAP Nuevo (Entrante)</label>
            <input id="sapNuevo" v-model="jefesTienda.sapJefeEntrante" placeholder="SAP del Jefe de Tienda entrante" required>
          </div>

          <button type="submit">Aceptar</button>
          <button type="button" @click="$emit('close')">Cancelar</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import AdminService from '@/services/AdminService';
  export default {
    name: 'ActualizarJefeTiendaComp',
    data() {
      return {
        jefesTienda: {
            sapJefeSaliente: '',
            sapJefeEntrante: ''
        }
      };
    },
    methods: {
      async cambiaJefeTienda() {
        try {
          
        } catch (error) {
          console.error('Error al cambiar e jefe de tienda:', error);
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