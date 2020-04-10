import axios from 'axios'
//axios的简单封装
export function request(config){
    const instance = axios.create({
      baseURL:'http://123.207.32.32:8000/api/h8',
      timeout:5000
    });

    //axios的拦截器
  //1、请求拦截
  instance.interceptors.request.use(config=>{
    // console.log(config);
    return config  //必须返回config，不然后面得不到config的值,会请求失败
  },error => {
    console.log(err)
  })

  //响应拦截
  instance.interceptors.response.use(res=>{
    // console.log(res);
    return res.data
  },error => {
    // console.log(err);
  })

    //发送真正的网络请求
  return  instance(config)  //instance的返回值是一个promise，因此不用再进行promise封装
}
