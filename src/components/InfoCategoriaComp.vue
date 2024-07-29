<template>
    <div class="modal" @click.self="$emit('close')">
      <div class="modal-content">
        <h2>Criterio para cambiar la categoría</h2>
        <form @submit.prevent="addNewEmployee">
          <div class="form-group">
            <img src="../assets/categorias.png" alt="Criterio categoria">
          </div>
          
          <button type="button" @click="$emit('close')">Cerrar</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'InfoCategoriaComp',
    data() {
      
    },
    methods: {

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
    align-items: center;
  }
  
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    width: 80%;
    max-width: 500px;
    box-sizing: border-box;
  }
  
  .form-group {
    margin-bottom: 15px;
    text-align: center;
  }

  img {
    width: 100%;
    height: auto;
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