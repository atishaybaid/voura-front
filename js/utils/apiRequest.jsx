 import axios from 'axios';

 function PostReq(api,data,timeout,baseURL){
      let axiosInstance = axios.create({
            baseURL: baseURL || 'http://lapis.intelverse.com:3000/',
            timeout: timeout || 500000,
            headers: {'Access-Control-Allow-Origin': 'http://lapis.intelverse.com:3000/'},
            withCredentials: true
            });

        return axiosInstance.post(api,data);
          
 }


function GetReq(api,timeout,baseURL,emptyHeader){
      let axiosInstance = axios.create({
            baseURL: baseURL || 'http://lapis.intelverse.com:3000/',
<<<<<<< HEAD
            timeout: timeout||5000,
            headers:emptyHeader?'':{'Access-Control-Allow-Origin': 'http://lapis.intelverse.com:3000/'},
            withCredentials: false
=======
            timeout: timeout||500000,
            headers: {'Access-Control-Allow-Origin': 'http://lapis.intelverse.com:3000/'},
            withCredentials: true
>>>>>>> bootstrap
            });

        return axiosInstance.get(api)
            
 }


 export {PostReq,GetReq}