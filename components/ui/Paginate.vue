<template>
    <section class="paginate">
        <div class="paginate__level" v-if="page > 1" @click="navigatePage(page-1)">&larr; Prev</div>
        <div class="paginate__level" v-if="page > 1"  @click="navigatePage(page-1)">{{ page - 1 }}</div>
        <div class="paginate__level paginate__level__active">{{ page }}</div>
        <div class="paginate__level" v-if="page + 1 < totalPagi"  @click="navigatePage(page+1)">{{ page + 1 }}</div>
        <div class="paginate__level" v-if="totalPagi -2 > page">....</div>
        <div class="paginate__level" v-if="page < totalPagi"  @click="navigatePage(totalPagi)" >{{ totalPagi }}</div>
        <div class="paginate__level" v-if="page < totalPagi"  @click="navigatePage(page + 1)">Next &rarr; </div>
    </section>
</template>

<script setup lang="ts">
const props = defineProps({paginate: { type: String, value: ["filter", "normal"], default: "normal" } })
const story = useStoryStore()
const pageNum = computed(()=> story.pageNum)
const st = useStateStore()
const page = computed(()=>st.filterParams.page)
const totalPagi = computed(() =>  Math.ceil((pageNum.value || 0) / st.filterParams.limit ) || 1)
const userId = computed(()=>useUserStore().userData?.id)

const navigatePage =  async(toPage: number) => {
    try {
        // if (toPage < 1 || toPage > totalPagi.value || toPage === page.value) return

    if (props.paginate === "filter") {
        // ONLY update the state here. The parent watcher will catch this change and run filteredStory()
        st.filterParams.page = toPage
    } else if (props.paginate === "normal" && userId.value) {
        // For normal mode (dashboard), update state and trigger directly
        st.filterParams.page = toPage
        await story.getStoryByUserId(userId.value, toPage)
    }
    } catch (err:any) {
        console.log(err);
    }
    
}
</script>

<style lang="scss" scoped>
.paginate {
    display: flex;
    gap: 1rem;
    width: fit-content;
    margin: 2rem auto;
    justify-content: justify-center;

    &__level {
        cursor: pointer;
        background-color: $accent-light;
        padding: .5rem;
        min-width: 2rem;
        text-align: center;

        &__active {
            background-color: $accent;
            color: white;
        }
    }
}
</style>