<script setup lang="ts">
import Footer from '~/components/layouts/Footer.vue';
import Header from '~/components/layouts/Header.vue';

</script>

<template>
    <Header></Header>
    <main>
        <slot></slot>
    </main>
    <Footer></Footer>
</template>
<style lang="scss" scoped>
main{
    margin: 0 auto;
    width: 92%;
}
</style>