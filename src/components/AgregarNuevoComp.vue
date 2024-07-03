<template>
    <div class="modal" @click.self="$emit('close')">
      <div class="modal-content">
        <h2>Agregar nuevo</h2>
        <form @submit.prevent="addNewEmployee">
          <div class="form-group">
            <label for="nombreUsuario">Nombre Completo</label>
            <input id="nombreUsuario" v-model="usuario.nombreUsuario" placeholder="Apellido1 Apellido2 Nombre1 Nombre2" required>
          </div>

          <div class="form-group">
            <label for="correoUsuario">Correo</label>
            <input id="correoUsuario" v-model="usuario.correoUsuario" placeholder="correo@correo.com" required>
          </div>
  
          <div class="form-group">
            <label for="sapUsuario">Código Sap</label>
            <input id="sapUsuario" v-model="usuario.sapUsuario" placeholder="20011528" required>
          </div>
    <!-- 
          <div class="form-group">
            <label for="genero">Genero</label>
            <select id="genero" v-model="employee.genero" required>
              <option value="Femenino">Femenino</option>
              <option value="Masculino">Masculino</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="area">Área</label>
            <select id="area" v-model="employee.area" required>
              <option value="Tecnologia">Tecnología</option>
              
            </select>
          </div>
    
          <div class="form-group">
            <label for="cargo">Cargo</label>
            <select id="cargo" v-model="employee.cargo" required>
              <option value="Vendedor">Vendedor</option>
              
            </select>
          </div>
   
          <div class="form-group">
            <label for="categoria">Categoria</label>
            <select id="categoria" v-model="employee.categoria" required>
              <option value="Prometedor">Prometedor</option>
              
            </select>
          </div>
    -->
          <button type="submit">Agregar Nuevo</button>
          <button type="button" @click="$emit('close')">Cancelar</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import AdminService from '@/services/AdminService';
  export default {
    name: 'AgregarNuevoEmpleado',
    data() {
      return {
        usuario: {
          nombreUsuario: '',
          correoUsuario: '',
          sapUsuario: '',
          estadoUsuario: '',
          rolUsuario: ''
        }
      };
    },
    methods: {
      async addNewEmployee() {
        try {
          const response = await AdminService.createUsuario({
            nombreUsuario: this.usuario.nombreUsuario,
            correoUsuario: this.usuario.correoUsuario,
            sapUsuario: this.usuario.sapUsuario,
            estadoUsuario: 'Activo',
            rolUsuario: {
              id_rol_usuario: 5,
              nombre_rol_usuairo: 'Prometedor'
            },
            
          });
          console.log('Empleado agregado:', response);
          this.$emit('close');
        } catch (error) {
          console.error('Error al agregar empleado:', error);
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
  </style>