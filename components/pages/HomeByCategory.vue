<template>
    <div v-if="!props.stories">404</div>
    <section class="section" v-if="props.stories">
        <div class="section__header">
            <h2 class="section__title">{{ props.title }}</h2>
            <button v-if="isExplore" class="section__btn" @click="exploreLink('/story')">Explore more &rarr;</button>
        </div>
        <div :class="`section__${props.variant}`">
            <div class="card" v-for="story in props.stories" :key="story?.id"
                @click="navigateTo(`/story/${story.slug}`)">
                <picture class="card__pic">
                    <img :src="story?.cover_image" loading="lazy" :alt="story?.title" class="card__pic__img">
                </picture>
                <div class="card__body">
                    <h3 class="card__title" @click="navigateTo(`/story/${story.slug}`)">{{ story.title }}</h3>
                    <Tiptap v-if="story" style="scroll-behavior: auto;" :can-edit="false" v-model="story.content"
                        class="card__des" />

                    <div class="card__footer">
                        <div class="avatar"><img :src="story?.author?.avatar_link" alt="avatar"
                                style="border-radius: 100%; margin: 4px;"><span>{{ story?.author?.name }}</span></div>
                        <p class="line-clamp-1">{{ state.formatted(story?.created_at) }}</p>
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
        width: 100%;
        overflow-x: auto;
        gap: 36px;

        @media (width <= $lg) {
            .section__flex {
                display: grid;
                grid-template-columns: repeat(3, minmax(0, 1fr));
                // picture {
                //     // max-width: 24rem;
                //     height: 20rem;
        
                // }
            }
        }

    }

    &__grid {
        margin-top: 2rem;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;

        &>*:first-child {
            display: block;
            align-items: end;
            flex: full;
            margin: 1rem auto;

            .card__pic {
                width: 100%;
                height: 80%;
            }
        }

        &>*:not(:first-child) {
            flex: 2;

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

    .section__grid {
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
                height: 70vh;
            }
        }

        &>*:not(:first-child) {
            grid-column: span 1 / span 3;
            grid-row: span 1 / span 2;
            height: min-content;

            picture {
                width: 100%;
                max-height: 20rem;
            }
        }
    }

    .section__flex>.card>.card__pic {
        height: auto;
        max-height: 24rem;
    }
}
</style>

<script setup lang="ts">null
import type { IStory } from '~/types/typeIn';
import Tiptap from '../ui/Tiptap.vue';
import type { PropType } from 'vue';
const router = useRouter()
const state = useStateStore()
const props = defineProps({

    title: { type: String, required: true },
    stories: { type: Array as PropType<IStory[] | null>, required: true },
    variant: { type: String, required: true, value: ["grid", "flex"] },
    isExplore: { type: Boolean, default: true }
})

const exploreLink = (url: string) => {
    router.push({
        path: url,
        query: { category: props.title.toLowerCase() }
    })
}
</script>