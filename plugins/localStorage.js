//下载引入一个插件，vuex-persistedstate ，该插件会把本地存储的数据读取到store中
// npm install --save vuex-persistedstate
//然后去 package.json 中配置

  //竟然是自己配置好了，，，，， "nuxt": "^2.0.0",  
   //  厉害的有点可怕了  "vuex-persistedstate": "^2.5.4"   

import createPersistedState from 'vuex-persistedstate'
// export default 函数是nuxt插件的固定的格式
// 函数有一个参数，这个参数是nuxt对象
export default ( {store} ) => {  // {store} 是我们自己写的
    // 插件的方法  
    window.onNuxtReady(() => {
      createPersistedState({
          key: 'store', // 可以是任意的字符串
      })(store)
    })
  } 