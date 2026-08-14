<script setup lang="ts">
import Footer from '~/components/layouts/Footer.vue';
import Header from '~/components/layouts/Header.vue';

const routes = useRoute()
const isAuthPage = computed(()=>{
    if(routes.path === '/login' || routes.hash === '/register') return '#eff5ec'
    return 'white'
})
</script>

<template>
    <Header></Header>
    <main :style="`background-color: ${isAuthPage};`">
        <slot></slot>
    </main>
    <Footer></Footer>
</template>
<style lang="scss" scoped>
main{
    overflow-x: hidden;
    padding: 0 4% ;
}
</style>