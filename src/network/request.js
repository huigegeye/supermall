import axios from 'axios'

export function request(config){
    //创建axios实例
    const instance=axios.create({
        //baseURL:"http://123.207.32.32:8000",
        baseURL:"http://152.136.185.210:8000/api/w6",
        timeout:10000
    })

    //发送真正的请求
    return instance(config)
}