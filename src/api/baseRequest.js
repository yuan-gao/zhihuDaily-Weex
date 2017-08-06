
import qs from 'qs'
// import {urlEncode} from '../utils/string'
let stream = weex.requireModule('stream')
let modal = weex.requireModule('modal')

// http base url
const baseUrl = 'https://news-at.zhihu.com/api/'

function get(url, params) {
    // params = params ? params : null
    return new Promise((resolve, reject) => {
        console.log('request:', `${baseUrl + url}?${qs.stringify(params)}`)
        stream.fetch({
            method: 'GET',
            url: `${baseUrl + url}?${qs.stringify(params)}`,
            type: 'json'
        }, res => {
            if (res.ok && res.data) {
                resolve(res.data)
            } else {
                reject(res.data)
                modal.toast({message: '请求失败', duration:1})
            }
        }, progress => {
            console.log('get in progress:', progress.length)
        })
    })
}

function post(url, body) {
    return new Promise((resolve, reject) => {
        stream.fetch({
            method: 'POST',
            url: baseUrl + url,
            type: 'json',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }, res => {
            if (res.ok && res.data) {
                resolve(res.data)
            } else {
                reject(res.data)
                modal.toast({message: '请求失败', duration:1})
            }
        }, progress => {
            console.log('get in progress:' + progress.length)
        })
    })
}

function del(url) {
    return new Promise((resolve, reject) => {
        stream.fetch({
            method: 'DELETE',
            url: baseUrl + url,
            type: 'json'
        }, res => {
            if (res.ok && res.data && res.data.code === 0) {
                resolve(res.data)
            } else {
                reject(res.data)
            }
        }, progress => {
            console.log('get in progress:' + progress.length)
        })
    })
}

function put(url, body) {
    return new Promise((resolve, reject) => {
        stream.fetch({
            method: 'PUT',
            url: baseUrl + url,
            type: 'json',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }, res => {
            if (res.ok && res.data && res.data.code === 0) {
                resolve(res.data)
            } else {
                reject(res.data)
            }
        }, progress => {
            console.log('get in progress:' + progress.length)
        })
    })
}

export default {
    get, post, del, put
}
