<script setup lang="ts">
import Banner from '~/components/pages/Banner.vue';
import HomeByCategory from '~/components/pages/HomeByCategory.vue';
import Latest from '~/components/pages/Latest.vue';
const {articles} = useStateStore();
</script>

<template>
 <Banner />
 <Latest />
 <HomeByCategory title="Comedy" :stories="articles.filter(i => i.category === 'comedy').slice(3)" variant="grid" /> 
 <HomeByCategory title="Romance" :stories="articles.filter(i => i.category === 'romance').slice(3)" variant="flex" />
</template>
