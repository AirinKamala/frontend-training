<script setup lang="ts">
import Banner from '~/components/pages/Banner.vue';
import HomeByCategory from '~/components/pages/HomeByCategory.vue';
import Latest from '~/components/pages/Latest.vue';
const story = useStoryStore()
const filterStory  = (category:string)=> story.stories?.filter(e => e.category.slug === category.toLowerCase()).slice(0,3) ?? []

onMounted(async()=>await story.getAllStories(1, 10))
</script>

<template>
 <Banner />
 <Latest :stories="story.stories?.slice(0,8)" />
 <HomeByCategory title="Comedy" :stories="filterStory('comedy')" variant="grid" /> 
 <HomeByCategory title="Romance"  :stories="filterStory('romance')" variant="flex" />

</template>
