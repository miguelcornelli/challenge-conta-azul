import axios from 'axios'

export default class AbstractCacheService {
  constructor(minutes){
    const cache = window.localStorage.cache!==undefined?JSON.parse(window.localStorage.cache):{
      'get': {}
    }
    
    let nowTime = ()=> new Date().getTime();
    let expireTime = ()=> nowTime() - (minutes * 60 * 1000);

    let hasCache = (method, path)=> cache[method][path] === undefined?false:cache[method][path].time>expireTime();
    let getCache = (method, path)=> cache[method][path].data;
    let setCache = (method, path, data)=> {
      cache[method][path] = {
        time: nowTime(),
        data: data
      }
      window.localStorage.cache = JSON.stringify(cache);
    };

    this.get = async (path)=>{
      return new Promise(async (resolve, reject) => {
        if (hasCache('get', path)){
          console.log("[CACHE SERVICE] Usando cache para o endereço "+path);
          resolve(getCache('get', path));
        } else {
          console.log("[CACHE SERVICE] Consultando sem cache o endereço "+path);
          await axios.get(path).then((response)=>{
            setCache('get', path, response.data);
            resolve(response.data);
          }).catch((error)=>{
            reject(error);
          });
        }
    
        resolve();
      })
    }
  }
}