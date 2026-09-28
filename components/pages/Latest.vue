<template>

    <section class="latest">
        <div class="latest__header">
            <h2>Latest Story</h2>
            <button>Explore more &rarr;</button>
        </div>
        <div class="latest__wrapper" v-if="stories">
            <div class="card" v-for="art in stories" :key="art.id">
                <picture class="card__pic">
                    <img class="card__pic__img" alt="" loading="lazy" :src="art.cover_image">
                </picture>
                <h3 class="card__title">{{ art.title }}</h3>
                <UiTiptap :can-edit="false" v-model="art.content" class="card__des"/>
                <div class="card__footer">
                    <div class="card__footer_start avatar">
                        <img :src="art.author?.avatar_link" :alt="art.author?.name" style="border-radius: 100%;">
                        <p>{{ art.author?.name }}</p>
                    </div>

                    <div class="card__footer__end">
                        <span class="card__footer__date">{{ formatted(art.created_at) }}</span>
                        <span class="card__footer__category">{{ art.category.name }}</span>

                    </div>
                </div>

            </div>
        </div>

        <h1 v-else>Loading....</h1>
    </section>


</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import { useStateStore } from '~/stores/state';
import type { IStory } from '~/types/typeIn';
const { formatted } = useStateStore()
defineProps({ stories: { type: Array as PropType<IStory[] | []>, default: [] } })

const cutStory = (text:string)=> text.length > 0 ? text.substring(0,100) +'...' : text

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