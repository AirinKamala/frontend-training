<template>
    <Teleport to="body" v-if="isOpen"  >
        <div class="modal" @click.self="closeModal">
            <div class="modal__content">
                <slot></slot>
            </div>
        </div>
    </Teleport>
</template>

<script setup lang="ts">

const {isOpen, closeModal} = useModal()

</script>

<style lang="scss" scoped>

    .modal {
        background-color: rgba(0, 0, 0, 0.411);
        width: 100vw;
        height: 100vh;
        position: fixed;
        backdrop-filter: blur(2px);
        z-index: 999;
        display: flex;
        justify-content: center;
        align-items: center;
        &__content {
            background-color: rgb(255, 255, 255);
            min-height: 10rem;
            min-width: 14rem;
            border-radius: 10px;
            padding: $padd;
            display: grid;
            text-align: center;
            font-family: $font-dm-sans;

            
        }
    }

    



</style>