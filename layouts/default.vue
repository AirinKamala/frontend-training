<script setup lang="ts">
import type { PropType } from 'vue';
import Footer from '~/components/layouts/Footer.vue';
import Header from '~/components/layouts/Header.vue';
import Lheader from '~/components/layouts/Logged/Header.vue';

const routes = useRoute()
const st = useUserStore()

const isAuthPage = computed(() => routes.path === "/login" || routes.path === "/register")
onMounted(() => {
    const mainEl = document.getElementById("main")
    watch(
        isAuthPage, (isAuth) => {
            if (!isAuth) { mainEl?.classList.add('w-6xl') }
            else { mainEl?.classList.remove('w-6xl') }
            
        }, {immediate: true}
    )
})
const bgColor = computed(() => isAuthPage.value ? '#eff5ec' : 'white')
</script>

<template>
    <Lheader v-if="!!st.userData" :userdata="st.userData" />
    <Header v-else />
    <main :style="`background-color: ${bgColor};`" id="main">
        <slot></slot>
    </main>
    <Footer></Footer>
</template>
<style lang="scss" scoped>
.w-6xl {
    @media (min-width : $sm-mx) {
        max-width: 96rem;
        margin: 0 auto;
    }

}

main {
    overflow-x: hidden;
    padding: 0 4% ;
    min-height: 90vh;
}
</style>