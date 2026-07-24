<script setup lang="ts">
import Footer from '~/components/layouts/Footer.vue';
import Header from '~/components/layouts/Logged/Header.vue';

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
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 90%;
}
</style>