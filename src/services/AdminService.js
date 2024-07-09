import api from './api';

//Metodos fachada
const loginAdmin = async(body)=>{
    return await loginAdminAxios(body);
};

const registerAdmin = async(body) => {
    return await registerAdminAxios(body);
};

const createUsuario = async(body) => {
    return await createUsuarioAxios(body);
};

const getUsuarios = async() => {
    return await getUsuariosAdminAxios();
};

const updateUsuarioRol = async (usuarioId, updatedUsuarioDto) => {
    return await updateUsuarioRolAxios(usuarioId, updatedUsuarioDto);
};

const registrarFedback= async(body, idUsuario) => {
    return await registrarFedbackAxios(body, idUsuario);
};

const getFeedbacks = async() => {
    return await getFeedbacksAxios();
};

const createComentario = async(body, idFedback) => {
    return await createComentarioAxios(body, idFedback);
}

const getComentarios = async() => {
    return await getComentariosAxios();
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

const updateUsuarioRolAxios = async(usuarioId, updatedUsuarioDto) => {
    try {
        const response = await api.put(`/usuarios/${usuarioId}`, updatedUsuarioDto);
        return response.data;
    } catch (error) {
        console.error('Error en updateUsuarioRolAxios', error);
        throw error;
    }
}

const registrarFedbackAxios = async(body, idUsuario) => {
    try {
        const response = api.post(`/feedbacks/${idUsuario}`, body);
        console.log(response);
        return (await response).data || {message: 'Registro exitoso'}
    } catch (error) {
        console.error('Error en registrarFedbackAxios', error);
        throw error;
    }
}

const getFeedbacksAxios = async() => {
    try {
        const response = api.get('/feedbacks');
        console.log(response);
        return (await response).data || {message: 'Feedbacks obtenidos'}
    } catch (error) {
        console.error('Error en getFeedbaksAxios', error);
        throw error;
    }
}

const createComentarioAxios = async(body, idFedback) => {
    try {
        const response = api.post(`/comentariosFeedback/${idFedback}`, body);
        console.log(response);
        return (await response).data || {message: 'Comentario registrado existosamente'}
    } catch (error) {
        console.error('Error en createComentarioAxios', error);
        throw error;
    }
}

const getComentariosAxios = async() => {
    try {
        const response = api.get('/comentariosFeedback');
        console.log(response);
        return (await response).data || {message: 'Comentarios otenidos'}
    } catch (error) {
        console.error('Error en getComentariosAxios', error);
        throw error;
    }
}

export default {
    registerAdmin, 
    loginAdmin, 
    createUsuario,
    getUsuarios, 
    updateUsuarioRol, 
    registrarFedback, 
    getFeedbacks, 
    createComentario,
    getComentarios}