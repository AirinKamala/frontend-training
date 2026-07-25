<template>

    <section class="latest">
        <div class="latest__header">
            <h2>Latest Story</h2>
            <button>Explore more &rarr;</button>
        </div>
        <div class="latest__wrapper">
            <div class="card" v-for="art in articles" :key="art.id">
                <picture class="card__pic">
                    <img class="card__pic__img" alt="" loading="lazy" :src="art.image">
                </picture>
                <h3 class="card__title">{{ art.title }}</h3>
                <p class="card__des">&emsp; {{ art.shortContent }}</p>
                <div class="card__footer">
                    <div class="card__footer_start">
                        <img :src="art.authorAvatar" :alt="art.authorName" style="border-radius: 100%;">
                        <p>{{ art.authorName }}</p>
                    </div>

                    <div class="card__footer__end">
                        <span class="card__footer__date">{{formatted( art.createdDate)}}</span>
                        <span class="card__footer__category">{{ art.category }}</span>
                        
                    </div>
                </div>

            </div>
        </div>
    </section>

</template>

<script setup lang="ts">
import { useStateStore } from '~/stores/state';

const { articles,formatted } = useStateStore()


</script>

<style lang="scss" scoped>
.latest {

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 1rem;
        border-bottom: $border-gray;

        button {
            border: none;
            height: 2rem;
            width: 8rem;
            background-color: white;

            &:hover,
            &:active {
                border: 1px solid rgba(128, 128, 128, 0.458);
            }
        }
    }

    &__wrapper {
        margin-top: 2rem;
        overflow-x: auto;
        width: 100%;
        display: flex;
        gap: 2rem;
    }

}
</style>