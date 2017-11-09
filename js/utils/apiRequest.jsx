 import axios from 'axios';

 function PostReq(api,data,timeout,baseURL){
      let axiosInstance = axios.create({
            baseURL: baseURL || 'http://lapis.intelverse.com:3000/',
            timeout: timeout || 5000,
            headers: {'Access-Control-Allow-Origin': 'http://lapis.intelverse.com:3000/', 'userid' : 'dpk22dev@gmail.com'},
            withCredentials: true
            });

        return axiosInstance.post(api,data);
          
 }


function GetReq(api,timeout,baseURL){
      let axiosInstance = axios.create({
            baseURL: baseURL || 'http://lapis.intelverse.com:3000/',
            timeout: timeout||5000,
            headers: {'Access-Control-Allow-Origin': 'http://lapis.intelverse.com:3000/',  'userid' : 'dpk22dev@gmail.com'},
            withCredentials: true
            });

        return axiosInstance.get(api)
            
 }


 export {PostReq,GetReq}