 import axios from 'axios';

 function PostReq(api,baseURL){
      let axiosInstance = axios.create({
            baseURL: baseURL || 'http://api.intelverse.com/',
            timeout: 5000,
            headers: {'Access-Control-Allow-Origin': '*'}
            });

        axiosInstance.post(api,data)
            .then(function (response) {
                console.log(response);
           
        })
        .catch(function (error) {
            console.log(error);
        });
 }


function GetReq(api,baseURL){
      let axiosInstance = axios.create({
            baseURL: baseURL || 'http://api.intelverse.com/',
            timeout: 5000,
            headers: {'Access-Control-Allow-Origin': '*',
                'Authorization': ''}
            });

        return axiosInstance.get(api)
            
 }


 export {PostReq,GetReq}