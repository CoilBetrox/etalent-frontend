import axios from 'axios';

// Crear una instancia de axios con configuración base
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Función para obtener el token y configurarlo en Axios
function setAuthorizationHeader() {
    const token = localStorage.getItem('token');
    if (token) {
      console.log("Token encontrado:", token); // Agrega este log para verificar
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      console.log("Token no encontrado en localStorage"); // Agrega este log
    }
  }
  
  // Configurar la cabecera de autorización al iniciar
  setAuthorizationHeader(); // Llama a la función al inicio

// Obtener el token del localStorage
const token = localStorage.getItem('token');

// Si hay un token, configurarlo en las cabeceras de Axios
if (token) {
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Servicio para gestionar usuarios
export default {
  // Obtener un usuario por ID
  getUsuarioById(id) {
    return apiClient.get(`/usuarios/${id}`);
  },

  // Actualizar un usuario por ID
  updateUsuario(id, user) {
    return apiClient.put(`/usuarios/${id}`, user);
  },

  // Obtener todos los usuarios
  getAllUsuarios() {
    return apiClient.get('/usuarios');
  },

  // Eliminar un usuario por ID
  deleteUsuario(id) {
    return apiClient.delete(`/usuarios/${id}`);
  },

  // Crear un nuevo usuario
  createUsuario(user) {
    return apiClient.post('/usuarios', user);
  },
    
    // Nuevo método para actualizar el token
  updateToken(newToken) {
    localStorage.setItem('token', newToken); // Guarda el nuevo token en localStorage
    setAuthorizationHeader(); // Actualiza la cabecera de autorización en Axios
}
};
