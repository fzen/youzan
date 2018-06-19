import 'modules/css/common.css'
import './index.css'
import Vue from 'vue'
import axios from 'axios'
import url from 'modules/js/api.js'
import { InfiniteScroll } from 'mint-ui'
import Swipe from 'components/swipe.vue'
import Foot from 'components/Foot.vue'



Vue.use(InfiniteScroll)



var app = new Vue({
    el: '#app',
    data: {
        lists: null,
        pageNum: 1,
        pageSize: 10,
        loading: false,
        allLoaded: false,
        swipeLists: null
    },
    components: {
        Swipe,
        Foot
    },
    methods: {
        getSwipeLists(){
            axios({
                url: url.swipe,
                method: 'get'
            }).then(res=>{
                this.swipeLists = res.data.lists
            })
        },
        getHotLists(){
            this.loading = true
            axios({
                url: url.hotLists,
                method: 'get',
                data: {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize
                }
            }).then(res=>{
                if(res.data.lists.length < this.pageSize){
                    this.allLoaded = true
                }
                if(this.lists){
                    this.lists = this.lists.concat(res.data.lists)
                }else {
                    this.lists = res.data.lists
                }
                this.pageNum+=1
                this.loading = false
            })
        }
    },
    created: function(){
        this.getSwipeLists()
        this.getHotLists()
    }

})