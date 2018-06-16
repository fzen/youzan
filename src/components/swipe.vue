<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swp-page swiper-slide" v-for="list in lists" :key="list.id">
                <a class="js-no-follow" :href="list.linkTo">
                    <img class="goods-main-photo fadeIn" :src="list.img">
                </a>
            </div>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>

<style>
.swiper-container {
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    z-index: 1;
}
</style>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.css";
export default {
    name: "swipe",
    props: {
        lists: {
            type: Array,
            required: true
        }
    },
    mounted() {
        var mySwiper = new Swiper(".swiper-container", {
            loop: true,
            pagination: {
                el: ".swiper-pagination"
            },
            autoplay: {
                disableOnInteraction: false,
            }
        });
    }
};
</script>


