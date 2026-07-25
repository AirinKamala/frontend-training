<template>

    <div class="breadCrumb">
        home / all story
    </div>

    <section class="shead">
        <p class="shead__date">{{ state.formatted(story.createdDate) }}</p>
        <h1>{{ story.title }}</h1>
        <div class="avatar"><img :src="story?.authorAvatar" alt=""><span>{{ story.authorName }}</span></div>
    </section>
    <section class="scontent">
        <picture class="scontent__pic"><img :src="story.image" alt=""></picture>
        <div class="scontent__des">&emsp; {{ story.shortContent }}
            <br>
            <br>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Quasi, molestiae dolore quod autem deleniti molestias quia doloribus ipsam exercitationem eos, praesentium
            commodi consectetur non et aliquam. Consequuntur deleniti laudantium voluptates?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora culpa illo ducimus magni laborum
            architecto nam, soluta debitis itaque, corporis placeat aspernatur alias? Ex doloremque pariatur eius
            minima, nihil maiores.
            <br>
            <br>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Quasi, molestiae dolore quod autem deleniti molestias quia doloribus ipsam exercitationem eos, praesentium
            commodi consectetur non et aliquam. Consequuntur deleniti laudantium voluptates?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora culpa illo ducimus magni laborum
            architecto nam, soluta debitis itaque, corporis placeat aspernatur alias? Ex doloremque pariatur eius
            minima, nihil maiores.
            <br>
            <br>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Quasi, molestiae dolore quod autem deleniti molestias quia doloribus ipsam exercitationem eos, praesentium
            commodi consectetur non et aliquam. Consequuntur deleniti laudantium voluptates?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora culpa illo ducimus magni laborum
            architecto nam, soluta debitis itaque, corporis placeat aspernatur alias? Ex doloremque pariatur eius
            minima, nihil maiores.

            <br>
            <br>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Quasi, molestiae dolore quod autem deleniti molestias quia doloribus ipsam exercitationem eos, praesentium
            commodi consectetur non et aliquam. Consequuntur deleniti laudantium voluptates?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora culpa illo ducimus magni laborum
            architecto nam, soluta debitis itaque, corporis placeat aspernatur alias? Ex doloremque pariatur eius
            minima, nihil maiores.
        </div>
    </section>

    <HomeByCategory title="Similiar Story" :stories="state.articles.slice(0, 3)" variant="flex" :isExplore="false" />


</template>

<script setup lang="ts">
import HomeByCategory from '~/components/pages/HomeByCategory.vue';

const state = useStateStore()
const story = state.articles[0]
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
    display: flex;
    gap: 1.5rem;
    text-align: justify;
    flex-direction: column;


    &__pic {
        overflow: hidden;
        width: 100%;
        height: 100%;
        display: flex;
        border-radius: 10px;
        box-shadow: $shadow;

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
        flex-direction: row;

        &__pic {
            flex: 1;
        }

        &__des {
            flex: 2;
        }
    }
}
</style>