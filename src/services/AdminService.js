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

const getUsuarioBySap = async(sapUsuario) => {
    return await getUsuarioBySapAxios(sapUsuario);
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

const getComentariosPorFeedback = async(feedbackId) => {
    return await getComentariosPorFeedbackAxios(feedbackId);
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
};

const getCursosDeUsuario = async (idUsuario) => {
    return await getCursosDeUsuarioAxios(idUsuario);
};

const updateCursoUsuario = async (idCursoUsuario, updatedCursoUsuarioDto) => {
    return await updateCursoUsuarioAxios(idCursoUsuario, updatedCursoUsuarioDto);
};

const cambiaJefeTienda = async (oldAdminId, newAdminId) => {
    return await cambiaJefeTiendaAxios(oldAdminId, newAdminId);
};

const forgotPassword = async (email) => {
    return await forgotPasswordAxios(email);
};

const resetPassword = async (token, newPassword) => {
    return await resetPasswordAxios(token, newPassword);
};

const agregarCurso = async (cursoUsuarioDto) => {
    return await agregarCursoAxios(cursoUsuarioDto);
};

const mostrarCursosAll = async () => {
    return await mostrarCursosAllAxios();
};

const mostrarIntegrantesCurso = async (idCursoUsuario) => {
    return await mostrarIntegrantesCursoAxios(idCursoUsuario);
};

const asignarCursoToUsuario = async (idCursoUsuario, idUsuario) => {
return await asignarCursoToUsuarioAxios(idCursoUsuario, idUsuario);
};

const mostrarCursosSimple = async () => {
    return await mostrarCursosSimpleAxios();
};

const addUsersBulk = async (users) => {
    return await addUsersBulkAxios(users);
};

const addJefesBulk = async (users) => {
    return await addJefesBulkAxios(users);
};

const updateEstadoAdmin = async (adminId, updatedAdminDto) => {
    return await updateEstadoAdminAxios(adminId ,updatedAdminDto);
};

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
        //await verifyEmail(body.token);
        //return response.data || {message: 'Registro exitoso'};
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Error en el registro');
        } else if (error.request) {
            throw new Error('No se pudo conectar con el servidor');
        } else {
            throw new Error('Error al procesar la solicitud');
        }
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

const getUsuarioBySapAxios = async(sapUsuario) => {
    try {
        const response = await api.get(`/usuarios/buscarPorSap/${sapUsuario}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401){
            console.error('Error de autenticación: ', error.message);
        }
        console.error('Error en getUsuarioBySapAxios', error);
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

const getComentariosPorFeedbackAxios = async(idFedback) => {
    try {
        const response = await api.get(`/comentariosFeedback/comentarios/${idFedback}`);
        console.log(response);
        return (await response).data || {message: 'Comentarios otenidos'}
    } catch (error) {
        console.error('Error en getComentariosPorFeedbackAxios', error);
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

const getCursosDeUsuarioAxios = async (idUsuario) => {
    try {
        return await api.get(`/cursosUsuario/${idUsuario}`);
    } catch (error) {
        console.log('Error en getCursosDeUsuarioAxios', error);
        throw error;
    }
};

const updateCursoUsuarioAxios = async (idCursoUsuario, updatedCursoUsuarioDto) => {
    try {
        const response = await api.put(`/cursosUsuario/${idCursoUsuario}`, updatedCursoUsuarioDto);
        return response.data;
    } catch (error) {
        console.log('Error en updateCursoUsuarioAxios', error);
        throw error;
    }
};

const cambiaJefeTiendaAxios = async (oldAdminId, newAdminId) => {
    try {
        if (!oldAdminId || !newAdminId) {
            throw new Error("IDs inválidos");
        }

        const response = await api.put(`/admins/${oldAdminId}/reassign/${newAdminId}`);
        return response.data;
    } catch (error) {
        console.log('Error en cambiaJefeTiendaAxios', error);
        throw error;
    }
};

const forgotPasswordAxios = async (email) => {
    try {
        const response = await api.post(`/admins/auth/forgot-password`, { email });
        return response.data;
    } catch (error) {
        console.log('Error en forgotPasswordAxios', error);
        throw error;
    }
};

const resetPasswordAxios = async (token, newPassword) => {
    try {
        const response = await api.post(`/admins/auth/reset-password`, { token, newPassword });
        return response.data;
    } catch (error) {
        console.log('Error en resetPasswordAxios', error);
        throw error;
    }
};

const agregarCursoAxios = async (cursoUsuarioDto) => {
    try {
        const response = await api.post('/cursosUsuario', cursoUsuarioDto);
        return response.data;
    } catch (error) {
        console.log('Error en agregarCursoAxios', error);
        throw error;
    }
};

const mostrarCursosAllAxios = async () => {
    try {
        const response = await api.get('/cursosUsuario');
        return response.data;
    } catch (error) {
        console.log('Error en mostrarCursosAllAxios', error);
        throw error;
    }
};

const mostrarIntegrantesCursoAxios = async (idCursoUsuario) => {
    try {
        const response = await api.get(`/cursosUsuario/usuarios/${idCursoUsuario}`);
        return response.data;
    } catch (error) {
        console.log('Error en mostrarIntegrantesCursoAxios', error);
        throw error;
    }
};

const asignarCursoToUsuarioAxios = async (idCursoUsuario, idUsuario) => {
    try {
        const response = await api.post(`/cursosUsuario/assign/${idCursoUsuario}/${idUsuario}`);
        return response.data;
    } catch (error) {
        console.log('Error en asignarCursoAxios', error);
        throw error;
    }
};

const mostrarCursosSimpleAxios = async () => {
    try {
        const response = await api.get('/cursosUsuario/simple');
        return response.data;
    } catch (error) {
        console.log('Error en mostrarCursosSimpleAxios', error);
        throw error;
    }
};

const addUsersBulkAxios = async (usuarios) => {
    try {
        const response = await api.post('/usuarios/bulk', usuarios);
        return response.data;
    } catch (error) {
        console.log('Error en addUsersBulkAxios', error);
        throw error;
    }
};

const addJefesBulkAxios = async (usuarios) => {
    try {
        const response = await api.post('/admins/bulk-jefes', usuarios);
        return response.data;
    } catch (error) {
        console.log('Error en addJefesBulkAxios', error);
        throw error;
    }
};

const updateEstadoAdminAxios = async (adminId, updatedAdminDto) => {
    try {
        const response = await api.put(`/admins/profile-update-status/${adminId}`, updatedAdminDto);
        return response.data;
    } catch (error) {
        console.log('Error en updateEstadoAdminAxios', error);
        throw error;
    }
};

export default {
    registerAdmin, 
    loginAdmin,
    createUsuario,
    getUsuarios,
    getUsuarioBySap,
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
    eliminarUsuario,
    getCursosDeUsuario,
    updateCursoUsuario,
    cambiaJefeTienda,
    forgotPassword,
    resetPassword,
    agregarCurso,
    mostrarCursosAll,
    mostrarIntegrantesCurso,
    asignarCursoToUsuario,
    mostrarCursosSimple,
    getComentariosPorFeedback,
    addUsersBulk,
    updateEstadoAdmin,
    addJefesBulk
}