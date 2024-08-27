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
              <option value="Auxiliar de Visual">Auxiliar de Visual</option>
              <option value="Auxiliar Control Interno">Auxiliar Control Interno</option>
              <option value="Empleado / a de Mostrador">Empleado / a de Mostrador</option>
              <option value="Jefe de Ventas">Jefe de Ventas</option>
              <option value="Auxiliar de Trastienda">Auxiliar de Trastienda</option>
              <option value="Auxiliar de Servicios">Auxiliar de Servicios</option>
              <option value="Sastre">Sastre</option>
              <option value="Asistente de Tienda">Asistente de Tienda</option>
              <option value="Subjefe de Ventas">Subjefe de Ventas</option>
              <option value="Cajero / a">Cajero / a</option>
              <option value="Promotor / a de crédito">Promotor / a de crédito</option>
              <option value="Promotor / a de credito">Promotor / a de credito</option>
              <option value="Jefe Comercial">Jefe Comercial</option>
              <option value="Supervisor Tiendas 5">Supervisor Tiendas 5</option>
              <option value="Analista Comercial">Analista Comercial</option>
              <option value="Supervisor Tiendas 1">Supervisor Tiendas 1</option>
              <option value="Empleado / a de Mostrador (JP)">Empleado / a de Mostrador (JP)</option>
              <option value="Cajero / a (JP)">Cajero / a (JP)</option>
              <option value="Auxiliar de Trastienda (JP)">Auxiliar de Trastienda (JP)</option>
              <option value="Promotor">Promotor</option>
              <option value="Promotor / a de credito (JP)">Promotor / a de credito (JP)</option>
              <option value="Promotor / a de crédito (JP)">Promotor / a de crédito (JP)</option>
              <option value="Sastre (JP)">Sastre (JP)</option>
              <option value="Empleado / a de Mostrador)">Empleado / a de Mostrador)</option>
              <option value="Supervisor Tiendas 2">Supervisor Tiendas 2</option>
              <option value="Empleado / a de Mostrador (JP">Empleado / a de Mostrador (JP</option>
              <option value="Empleado / a de Mostrador  (JP)">Empleado / a de Mostrador  (JP)</option>
              <option value="Gerente Comercial">Gerente Comercial</option>
              <option value="Cajero/ a">Cajero/ a</option>
              <option value="Empleado / a de Mostrado">Empleado / a de Mostrado</option>
              <option value="Auxiliar de Servicios (JP)">Auxiliar de Servicios (JP)</option>
              <option value="Pasante">Pasante</option>
              <option value="Supervisor Tiendas 3">Supervisor Tiendas 3</option>
              <option value="Supervisor Tiendas 4">Supervisor Tiendas 4</option>
              <option value="Empleado / a de Mostrador JP">Empleado / a de Mostrador JP</option>
              <option value="Cajera/o">Cajera/o</option>
              <option value="Empleado / a de Mostrador (JP) (FS)">Empleado / a de Mostrador (JP) (FS)</option>
              <option value="Coach Comercial">Coach Comercial</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="zona">Zona</label>
            <select id="zona" v-model="usuario.zonaUsuario" required>
              <option value="VISUAL">VISUAL</option>
              <option value="SEGURIDAD">SEGURIDAD</option>
              <option value="INFANTIL">INFANTIL</option>
              <option value="JEFATURAS">JEFATURAS</option>
              <option value="TRASTIENDA">TRASTIENDA</option>
              <option value="MUJER">MUJER</option>
              <option value="AUXILIAR DE SERVICIOS">AUXILIAR DE SERVICIOS</option>
              <option value="SASTRE">SASTRE</option>
              <option value="CC1 -PB">CC1 -PB</option>
              <option value="HOMBRE">HOMBRE</option>
              <option value="RETAIL FINANCIERO TIENDAS">RETAIL FINANCIERO TIENDAS</option>
              <option value="HOGAR">HOGAR</option>
              <option value="TECNOLOGIA">TECNOLOGIA</option>
              <option value="CALZADO">CALZADO</option>
              <option value="GERENCIA COMERCIAL">GERENCIA COMERCIAL</option>
              <option value="CC1 -PISO 3">CC1 -PISO 3</option>
              <option value="BELLEZA">BELLEZA</option>
              <option value="CC1 -PISO 1">CC1 -PISO 1</option>
              <option value="CALZADO HOMBRE MUJER">CALZADO HOMBRE MUJER</option>
              <option value="CARTERAS Y ACCESORIOS">CARTERAS Y ACCESORIOS</option>
            </select>
          </div>
    
          <div class="form-group">
            <label for="empresa">Empresa</label>
            <select id="empresa" v-model="usuario.empresaUsuario" required>
              <option value="Comercial Etatex C. A.">Comercial Etatex C. A.</option>
              <option value="Tiendec S. A">Tiendec S. A</option> 
            </select>
          </div>

          <div class="form-group">
            <label for="provincia">Provincia</label>
            <select id="provincia" v-model="usuario.provinciaUsuario" required>
              <option value="Azuay">Azuay</option>
              <option value="Chimborazo">Chimborazo</option>
              <option value="Cotopaxi">Cotopaxi</option>
              <option value="Esmeraldas">Esmeraldas</option>
              <option value="Guayas">Guayas</option>
              <option value="Imbabura">Imbabura</option>
              <option value="Loja">Loja</option>
              <option value="Los Ríos">Los Ríos</option>
              <option value="Machala">Machala</option>
              <option value="Manabí">Manabí</option>
              <option value="Pichincha">Pichincha</option>
              <option value="Tungurahua">Tungurahua</option>
            </select>
          </div>
   
          <div class="form-group">
            <label for="tienda">Tienda</label>
            <select id="tienda" v-model="usuario.tiendaUsuario" required>
              <option value="Tienda Los Ceibos">Tienda Los Ceibos</option>
              <option value="Tienda Mall de los A">Tienda Mall de los A</option>
              <option value="Tienda 9 de Octubre">Tienda 9 de Octubre</option>
              <option value="Tienda Condado">Tienda Condado</option>
              <option value="Tienda Carapungo">Tienda Carapungo</option>
              <option value="Tienda Scala">Tienda Scala</option>
              <option value="Tienda Recreo">Tienda Recreo</option>
              <option value="Tienda Pananorte">Tienda Pananorte</option>
              <option value="Tienda Mall del Norte">Tienda Mall del Norte</option>
              <option value="Tienda Mall del Sur">Tienda Mall del Sur</option>
              <option value="Tienda CCI">Tienda CCI</option>
              <option value="Tienda Mall del Rio">Tienda Mall del Rio</option>
              <option value="Tienda Citymall">Tienda Citymall</option>
              <option value="Tienda Latacunga">Tienda Latacunga</option>
              <option value="Tienda Quicentro Sur">Tienda Quicentro Sur</option>
              <option value="Tienda San Luis Shop">Tienda San Luis Shop</option>
              <option value="Tienda Ibarra">Tienda Ibarra</option>
              <option value="Tienda Quicentro Nor">Tienda Quicentro Nor</option>
              <option value="Tienda Machala Expoceanica">Tienda Machala Expoceanica</option>
              <option value="Tienda Mall del Sol">Tienda Mall del Sol</option>
              <option value="Tienda Guayaquil">Tienda Guayaquil</option>
              <option value="Tienda Loja">Tienda Loja</option>
              <option value="Tienda San Marino">Tienda San Marino</option>
              <option value="Tienda Bosque">Tienda Bosque</option>
              <option value="Tienda Mall Pacífico">Tienda Mall Pacífico</option>
              <option value="Tienda Riobamba">Tienda Riobamba</option>
              <option value="Tienda Babahoyo">Tienda Babahoyo</option>
              <option value="R.M. Río Centro Sur">R.M. Río Centro Sur</option>
              <option value="R.M. Quicentro Sur">R.M. Quicentro Sur</option>
              <option value="R.M. Duran">R.M. Duran</option>
              <option value="R.M.Río Centro Norte">R.M.Río Centro Norte</option>
              <option value="R.M. Terminal Terres">R.M. Terminal Terres</option>
              <option value="R.M. Condado">R.M. Condado</option>
              <option value="R.M. Granados">R.M. Granados</option>
              <option value="R.M. Recreo">R.M. Recreo</option>
              <option value="R.M. Venezuela">R.M. Venezuela</option>
              <option value="R.M. Esmeraldas">R.M. Esmeraldas</option>
              <option value="R.M. Mall del Río">R.M. Mall del Río</option>
              <option value="R.M. Gye Centro">R.M. Gye Centro</option>
              <option value="R.M. Monay">R.M. Monay</option>
              <option value="R.M. Los Ceibos">R.M. Los Ceibos</option>
              <option value="R.M. Riobamba">R.M. Riobamba</option>
              <option value="R.M. Babahoyo">R.M. Babahoyo</option>
              <option value="R.M. 6 de Diciembre">R.M. 6 de Diciembre</option>
              <option value="R.M. Batán">R.M. Batán</option>
              <option value="R.M. Ambato Mall And">R.M. Ambato Mall And</option>
              <option value="R.M. Ibarra">R.M. Ibarra</option>
              <option value="R.M. Paseo Shop.Amba">R.M. Paseo Shop.Amba</option>
              <option value="R.M. Latacunga">R.M. Latacunga</option>
              <option value="R.M. Portal Shop.Car">R.M. Portal Shop.Car</option>
              <option value="R.M. Río Centro Dora">R.M. Río Centro Dora</option>
              <option value="R.M. City Mall">R.M. City Mall</option>
              <option value="R.M. Machala">R.M. Machala</option>
              <option value="R.M. Mall Pacífico">R.M. Mall Pacífico</option>
              <option value="R.M. Ambato">R.M. Ambato</option>
              <option value="R.M. Loja">R.M. Loja</option>
            </select>
          </div>

          <div class="form-group">
            <label for="jornada">Jornada</label>
            <select id="jornada" v-model="usuario.jornadaUsuario" required>
              <option value="Completa">Completa</option>
              <option value="Fin de semana">Fin de semana</option>
              <option value="Jornada Parcial 25">Jornada Parcial 25</option>
              <option value="Jornada Parcial 30">Jornada Parcial 30</option>
              <option value="Jornada Parcial 35">Jornada Parcial 35</option>
            </select>
          </div>

          <div class="btn-content">
            <button type="submit">Agregar Nuevo</button>
            <button type="button" @click="$emit('close')">Cancelar</button>
          </div>
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

  .btn-content {
    display: grid;
    gap: 1rem;
  }
  </style>