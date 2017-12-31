 import axios from 'axios';

 function PostReq(api,data,timeout,baseURL){
      let axiosInstance = axios.create({
            baseURL: baseURL || 'http://lapis.intelverse.com:3000/',
            timeout: timeout || 5000,
            headers: {'Access-Control-Allow-Origin': 'http://lapis.intelverse.com:3000/'},
            withCredentials: true
            });

        return axiosInstance.post(api,data);
          
 }


function GetReq(api,timeout,baseURL,emptyHeader){
      let axiosInstance = axios.create({
            baseURL: baseURL || 'http://lapis.intelverse.com:3000/',
            timeout: timeout||5000,
            headers: {'Access-Control-Allow-Origin': 'http://lapis.intelverse.com:3000/'},
            withCredentials: true
            });

        return axiosInstance.get(api)
            
 }


 function PutReq(api,data,timeout,baseURL,emptyHeader){
     let axiosInstance = axios.create({
         baseURL: baseURL || 'http://lapis.intelverse.com:3000/',
         timeout: timeout||5000,
         headers: {'Access-Control-Allow-Origin': 'http://lapis.intelverse.com:3000/'},
         withCredentials: true
     });

     return axiosInstance.put(api, data)

 }


 function DeleteReq(api,timeout,baseURL,emptyHeader){
     let axiosInstance = axios.create({
         baseURL: baseURL || 'http://lapis.intelverse.com:3000/',
         timeout: timeout||5000,
         headers: {'Access-Control-Allow-Origin': 'http://lapis.intelverse.com:3000/'},
         withCredentials: true
     });

     return axiosInstance.delete(api)

 }

 export {PostReq,GetReq, PutReq, DeleteReq}