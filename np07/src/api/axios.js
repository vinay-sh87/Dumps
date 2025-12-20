import axios from 'axios'

const axiosIns = axios.create({
    baseURL: "http://durgeshk-001-site1.anytempurl.com/api",
});

axiosIns.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token');
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export default axiosIns;