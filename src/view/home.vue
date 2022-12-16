<template>
    <n-carousel show-arrow class="carousel">
        <img src="../img/Banner_1.jpg">
        <img src="../img/Banner_2.jpg">
        <img src="../img/Banner_3.jpg">
        <img src="../img/Banner_4.jpg">
        <img src="../img/Banner_5.jpg">
    </n-carousel>
</template>

<!-- <script setup lang="ts">
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { useLoadingBar } from 'naive-ui'
const loadingBar = useLoadingBar()
onMounted(() => {
    loadingBar.finish()
})
console.log(useRoute().name)
const emit = defineEmits(['response'])
emit('response', 'home')
</script> -->

<style lang="less">
.carousel {

    border-radius: 8px;

    img {
        width: 100%;
        height: auto;
        object-fit: cover;
    }
}
</style>