<script setup lang="ts">
import Banner from '~/components/pages/Banner.vue';
import HomeByCategory from '~/components/pages/HomeByCategory.vue';
import Latest from '~/components/pages/Latest.vue';
const {articles} = useStateStore();
const story = useStoryStore()

const { data, pending, error, refresh } = await useAsyncData('get-all-stories', ()=> story.fetchStories())
</script>

<template>
 <Banner />
 <Latest />
 <hr>
 <HomeByCategory title="Comedy" :stories="(data?? []).slice(4,7)" variant="grid" /> 
 <HomeByCategory title="Romance" :stories="(data?? []).slice(0,3)" variant="flex" />

</template>
