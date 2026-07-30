<template>
    <section class="section">
        <div class="section__header">
            <h2 class="section__title">{{ props.title }}</h2>
            <button v-if="isExplore" class="section__btn">Explore more &rarr;</button>
        </div>
        <div :class="`section__${props.variant}`">
            <div class="card" v-for="story in props.stories" :key="story?.id">
                <picture class="card__pic">
                    <img :src="story?.cover_image" loading="lazy" :alt="story?.title" class="card__pic__img">
                </picture>
                <div class="card__body">
                    <h3 class="card__title" v-html="story?.title"></h3>
                    <Tiptap v-if="story" v-model="story.content_preview" />
                    <div class="card__footer">
                        <div class="avatar"><img :src="story?.author.profile_image" alt="avatar"
                                style="border-radius: 100%; margin: 4px;"><span>{{ story?.author.name }}</span></div>
                        <p>{{ state.formatted(story?.created_at) }}</p>
                    </div>
                </div>
            </div>
        </div>


    </section>
</template>

<style lang="scss" scoped>
.section {
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

    &__flex {
        margin-top: 2rem;
        display: flex;
        overflow-x: auto;
        gap: 36px;

        picture {
            max-width: 12rem;
            height: 12rem;

        }
    }

    &__grid {
        margin-top: 2rem;
        width: 100%;
        display: grid;
        gap: 10px;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        grid-template-rows: repeat(2, minmax(0, 1fr));

        &>*:first-child {
            display: block;
            grid-column: span 2 / span 3;
            grid-row: span 2 / span 2;
            align-items: end;

            .card__pic {
                width: 100%;
                height: 80%;
            }
        }

        &>*:not(:first-child) {
            grid-column: span 1 / span 3;
            grid-row: span 1 / span 2;

            picture {
                width: 100%;
                max-height: 20rem;
            }
        }
    }
}

@media (width >=$md) {
    picture {
        min-width: 100%;
        min-height: 20rem;
    }

    .section__flex > .card > .card__pic {
        height: auto;
        max-height: 24rem;
    }
}
</style>

<script setup lang="ts">
import type { IStory } from '~/types/typeIn';
import Tiptap from '../ui/Tiptap.vue';

const state = useStateStore()
const props = defineProps({

    title: { type: String, required: true },
    stories: { type: Array<IStory> || [], required: true },
    variant: { type: String, required: true, value: ["grid", "flex"] },
    isExplore: { type: Boolean, default: true }
})
</script>