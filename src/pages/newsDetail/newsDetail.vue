<style :src="resdata.css[0]" scoped></style>
<template>
    <div>
        <text>{{webUrl}}</text>
        <web :src="webUrl" style="width: 750px; height: 1000px"></web>
    </div>
</template>

<script>
    import Api from '../../api/api.js'
//    import Navbar from '../componets/navbar.vue'
    import Evn from '../../utils/evn.js'

    export default {
        data () {
            return {
                resdata: {},
//                webUrl: Evn.baseUrl + 'newsDetail.html'
                webUrl: 'https://m.alibaba.com'
            }
        },
        methods: {
            storyRequest () {
                Api.dataFetch('4/story/4232852',{})
                    .then(res => {
                        this.resdata = res
			          console.log(res.body)
                    }).catch(res => {
                    console.log('\n 请求失败~', res, '\n')
                })
            },
        },
        created: function () {
            this.storyRequest()
            console.log('created 创建完毕状态===============》')
        },
        beforeMount: function () {
            console.log('beforeMount 挂载前状态===============》')
        },
        mounted: function () {
            console.log('mounted 挂载结束状态===============》')
        }
    }
</script>
