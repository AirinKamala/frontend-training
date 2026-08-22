<script setup lang="ts">
import type { PropType } from 'vue';
import Footer from '~/components/layouts/Footer.vue';
import Header from '~/components/layouts/Header.vue';
import Lheader from '~/components/layouts/Logged/Header.vue';

const routes = useRoute()
const isAuthPage = computed(()=>{
    if(routes.path === '/login' || routes.hash === '/register') return '#eff5ec'
    return 'white'
})
const st = useUserStore()
</script>

<template>
    <Lheader v-if="!!st.userData"  :userdata="st.userData"/>
    <Header v-else />
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