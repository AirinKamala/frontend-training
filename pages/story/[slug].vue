<template>

    <UiBreadcrumb :bpath="routes.path" />
    <section class="shead" v-if="story">
        <p class="shead__date">{{ state.formatted(story.created_at) }}</p>
        <h1>{{ story.title }}</h1>
        <div class="avatar"><img :src="story?.author?.avatar_link || story.cover_image" alt=""><span>{{
            story?.author?.name }}</span></div>
    </section>
    <section class="try" v-if="story">
        <picture class="scontent__pic"><img :src="story.cover_image" alt=""></picture>
        <Tiptap :canEdit="false" v-model="story.content" v-if="story" class="scontent__des" />
    </section>
    <HomeByCategory title="Similiar Story" :stories="stories.similiarStory ?? []" variant="flex" :isExplore="false" />
</template>

<script setup lang="ts">
import HomeByCategory from '~/components/pages/HomeByCategory.vue';
import Tiptap from '~/components/ui/Tiptap.vue';

const state = useStateStore()
const stories = useStoryStore()
const story = computed(() => stories.singleStory)
const routes = useRoute()



onMounted(async () => {
    const slug = String(routes.params.slug)
    await stories.getDetailStoryBySlug(slug)
    const catId = String(stories.singleStory?.category.id)
    stories.getSimiliarStory(catId, slug)

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
    width: 100%;
    max-width: 800px;
    margin: 0 auto;

    &__pic {
        overflow: hidden;
        width: 100%;
        height: 100%;
        display: flex;
        border-radius: 10px;
        box-shadow: $shadow;
        margin-bottom: 1rem;

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
        &__pic {
            float: left;
            width: 28rem;
            margin-right: 16px;
            margin-bottom: 12px;
            border-radius: 4px;
        }
    }

}
</style>