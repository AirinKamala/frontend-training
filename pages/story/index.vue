<template>
    <h1>All story</h1>
    <UiBreadcrumb :bpath="routes.path" />
    <div class="filter">
        <div class="filter__start">


            <select class="filter__start__cat" for="sort" name="sort" id="sort" v-model="draft.sort">
                <option value="asc">Order by Newest</option>
                <option value="desc">Order by Oldest</option>
            </select>



            <select class="filter__start__cat" for="sort" name="sort" id="sort" " v-model="draft.cat">
                <option value="romance"> Genre Romance</option>
                <option value="comedy"> Genre Comedy</option>
            </select>

        </div>
        <div class="filter__end">
            <UiSearch v-model="draft.q" />
        </div> 
    </div>
    <section class="wrapper">
        <div class="story card" v-for="story in state.articles" :key="story.id">
            <picture class="card__pic story__pic">
                <img :src="story?.image" loading="lazy" :alt="story?.title" class="card__pic__img">
            </picture>
            <h3 class="card__title">{{ story.title }}</h3>
            <p>{{ story.shortContent }}</p>
            <div class="card__footer">
                <div class="avatar"><img :src="story.authorAvatar" alt="avatar"
                        style="border-radius: 100%; margin: 4px;"><span>{{ story.authorName }}</span></div>
                <div class="card__footer__end">
                    <span class="card__footer__date">{{ state.formatted(story.createdDate) }}</span>
                    <span class="card__footer__category">{{ story.category }}</span>

                </div>
            </div>
        </div>
    </section>

    <UiPaginate />
</template>

<script setup lang="ts">
const routes = useRoute()
const state = useStateStore()
const draft = ref({
    sort: 'asc',
    cat: 'romance',
    q: ''

})
// const filtered 
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
            padding: .5rem;

            background-color:white;
            width: 100%;
        }
    }
    &__end {
        width: 100%;
        // justify-items: end;
    }

    

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