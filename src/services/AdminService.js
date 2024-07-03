import api from './api';

//Metodos fachada
const loginAdmin = async(body)=>{
    return await loginAdminAxios(body);
};

const registerAdmin = async(body) => {
    return await registerAdminAxios(body);
};

const createUsuario = async (body) => {
    return await createUsuarioAxios(body);
}

const getUsuarios = async () => {
    return await getUsuariosAdminAxios();
}

//Consumo API
const loginAdminAxios = async(body) => {
    try{
        const response = await api.post('/admins/auth/login', body);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error en loginAdminAxios:', error)
        throw error;
    }
}

const registerAdminAxios = async(body) => {
    try {
        const response = api.post('/admins/auth/register', body);
        console.log(response);
        return response.data || {message: 'Registro exitoso'};
    } catch (error) {
        console.error('Error en registerAdmin:', error);
        throw error;
    }
    
}

const createUsuarioAxios = async(body) => {
    try { 
        const response = api.post('/usuarios', body);
        console.log(response);
        return (await response).data || {message: 'Usuario agregado'};
    } catch (error) {
        console.error('Error en createUsuario', error);
        throw error;
    }
}

const getUsuariosAdminAxios = async() => {
    try {
        const response = await api.get('/usuarios');
        return response.data;
    } catch (error) {
        console.error('Error en getUsuariosAxios', error);
        throw error;
    }
}

export default {registerAdmin, loginAdmin, createUsuario, getUsuarios}