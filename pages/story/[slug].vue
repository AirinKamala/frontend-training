<template>

    <UiBreadcrumb :bpath="routes.path" />
    <section class="shead" v-if="story">
        <p class="shead__date">{{ state.formatted(story.created_at) }}</p>
        <h1>{{ story.title }}</h1>
        <div class="avatar"><img :src="story?.author?.avatar_link || story.cover_image" alt=""><span>{{ story?.author?.name }}</span></div>
    </section>
    <section class="scontent" v-if="story">
        <picture class="scontent__pic"><img :src="story.cover_image" alt=""></picture>
        <Tiptap :canEdit="false" v-model="story.content" v-if="story"/>
    </section>
    <HomeByCategory title="Similiar Story" :stories="stories.similiarStory ?? []" variant="flex" :isExplore="false" />

</template>

<script setup lang="ts">
import HomeByCategory from '~/components/pages/HomeByCategory.vue';
import Tiptap from '~/components/ui/Tiptap.vue';

const state = useStateStore()
const stories = useStoryStore()
const story = stories.singleStory
const routes = useRoute()



onMounted(async () => {
    const slug = String(routes.params.slug)
    await stories.getDetailStoryBySlug(slug)
    const catId = String(stories.singleStory?.category.id)
    await stories.getSimiliarStory(catId, slug)

})
</script>
<style lang="scss" scoped>
.breadCrumb {
    background-color: $accent-light;
    padding: $padd;
    margin: 10px 0;
    color: $accent;

}

.shead {
    width: 100%;
    display: grid;
    justify-items: center;
    gap: 2rem;
}

.scontent {
    display: flex;
    gap: 1.5rem;
    text-align: justify;
    flex-direction: column;


    &__pic {
        overflow: hidden;
        width: 100%;
        height: 100%;
        display: flex;
        border-radius: 10px;
        box-shadow: $shadow;

        img {
            object-fit: cover;
            object-position: center;
            width: 100%;
            height: 100%;
        }
    }

}

@media (width > $md) {
    .scontent {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));

        &__pic {
            grid-column: span 1 / span 3;
        }

        &__des {
            grid-column: span 2 / span 3;
        }
    }
}
</style>