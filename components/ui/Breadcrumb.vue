<template>
    <div class="bread">
        <span v-for="item in breadCrumb" @click="navigateTo(item.path)" :key="item.path" class="bread__child"> / {{ item.name }}</span>
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
.bread {
    background-color: $accent-light;
    padding: $padd;
    margin: 10px 0;
    &__child {
        color: $accent;
        font-weight: 700;
        padding: .5rem .4rem;
        cursor: pointer;   
        &:hover, &:active{
            background-color: $accent;
            color: white;
            transition: all .5s ease-in-out;
        }
    }

}
</style>