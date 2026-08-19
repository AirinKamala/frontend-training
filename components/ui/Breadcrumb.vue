<template>
    <div class="breadCrumb">
        <span v-for="item in breadCrumb" @click="async () => await router.push(item.path)" :key="item.path"
            style="cursor: pointer; margin: 1rem; "> / <a  :href="item.path">{{ item.name }}</a></span>
    </div>

</template>

<script setup lang="ts">
const router = useRouter()
const props = defineProps({ 'bpath': { type: String, required: true } })
const breadCrumb = computed(() => {
    const parts = props.bpath.split('/').filter(Boolean)

    return parts.map((name, index) => ({
        name,
        path: '/' + parts.slice(0, index + 1).join('/'),
    }))
})
</script>
<style lang="scss" scoped>
.breadCrumb {
    background-color: $accent-light;
    padding: $padd;
    margin: 10px 0;
}
</style>