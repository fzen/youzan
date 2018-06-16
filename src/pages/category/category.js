import 'modules/css/common.css'
import './category.css'
import Vue from 'vue'
import axios from 'axios'
import url from 'modules/js/api.js'
import Foot from 'components/Foot.vue'

new Vue({
    el: '#app',
    data() {
        return {
            topLists: null,
            topIndex: 0,
            subData: null,
            rankData: null
        }
    },
    components: {
        Foot
    },
    created() {
        this.getTopLists()
        this.getSubLists(0)
    },
    updated() {  
        document.querySelector('.main-content').scrollTo(0,0)
    },
    methods: {
        getTopLists() {
            axios({
                url: url.topLists,
                method: 'get',
            }).then(res=>{
                this.topLists = res.data.lists
            })
        },
        getSubLists(index,id) {
            this.topIndex = index
            if(index===0){
                this.getRank()
            }else {
                axios({
                    url: url.subLists+'?id='+id,
                    method: 'get',
                    data: {
                        id
                    }
                }).then(res=>{
                    this.subData = res.data.data
                })
            }  
        },
        getRank() {
            axios({
                url: url.rankLists,
                method: 'get',
            }).then(res=>{
                this.rankData = res.data.data
            })
        },
        toSearch(keyword,categoryId) {
            if(categoryId){
                window.location.href = `./search.html?keyword=${keyword}&id=${categoryId}`
            }else {
                window.location.href = `./search.html?keyword=${keyword}`         
            }
        }
    }
})