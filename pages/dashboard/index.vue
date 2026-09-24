<template>
    <section class="profile">
        <div class="profile__head">
            <picture class="profile__head__pic">
                <img :src="usert?.avatar_link" alt="Avatar" v-if="usert">
            </picture>
            <div class="profile__head__des">
                <h2>{{ usert?.name}}
                    <span>{{ usert?.email }}</span>
                </h2>
                <p><UiTiptap :can-edit="false" v-model="usert.about" v-if="usert" /></p>
                
            </div>
        </div>
        <button class="btn btn-accent" @click="navigateTo('/dashboard/me')">Edit profile</button>
    </section>
    <section class="mystory">
        <h2>My Story</h2>
        <div class="mystory__content">
            <div class="mystory__content__add">
                <h3>Write your story</h3>
                <p>Sed at erat et diam elitr sanctus rebum, stet diam.</p>
                <button class="btn btn-accent" @click="navigateTo('/dashboard/create-story')">Write story</button>
            </div>
            <div class="mystory__content__story">
                <div class="card" v-for="story in st.stories" :key="story.id" @click="navigateTo(`/story/${story.slug}`)">
                    <picture class="card__pic">
                        <img :src="story?.cover_image" loading="lazy" :alt="story?.title" class="card__pic__img">
                    </picture>
                    <div class="wrap">
                        <button class="btn-act" @click="navigateTo(`/dashboard/edit-story-${story.id}`)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="white" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="lucide lucide-square-pen-icon lucide-square-pen">
                                <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                <path
                                    d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
                            </svg>
                        </button>
                        <!-- <UiModal v-if="modalType === 'edit'" @close="closeModal">
                            <h2>Edit story</h2>
                            <form action="" class="form">
                                <label for="" class="form__label">Title</label>
                                <input v-model="modalData.title" type="text" class="form__text">

                                <label for="" class="form__label">Short Content</label>
                                <input v-model="modalData.shortContent" type="text" class="form__text">

                                <label for="" class="form__label">Category</label>
                                <select name="" id="" class="form__text">
                                    <option value="">Comedy</option>
                                </select>

                                <input type="file" class="form__text" />
                                <img :src="modalData.image" alt="" style="height: 240px; width: 240px;">

                            </form>
                        </UiModal> -->
                        <button class="btn-act">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="white" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="lucide lucide-bookmark-icon lucide-bookmark">
                                <path
                                    d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z" />
                            </svg>
                        </button>
                        <button class="btn-act" @click="openModal('delete', story)"><svg
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="white" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2">
                                <path d="M10 11v6" />
                                <path d="M14 11v6" />
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                                <path d="M3 6h18" />
                                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg></button>
                        <UiModal v-if="modalType === 'delete'" @close="closeModal">
                            <h2>Delete story</h2>
                            <p>Are you sure to delete this story</p>
                            <div class="btn-wrap">
                                <button class="btn-confirm" @click="deleteStory(story.id)">Yes</button><button class="btn-cancel"
                                    @click="closeModal">Cancel</button>
                            </div>
                        </UiModal>
                    </div>

                    <div class="card__body">
                        <h3 class="card__title">{{ story.title }}</h3>
                        <Tiptap :can-edit="false" v-model="story.content" v-if="story" />
                        <!-- <p>{{ story?.content }}</p> -->
                        <div class="card__footer">
                            <span class="card__footer__category">{{ story?.category?.name }}</span>
                            <p>{{ state.formatted(story.created_at) }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <UiPaginate></UiPaginate>
    </section>
</template>

<script setup lang="ts">
import UiModal from '~/components/ui/Modal.vue'
import Tiptap from '~/components/ui/Tiptap.vue'
import type { IAuthor } from '~/types/typeIn'
const state = useStateStore()
const st = useStoryStore()

const { openModal, closeModal, modalType } = useModal()
const usert = ref<IAuthor | null>(null)


const deleteStory = async (id: string) => {
    try {
        await st.deleterStory(id)
        console.log('sudah delete');
        closeModal()
        st.getAllStories()
    } catch (err: any) {
        throw err
    }
}
onMounted(() => {
    const story = useStoryStore()
    story.getAllStories()
    const user = useUserStore()
    user.getUser()
    usert.value = user.userData
})
</script>

<style lang="scss" scoped>
.profile {
    display: grid;
    align-items: center;
    justify-items: center;
    gap: 1rem;

    &__head {
        display: grid;

        &__pic {
            width: 8rem;
            height: 8rem;
            margin-right: 1rem;
            overflow: hidden;
            border-radius: 50%;

            img {
                object-fit: cover;
                object-position: center;
                width: 100%;
                height: 100%;
            }
        }

        span,
        p {
            color: rgb(56, 56, 56);
            font-size: 12pt;
        }

        &__des {
            display: grid;

            h2 {
                display: grid;
                margin-bottom: 1rem;
            }
        }
    }
}

.btn {
    padding: $padd;
    margin: 10px 0;
    border-radius: 10px;

    &:hover,
    &:active {
        box-shadow: $shadow;
        transform: scale(0.95);
        transition: transform .5s ease-in-out;
    }
}

.mystory__content {
    display: grid;
    justify-items: center;
    gap: 1rem;

    &__add {
        gap: .5rem;
        max-height: 12rem;
        max-width: 20rem;
        margin-top: 1rem;
        padding: $padd;
        border: 2px dashed gray;
        display: grid;
        justify-items: center;

    }

    &__story {
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(1, minmax(1fr));
    }

    .card {
        max-width: 48rem;
        position: relative;

        picture {
            width: 100%;
            height: 20rem;

        }

        .wrap {
            position: absolute;
            z-index: 30;
            right: 10px;
            top: 10px;
            display: flex;
            justify-content: space-around;
            gap: 10px;

            .btn-act {
                padding: .5rem;
                border-radius: 10px;
                border: none;
                background-color: $accent;
            }
        }
    }
}

@media (width >=$lg) {

    .profile,
    .mystory__content,
    .profile__head {
        display: flex;
        justify-content: space-evenly;
    }

    .mystory__content__story {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));

    }
}

@media (width >=$lg) {}
</style>
