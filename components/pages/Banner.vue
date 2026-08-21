<script setup lang="ts">
import Search from '../ui/Search.vue';
const state = useStateStore()

</script>


<template>
    <section class="banner">
        
        <h1 class="banner__h1">Welcome to Storytime</h1>
        <p class="banner_p">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur explicabo ipsum vitae
            deserunt voluptate</p>
       <Search text="Search story" v-model="state.filterParams.query" @keydown.enter="navigateTo('/story')" />
        <picture class="banner__pic">
            <img src="/assets/images/banner.webp" alt="" class="banner__pic__img">
        </picture>
    </section>

</template>

<style lang="scss" scoped>
.banner {
    width: 100%;
    height: auto;
    min-height: 60vh;
    padding: 2rem clamp(5%, 10%, 20%) 0  clamp(5%, 10%, 20%)  ;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    &__h1 {
        font-size: 60px;
        font-family: $font-playfair-display;
        font-weight: 700;
        span{
            font-family: inherit

        }
    }

    &__pic{
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: flex;
        justify-content: center;
        &__img{
            max-height: 40vh;
            width: 100%;
            height: 100%;
            object-position: top;
            object-fit: contain;

        }
    }
}
</style>