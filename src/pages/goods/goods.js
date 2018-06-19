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

let detailsTab = ['商品详情','本店成交']
let {id} = qs.parse(window.location.search.slice(1))['id']

new Vue({
    el: '#app',
    data: {
        details: null,
        detailsTab,
        currentIndex: 0,
        priceIntro: false,
        dealLists: [],
        dealEmpty: false,
        dealLoading: false
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
        }
    }
})