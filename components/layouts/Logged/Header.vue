<script setup lang="ts">
import type { PropType } from 'vue';
import Modal from '~/components/ui/Modal.vue';
import type { IAuthor } from '~/types/typeIn';
const { openModal, closeModal, modalType } = useModal()
const {logout} = useUserStore()
defineProps({userdata: {type: Object as PropType <IAuthor | null>, default: null}})
</script>

<template>
    
    <header class="header">
        <UiLogo />
        <!-- goes to homepage -->

        <nav class="header__nav">
            <picture class="header__nav__pic">
                <img v-if="userdata?.avatar_link" :src="userdata.avatar_link" alt="" class="header__nav__pic__img">
                <div v-else class="header__nav__pic__initial">{{ userdata?.name.at(0) }}</div>
            </picture>

            <button class="header__nav__pro dropdown">
                {{userdata?.name }} &darr;
                <div class="dropdown__content">
                    <span class="" @click="navigateTo('/dashboard')">My profile</span>
                    <span @click="openModal('logout')" class="">Logout</span>
                     <Modal v-if="modalType === 'logout'" @close="closeModal">
                        <h2>Logout</h2>
                        <p>Are you sure want to logout?</p>
                        <div class="btn-wrap">
                            <button class="btn-cancel" @click="closeModal">Cancel</button>
                            <button class="btn-confirm" @click="()=>{logout(); closeModal() }">Logout</button>
                        </div>
                    </Modal>
                </div>
            </button>
        </nav>
    </header>
</template>

<style lang="scss" scoped>
.header {
    display: flex;
    width: 100%;
    z-index: 2;
    padding: 1rem;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid rgba(196, 196, 196, 0.595);

    &__nav {
        display: flex;
        gap: .5rem;
        justify-content: space-around;
        display: flex;
        align-items: center;

        &__pic {
            height: 48px;
            width: 48px;
            border-radius: 100%;
            display: flex;
            overflow: hidden;
            border: 2px solid $accent;

            &__img {
                object-fit: cover;
            }
            &__initial{
                background-color: $accent-light;
                color: $accent;
                font-size: 24pt;
                font-weight: 700;
                justify-content: center;
                display: flex;
                width: 100%;
            }

        }

        &__pro {
            border: none;
            background-color: inherit;
            padding: 1rem;
            font-weight: 700;
            font-family: $font-dm-sans ;

            .dropdown__content {
                min-width: 72px;
                z-index: 1;
                display: none;
                margin: 1rem 0 0 -2rem;
                position: absolute;
                background-color: white;
                border: 1px solid rgba(128, 128, 128, 0.644);
                padding: 0.5em;
                box-shadow: $shadow;

                span {
                    display: block;
                    padding: 5px 10px;
                    font-weight: 500;
                    text-align: left;

                    &:hover {
                        background-color: rgb(216, 216, 216);
                    }
                }
            }

            &:hover .dropdown__content {
                display: block;
            }
        }

    }

}
</style>