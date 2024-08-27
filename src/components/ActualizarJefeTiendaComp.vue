<template>
    <div class="modal" @click.self="$emit('close')">
      <div class="modal-content">
        <h2>Actualizar Jefe de Tienda</h2>
        <p>Cambia de jefe de tienda a partir del ID, es encesario que el Jefe de Tienda entrante tenga una cuenta vacía recién creada</p>
        <form @submit.prevent="cambiaJefeTienda">
          <div class="form-group">
            <label for="idAntiguo"> <strong>ID Antiguo (Saliente) </strong></label>
            <input id="idAntiguo" v-model="jefesTienda.idJefeSaliente" placeholder="ID del Jefe de Tienda saliente" required>
          </div>
          
          <div class="form-group">
            <label for="idNuevo"> <strong> ID Nuevo (Entrante) </strong></label>
            <input id="idNuevo" v-model="jefesTienda.idJefeEntrante" placeholder="ID del Jefe de Tienda entrante" required>
          </div>

          <div class="button-group">
          <button type="submit">Aceptar</button>
          <button type="button" @click="$emit('close')">Cancelar</button>
          </div>

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
            idJefeSaliente: '',
            idJefeEntrante: ''
        }
      };
    },
    methods: {
      async cambiaJefeTienda() {
        try {
          const response = await AdminService.cambiaJefeTienda(this.jefesTienda.idJefeSaliente, this.jefesTienda.idJefeEntrante);
          console.log(response)
          alert('Cambio realizado correctamente')
          this.$emit('success', 'El cambio de jefe de ienda se realizó correctamente');
        } catch (error) {
          console.error('Error al cambiar e jefe de tienda:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  h2 {
    text-align: center;
  }
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
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

  .button-group {
  display: flex;
  justify-content: space-between; /* Espacio entre los botones */
}

.button-group button {
  width: 48%; /* Hace que los botones se alineen y se mantengan juntos, ajustando el ancho */
}

  </style>