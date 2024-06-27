import axios from 'axios';

//Metodos fachada
const loginAdmin = async(body)=>{
    return await loginAdminAxios(body);
};

const registerAdmin = async(body) => {
    return await registerAdminAxios(body);
};

//Consumo API

const loginAdminAxios = async(body) => {
    const data = axios.post(`http://localhost:8081/api/admins/r/login`, body).then(r => r.data);
    return null;
}

const registerAdminAxios = async(body) => {
    const data = axios.post(`http://localhost:8081/api/admins/register`, body).then(r => r.data);
    console.log(data);
    return data.data;
}

export default {registerAdmin, loginAdmin}