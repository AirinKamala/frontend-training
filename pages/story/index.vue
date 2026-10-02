<template>
    <h1>All story</h1>
    <UiBreadcrumb :bpath="routes.path" />
    
    <div class="filter">
        <div class="filter__start">


            <select class="filter__start__cat" for="sort" name="sort" id="sort" v-model="state.filterParams.asc">
                <option :value="true">Order by Newest</option>
                <option :value="false">Order by Oldest</option>
            </select>



            <select class="filter__start__cat" for="sort" name="sort" id="sort" v-model="state.filterParams.cat">
                <option value=""> All genre</option>
                <option v-for="cat in stories.categories" :key="cat.id" :value="cat.slug">{{ cat.name }}</option>
            </select>

        </div>
        <div class="filter__end">
            <UiSearch v-model="state.filterParams.query" />
        </div>
    </div>
    <p v-if="!storyData || storyData?.length === 0" class="notfound">There no matched articles</p>
    <section class="wrapper" v-else>
        <div class="story card" v-for="story in state.articles" :key="story.id"
            @click="navigateTo(`/story/${story.slug}`)">
            <picture class="card__pic story__pic">
                <img :src="story?.cover_image" loading="lazy" :alt="story?.title" class="card__pic__img">
            </picture>
            <h3 class="card__title">{{ story.title }}</h3>
            <UiTiptap :can-edit="false" v-model="story.content" class="card__des" />
            <div class="card__footer">
                <div class="avatar"><img :src="story.author?.avatar_link" alt="avatar"
                        style="border-radius: 100%; margin: 4px;"><span>{{ story.author?.name }}</span></div>
                <div class="card__footer__end">
                    <span class="card__footer__date">{{ state.formatted(story.created_at) }}</span>
                    <span class="card__footer__category">{{ story.category.name }}</span>

                </div>
            </div>
        </div>
    </section>

    <UiPaginate paginate="filter" />
</template>

<script setup lang="ts">
const routes = useRoute()
const state = useStateStore()
const stories = useStoryStore()

const storyData = computed(() => state.articles ?? [])

let timeoutId: ReturnType<typeof setTimeout>
  watch(() => (state.filterParams), (newVal, oldVal, onCleanUp) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(async() => {
        if(oldVal && (newVal.cat !== oldVal.cat || newVal.query !== oldVal.query)) {newVal.page = 1}
        try {
            console.log("fetcher");
            await state.filteredStory(newVal)
        } catch (err:any) {
            console.log(err);
        }
    }, 300)
  }, {deep:true, immediate: true})

  


onMounted(async () => {
    const routes = useRoute()
    const st = useStateStore()
    const stories = useStoryStore()
    st.filterParams = {
        ...st.filterParams,
        query: String(routes.query.ssearch || ''),
        cat: String(routes.query.category || ''),
        asc: Boolean(routes.query.order),
        page: 1
    }
    await st.filteredStory(st.filterParams)
    await stories.fetchCategories()
})
onUnmounted(() => {
  clearTimeout(timeoutId)
  state.filterParams = {
    query: '',
    cat: '',
    asc: true,
    limit: 2,
    page: 1
  }
})
</script>

<style lang="scss" scoped>
.filter {
    margin-top: 2rem;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    display: grid;

    &__start {
        gap: 10px;
        display: flex;
        justify-content: space-between;

        &__cat {
            border: 1px solid gray;
            padding: 1rem .5rem;
            background-color: white;
            width: 100%;
            min-width: 8rem;
            height: 3rem;
        }
    }

    &__end {
        width: 100%;
    }
}

.notfound {
    font-size: 2rem;
    text-align: center;
    color: #474747;
    align-self: center;
    width: inherit;
}

.wrapper {
    display: grid;
    gap: 1rem;
    margin-top: 2rem;

    .story {
        &__pic {
            width: 100%;
        }

    }

}


@media (width >=$sm-mx) {
    .wrapper {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .filter {
        display: flex;
        justify-content: space-between;
    }
}

@media (width >=$lg) {
    .wrapper {
        grid-template-columns: repeat(3, minmax(0, 1fr));

    }
}
</style>