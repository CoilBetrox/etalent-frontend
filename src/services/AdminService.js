import api from './api';

//Metodos fachada
const loginAdmin = async(body)=>{
    return await loginAdminAxios(body);
};

const registerAdmin = async(body) => {
    return await registerAdminAxios(body);
};

//Consumo API
const loginAdminAxios = async(body) => {
    try{
        const response = await api.post('/admins/auth/login', body);
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

export default {registerAdmin, loginAdmin}