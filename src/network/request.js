import axios from 'axios'

export function request(config){
    //创建axios实例
    const instance=axios.create({
        baseURL:"http://123.207.32.32:8000",
        timeout:10000
    })

    //发送真正的请求
    return instance(config)
}