import './goods.css'
import './goods_common.css'
import './goods_custom.css'
import './goods_mars.css'
import './goods_sku.css'
import './goods_theme.css'

import Vue from 'vue'
import url from 'modules/js/api.js'
import axios from 'axios'
import qs from 'qs'
import Swipe from 'components/swipe.vue'

let detailsTab = ['商品详情','本店成交']
let {id} = qs.parse(window.location.search.slice(1))['id']

new Vue({
    el: '#app',
    data: {
        bannerLists: null,
        details: null,
        detailsTab,
        currentIndex: 0,
        priceIntro: false,
        dealLists: [],
        dealEmpty: false,
        dealLoading: false,
        skuType: 1,
        skuShow: false,
        skuNumber: 1,
        isAddSuccess: false,
        cartNumber: 0
    },
    components: {
        Swipe
    },
    created() {
        this.getDetails()
    },
    methods: {
        getDetails() {
            axios({
                method: 'get',
                url: url.details,
                data: {
                    id
                },
            }).then(res=>{
                this.details = res.data.data
                this.bannerLists = []
                this.details.imgs.forEach(item => {
                    this.bannerLists.push({
                        linkTo: '',
                        img: item.img
                    })
                })            
            })
        },
        changeTab(index) {
            this.currentIndex = index
            if(index===1) {
                this.dealLists = []
                this.getDealLists()
            }
        },
        getDealLists() {
            this.dealLoading = true
            axios({
                method: 'get',
                url: url.deal,
                data: {
                    id
                }
            }).then(res=>{
                this.dealLoading = false
                this.dealLists = this.dealLists.concat(res.data.data)
                if(this.dealLists.length===0){
                    this.dealEmpty = true
                }
            })
        },
        selectSku(type) {
            this.skuType = type
            this.skuShow = true
        },
        changeSkuNumber(num) { 
            this.skuNumber+=num
            if(this.skuNumber === 0){
                this.skuNumber = 1
            }
            if(this.skuNumber > this.details.storeNumber) {
                this.skuNumber = this.details.storeNumber
            }
        },
        addCart() {
            axios({
                method: 'post',
                url: url.addCart,
                data: {
                    id,
                    number: this.skuNumber
                }
            }).then(res=>{
                if(res.data.status===1){
                    this.isAddSuccess = true
                    this.cartNumber = res.data.data.cartNumber
                    setTimeout(()=>{
                        this.isAddSuccess = false
                    },2000)
                    this.skuShow = false
                }
            })
        }
    },
    watch:{
        skuShow(newVal,oldVal) {
            document.documentElement.style.height = newVal ? '100%' : 'auto'
            document.documentElement.style.overflow = newVal ? 'hidden' : 'auto'
            document.body.style.height = newVal ? '100%' : 'auto'
            document.body.style.overflow = newVal ? 'hidden' : 'auto'
        }
    }
})