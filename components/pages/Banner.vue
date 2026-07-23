<script setup lang="ts">
import Footer from '../layouts/Footer.vue';
import Header from '../layouts/Header.vue';

</script>

<template>
    <Header></Header>
    <main class="banner">
        
        <h1 class="banner__h1">
            <span> Hi, Name.<br></span>
            Welcome to Storytime</h1>
        <p class="banner_p">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur explicabo ipsum vitae
            deserunt voluptate</p>
        <div class="search">
            <input type="text" class="search__input" placeholder="Search Story">
            <span class="search__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" class="lucide lucide-search-icon lucide-search">
                    <path d="m21 21-4.34-4.34" />
                    <circle cx="11" cy="11" r="8" />
                </svg>
            </span>
        </div>
        <picture class="banner__pic">
            <img src="/assets/images/banner.webp" alt="" class="banner__pic__img">
        </picture>
    </main>

    <Footer></Footer>
</template>

<style lang="scss" scoped>
.banner {
    width: 100%;
    height: 80vh;
    padding: 2rem clamp(5%, 10%, 20%) 0  clamp(5%, 10%, 20%)  ;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    &__h1 {
        font-size: 24pt;
        font-family: $font-playfair-display;
        font-weight: 700;
        span{
            font-family: inherit

        }
    }

    .search {
        display: flex;
        align-items: center;
        width: 80%;
        &__input {
            height: 3rem;
            padding: 1rem 2rem;
            width: 100%;
        }
        &__icon{
            margin-left: -2.5rem;
            opacity: 60%;
        }
    }

    &__pic{
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: flex;
        justify-content: center;
        &__img{
            object-fit: cover;

        }
    }
}
</style>