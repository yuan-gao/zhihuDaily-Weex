<style src="./style.css" scoped></style>
<template>
<div class="content">
    <div ref="home" class="homeDiv">
        <list class="list">
            <refresh class="div-refresh" :display="refreshDisplay" @refresh="onRefresh">
                <text class="text-tip" v-if="refreshDisplay === 'hide'">{{refreshTip}}</text>
                <loading-indicator class="loading-indicator"></loading-indicator>
            </refresh>
            <cell>
                <slider class="slider" interval="3000" auto-play="true">
                    <div class="frame" v-for="img in resdata.top_stories">
                        <image class="image" resize="cover" :src="img.image"></image>
                        <div class="slider-bottom">
                            <text class="title">{{img.title}}</text>
                        </div>
                    </div>
                    <indicator class="indicator"></indicator>
                </slider>
            </cell>
            <cell v-for="item in stories"  @click="didSelectdNews(item)">
                <div class="cellContent">
                    <text class="newsTitle">{{item.title}}</text>
                    <image class="newsImg" :src="item.images[0]" v-if="item.images.length>0" resize="cover"></image>
                    <div class="line"></div>
                </div>
            </cell>
            <loading class="div-loading" :display="loadingDisplay" @loading="onLoading">
                <text class="text-tip" v-if="loadingDisplay === 'hide'">{{loadingTip}}</text>
                <text class="text-tip" v-else>加载中...</text>
            </loading>
        </list>
        <Navbar class="navbar" :leftItemSrc="leftItemSrc" @naviBarLeftItemClick="onClickLeft"></Navbar>
        <div class="maskView" @click="hideLeft(200)" v-if="showMask"></div>
    </div>

    <div ref="left" class="leftMenu" :style="{bottom:leftMenuBottom}">
        <div class="left-header">
            <div class="fr">
                <image class="left-uerIcon" :src="userSrc"></image>
                <text class="left-title left-login">请登录</text>
            </div>
            <div class="left-headerBottomDiv fr">
                <div class=".h-center">
                    <image :src="Dark_Menu_Icon_Collect" class="Dark_Menu_Icon"></image>
                    <text class="left-title sub-title">收藏</text>
                </div>
                <div class=".h-center">
                    <image :src="Dark_Menu_Icon_Message" class="Dark_Menu_Icon"></image>
                    <text class="left-title sub-title" >消息</text>
                </div>
                <div class=".h-center">
                    <image :src="Dark_Menu_Icon_Setting" class="Dark_Menu_Icon"></image>
                    <text class="left-title sub-title">设置</text>
                </div>
            </div>
        </div>
        <list class="left-center" show-scrollbar="false">
                <cell>
                    <div class="menuTitleDiv fr">
                        <div class="fr v-center">
                            <image :src="Dark_Menu_Icon_Home" class="Dark_Menu_Icon_Home"></image>
                            <text class="left-title">首页 </text>
                        </div>
                        <image :src="Menu_Enter" class="Dark_Menu_Follow"></image>
                    </div>
                </cell>
                <cell v-for="item in others">
                    <div class="menuTitleDiv fr">
                        <text class="left-title">{{item.name}}</text>
                        <image :src="Dark_Menu_Follow" class="Dark_Menu_Follow"></image>
                    </div>
                </cell>
            </list>
        <div class="left-footer fr">
            <div class="fr Dark_BottomMenuDiv to-left">
                <image :src="Dark_Menu_Download" class="Dark_Menu_BottomIcon"></image>
                <text class="left-title bottom-subTitle">离线</text>
            </div>
            <div class="fr Dark_BottomMenuDiv to-right">
                <image :src="Menu_Dark" class="Dark_Menu_BottomIcon"></image>
                <text class="left-title bottom-subTitle">夜间</text>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    import Api from '../api/api.js'
    import Navbar from '../componets/navbar.vue'
    import Evn from '../utils/evn.js'

    const animation = weex.requireModule('animation')
    const navigator = weex.requireModule('navigator')

    export default {
        components: {
            Navbar
        },
        data () {
            return {
                page: 0,
                refreshTip: '↓ 下拉刷新',
                loadingTip: '↑ 上拉加载',
                refreshDisplay: 'hide',
                loadingDisplay: 'hide',
                refreshPause: false,
                loadingPause: false,
                resdata: '',
                stories: [],
                leftItemSrc: Api.imgUrl + 'zhihu/menu.png',
                userSrc: Api.imgUrl + 'zhihu/user.png',
                Dark_Menu_Icon_Collect: Api.imgUrl + 'zhihu/Dark_Menu_Icon_Collect@2x.png',
                Dark_Menu_Icon_Message: Api.imgUrl + 'zhihu/Dark_Menu_Icon_Message@2x.png',
                Dark_Menu_Icon_Setting: Api.imgUrl + 'zhihu/Dark_Menu_Icon_Setting@2x.png',
                Dark_Menu_Follow: Api.imgUrl + 'zhihu/Dark_Menu_Follow@2x.png',
                Dark_Menu_Download: Api.imgUrl + 'zhihu/Dark_Menu_Download@2x.png',
                Menu_Dark: Api.imgUrl + 'zhihu/Menu_Dark@2x.png',
                Menu_Enter: Api.imgUrl + 'zhihu/Menu_Enter@2x.png',
                Dark_Menu_Icon_Home: Api.imgUrl + 'zhihu/Dark_Menu_Icon_Home@2x.png',
                showMask: false,
                deviceHeight: Evn.deviceHeight + 'px',
                leftCenterH: '',
                leftMenuBottom: Evn.platform === 'iOS' ? '0px':'130px',
                others: []
            }
        },
        methods: {
            homeRequest () {
                Api.dataFetch('4/news/latest',{})
                    .then(res => {
                      this.refreshDisplay = 'hide'
                      this.resdata = res
                      if (res.stories.length>0) {
                         this.stories = res.stories
                      }else  {
                         this.onReset()
                      }
//			          console.log(res)
                    }).catch(res => {
                        this.refreshDisplay = 'hide'
                })
            },
            newsBeforeRequest (date) {
                const url =  '4/news/before/' + date
                console.log('url = ',url)
                Api.dataFetch(url,{})
                    .then(res => {
                        if (res.stories.length>0) {
                            this.stories = this.stories.concat(res.stories)
                            this.loadingDisplay = 'hide'
                        }else  {
                            this.onReset()
                        }
                    }).catch(res => {
                        this.loadingDisplay = 'hide'
                })
            },
            themesRequest () {
                Api.dataFetch('4/themes',{})
                    .then(res => {
                        this.others = res.others
//			          console.log(res)
                    }).catch(res => {
                    console.log('\n 请求失败~', res, '\n')
                })
            },
            onClickLeft () {
                this.showLeft()
                console.log('菜单')
            },
            showLeft () {
                const leftMenuEl = this.$refs.left
                this.showMask = true
                animation.transition(leftMenuEl, {
                    styles: {
                        transform:'translate(0px, 0px)',
                        transformOrigin: 'center center'
                    },
                    duration: 200,
                    timingFunction:'linear'
                }, function () {
                    console.log('finish')
                })

                const homeEl = this.$refs.home
                animation.transition(homeEl, {
                    styles: {
                        transform:'translate(450px, 0px)',
                        transformOrigin: 'center center'
                    },
                    duration: 200,
                    timingFunction:'linear'
                }, function () {
                    console.log('finish')
                })
            },
            hideLeft (duration) {
                const homeEl = this.$refs.home
                this.showMask = false
                animation.transition(homeEl, {
                    styles: {
                        transform:'translate(0px, 0px)',
                        transformOrigin: 'center center'
                    },
                    duration: duration,
                    timingFunction:'linear'
                }, function () {
                    console.log('finish')
                })

                const leftMenuEl = this.$refs.left
                animation.transition(leftMenuEl, {
                    styles: {
                        transform:'translate(-450px, 0px)',
                        transformOrigin: 'center center'
                    },
                    duration: duration,
                    timingFunction:'linear'
                }, function () {
                    console.log('finish')
                })
            },
            didSelectdNews (item) {
                return
                navigator.push({
                    url: Evn.baseUrl + 'pages/newsDetail/newsDetail.js',
                    animated: 'true'
                })
            },
            onRefresh () {
                this.refreshDisplay = 'show'
                if (this.refreshPause) {
                    this.onReset()
                    return
                }
                this.refreshPause = true
                this.page = 0
                this.homeRequest()
            },
            onLoading () {
                this.loadingDisplay = 'show'
                if (this.loadingPause) {
                    this.onReset()
                    return
                }
                this.loadingPause = true
                this.page ++
                this.newsBeforeRequest(this.getNowFormatDate())
            },
            onReset () {
                this.refreshDisplay = 'hide'
                this.loadingDisplay = 'hide'
                this.refreshPause = false
                this.loadingPause = false
            },
            getNowFormatDate () {
                var date = new Date()
                date.setTime(date.getTime() - 24*60*60*1000*this.page)
                var seperator1 = ''
                var month = date.getMonth() + 1
                var strDate = date.getDate()
                if (month >= 1 && month <= 9) {
                    month = '0' + month
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = '0' + strDate
                }
                var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                return currentdate
            }
        },
        created: function () {
            this.homeRequest()
            this.themesRequest()
            this.leftCenterH = (Evn.deviceHeight - 110 - 250 - (Evn.platform === 'iOS' ? 0:600) ) + 'px'
            console.log('created 创建完毕状态===============》',this.getNowFormatDate())
        },
        beforeMount: function () {
            console.log('beforeMount 挂载前状态===============》', this.userSrc)
        },
        mounted: function () {
            this.hideLeft(0)
            console.log('mounted 挂载结束状态===============》')
        }
    }
</script>
