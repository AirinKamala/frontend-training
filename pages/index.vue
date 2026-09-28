<script setup lang="ts">
import Banner from '~/components/pages/Banner.vue';
import HomeByCategory from '~/components/pages/HomeByCategory.vue';
import Latest from '~/components/pages/Latest.vue';
const story = useStoryStore()

onMounted(async()=>await story.getAllStories())
</script>

<template>
 <Banner />
 <Latest :stories="story.stories?.slice(0,8)" />
 <HomeByCategory title="Comedy" :stories="(story.stories?? []).slice(0,3)" variant="grid" /> 
 <HomeByCategory title="Romance" :stories="(story.stories?? []).slice(0,3)" variant="flex" />

</template>
