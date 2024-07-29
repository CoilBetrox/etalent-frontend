<template>
    <div class="modal" @click.self="$emit('close')">
      <div class="modal-content">
        <h2>Agregar nuevo</h2>
        <form @submit.prevent="addNewEmployee">
          <div class="form-group">
            <label for="nombreUsuario">Nombre</label>
            <input id="nombreUsuario" v-model="usuario.nombreUsuario" placeholder="Nombre Apellido" required>
          </div>
          
          <div class="form-group">
            <label for="sapUsuario">Código Sap</label>
            <input id="sapUsuario" v-model="usuario.sapUsuario" placeholder="Código SAP del usuario" required>
          </div>
          
          <div class="form-group">
            <label for="correoUsuario">Correo</label>
            <input id="correoUsuario" v-model="usuario.correoUsuario" placeholder="correo@correo.com" required>
          </div>
          
          <div class="form-group">
            <label for="cargo">Cargo</label>
            <select id="cargo" v-model="usuario.cargoUsuario" required>
              <option value="Cargo1">Cargo 1</option>
              <option value="Cargo2">Cargo 2</option>
              <option value="Cargo3">Cargo 3</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="zona">Zona</label>
            <select id="zona" v-model="usuario.zonaUsuario" required>
              <option value="Tecnologia">Tecnología</option>
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
            </select>
          </div>
    
          <div class="form-group">
            <label for="empresa">Empresa</label>
            <select id="empresa" v-model="usuario.empresaUsuario" required>
              <option value="Etafashion">Etafashion</option>
              <option value="RM">RM</option> 
            </select>
          </div>

          <div class="form-group">
            <label for="provincia">Provincia</label>
            <select id="provincia" v-model="usuario.provinciaUsuario" required>
              <option value="Pichincha">Pichincha</option>
              <option value="Guayas">Guayas</option> 
            </select>
          </div>
   
          <div class="form-group">
            <label for="tienda">Tienda</label>
            <select id="tienda" v-model="usuario.tiendaUsuario" required>
              <option value="Tienda1">Tienda 1</option>
              <option value="Tienda2">Tienda 2</option>
            </select>
          </div>

          <div class="form-group">
            <label for="jornada">Jornada</label>
            <select id="jornada" v-model="usuario.jornadaUsuario" required>
              <option value="Jornada1">Jornada 1</option>
              <option value="Jornada2">Jornada 2</option>
            </select>
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
        usuario: {
          nombreUsuario: '',
          sapUsuario: '',
          correoUsuario: '',
          cargoUsuario: '',
          zonaUsuario: '',
          empresaUsuario: '',
          provinciaUsuario: '',
          tiendaUsuario: '',
          jornadaUsuario: '',
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
            sapUsuario: this.usuario.sapUsuario,
            correoUsuario: this.usuario.correoUsuario,
            cargoUsuario: this.usuario.cargoUsuario,
            zonaUsuario: this.usuario.zonaUsuario,
            empresaUsuario: this.usuario.empresaUsuario,
            provinciaUsuario: this.usuario.provinciaUsuario,
            tiendaUsuario: this.usuario.tiendaUsuario,
            jornadaUsuario: this.usuario.jornadaUsuario,
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