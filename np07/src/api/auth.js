import axios from './axios'

export const register = async (data)=>{
    const res = await axios.post('/Auth/register',data);
    console.log(res)
    return res.data;
}

export const login = async (data) =>{
    const res = await axios.post('/Auth/login',data);
    console.log(res);
    console.log(res.token)
    return res.data;
}

export const logout = ()=>{
    localStorage.removeItem('token');
}