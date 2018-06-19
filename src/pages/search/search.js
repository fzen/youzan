import 'modules/css/common.css'
import './search.css'
import Vue from 'vue'
import axios from 'axios'
import url from 'modules/js/api.js'
import qs from 'qs'
import Velocity from 'velocity-animate'

let {keyword,id} = qs.parse(window.location.search.slice(1))

new Vue({
    el: '#app',
    data: {
        goodsLists: null,
        keyword,
        id,
        scrollBtn: false
    },
    created() {
        this.getSearchLists({
            keyword: this.keyword,
            id: this.id
        })
    },
    methods: {
        getSearchLists(data) {
            axios({
                url: `${url.searchLists}`,
                method: 'get',
                data,
            }).then(res=>{
                this.goodsLists = res.data.data
            })
        },
        scrollBtnChange() {
            if(document.documentElement.scrollTop > 150){
                this.scrollBtn = true 
            }else {
                this.scrollBtn = false
            }
        },
        toTop() {
            Velocity(document.documentElement,'scroll',{duration: 500})
            this.scrollBtn = false            
        }
    }
})