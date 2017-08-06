/**
 * Created by gaoyuan on 2017/7/22.
 */

import apiUtils from './baseRequest.js'

function dataFetch (url, params) {
    return apiUtils.get(url, params)
}

export default {
    dataFetch,
    imgUrl: 'http://192.168.31.46:8088/',
    distUrl: 'http://192.168.0.113:8080/dist/'
}