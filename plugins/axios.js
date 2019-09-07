// 这是axios插件 

// 作错误拦截的插件
import {Message} from 'element-ui'

// 1. 设置请求头拦截错误，以前的方法
// // 添加请求拦截器
// axios.interceptors.request.use(function (config) {
//     // 在发送请求之前做些什么
//     return config;
//   }, function (error) {
//     // 对请求错误做些什么
//     return Promise.reject(error);
//   });

// // 添加响应拦截器
// axios.interceptors.response.use(function (response) {
//     // 对响应数据做点什么
//     return response;
//   }, function (error) {
//     // 对响应错误做点什么
//     return Promise.reject(error);
//   });

// 2. 这里用到的方法
// export default (nuxt)=>{
// console.log(nuxt,123)
// }

export default ({$axios})=>{
$axios.onError(res=>{
    // 返回的res是一个错误的对象，Error对象下都有一个response的属性可以访问错误的信息
    // console.log(res.response)
    // 解构出错误信息，和代码// 解构出错误信息，和代码
    const {message,statusCode} = res.response.data
    if(statusCode === 400){
        // Message = this.$message
        Message.error(message)
    }
    
})
}
