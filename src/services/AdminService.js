
import api from '@/services/api';

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
};

const getComentarios = async() => {
    return await getComentariosAxios();
};

const getAdminProfile = async () => {
    return await getAdminProfileAxios();
};

const updateAdminProfilePartial= async (updateData) => {
    return await updateAdminProfilePartialAxios(updateData);
};

const getAdminsByRol = async () => {
    return await getAdminsByRolAxios();
};

const getUsuariosByAdmin = async (adminId) => {
    return await getUsuariosByAdminAxios(adminId);
};

const getAllFeedbacks = async () => {
    return await getAllFeedbacksAxios();
};

const eliminarUsuario = async (idUsuario) => {
    return await eliminarUsuarioAxios(idUsuario);
}


//Consumo API
const loginAdminAxios = async(body) => {
    try{
        const response = await api.post('/admins/auth/login', body);
        //const accessToken = response.data;
        //localStorage.setItem('accessToken', accessToken);
        return response.data;
    } catch (error) {
        console.error('Error en loginAdminAxios:', error)
        throw error;
    }
}

const registerAdminAxios = async(body) => {
    try {
        const response = await api.post('/admins/auth/register', body);
        console.log(response);
        return response.data || {message: 'Registro exitoso'};
    } catch (error) {
        console.error('Error en registerAdmin:', error);
        throw error;
    }
    
}

const createUsuarioAxios = async(body) => {
    try { 
        const response = await api.post('/usuarios', body);
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
        if (error.response && error.response.status === 401){
            console.error('Error de autenticación: ', error.message);
            // Redirigir al usuario a la página de inicio de sesión o mostrar un mensaje de error
            //window.location.href = '/login';
        }
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
        const response = await api.post(`/feedbacks/${idUsuario}`, body);
        console.log(response);
        return (await response).data || {message: 'Registro exitoso'}
    } catch (error) {
        console.error('Error en registrarFedbackAxios', error);
        throw error;
    }
}

const getFeedbacksAxios = async() => {
    try {
        const response = await api.get('/feedbacks');
        console.log(response);
        return (await response).data || {message: 'Feedbacks obtenidos'}
    } catch (error) {
        console.error('Error en getFeedbaksAxios', error);
        throw error;
    }
}

const createComentarioAxios = async(body, idFedback) => {
    try {
        const response = await api.post(`/comentariosFeedback/${idFedback}`, body);
        console.log(response);
        return (await response).data || {message: 'Comentario registrado existosamente'}
    } catch (error) {
        console.error('Error en createComentarioAxios', error);
        throw error;
    }
}

const getComentariosAxios = async() => {
    try {
        const response = await api.get('/comentariosFeedback');
        console.log(response);
        return (await response).data || {message: 'Comentarios otenidos'}
    } catch (error) {
        console.error('Error en getComentariosAxios', error);
        throw error;
    }
}

const getAdminProfileAxios = async () => {
    try {
        const response = await api.get('/admins/profile');
        console.log(response)
        return response.data;
    } catch (error) {
        console.error('Error en getAdminProfileAxios', error);
        throw error;
    }
};

const updateAdminProfilePartialAxios = async (updateData) => {
    try {
        const response = await api.patch('/admins/profile-update', updateData);
        return response.data;
    } catch (error) {
        console.log('Error en updateAdminProfilePartialAxios', error);
        throw error;
    }
};

const getAdminsByRolAxios = async () => {
    try {
        const response = await api.get('/admins/byRole');
        return response.data;
    } catch (error) {
        console.log('Error en getAdminsByRolAxios', error);
        throw error;
    }
};

const getUsuariosByAdminAxios = async (adminId) => {
    try {
        const response = await api.get(`/admins/userAdmin/${adminId}`);
        return response.data;
    } catch (error) {
        console.log('Error en getUsuariosByAdminAxios', error);
        throw error;
    }
};

const getAllFeedbacksAxios = async () => {
    try {
        const response = await api.get('/feedbacks/admin-tienda');
        return response.data;
    } catch (error) {
        console.log('Error en getAllFeedbacksAxios', error);
        throw error;
    }
};

const eliminarUsuarioAxios = async (idUsuario) => {
    try {
        return await api.delete(`/usuarios/${idUsuario}`);
    } catch (error) {
        console.log('Error en eliminarUsuarioAxios', error);
        throw error;
    }
};

export default {
    registerAdmin, 
    loginAdmin,
    createUsuario,
    getUsuarios,
    updateUsuarioRol,
    registrarFedback,
    getFeedbacks,
    createComentario,
    getComentarios,
    getAdminProfile,
    updateAdminProfilePartial,
    getAdminsByRol,
    getUsuariosByAdmin,
    getAllFeedbacks,
    eliminarUsuario
}