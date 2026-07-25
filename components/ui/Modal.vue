<template>
    <Teleport to="body">
        <div class="modal">
            <div class="modal__overlay" @click="$emit('close')"></div>
            <div class="modal__content">
                <slot></slot>
            </div>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
    defineEmits<{ (e: 'close'): void }>();
</script>

<style lang="scss" scoped>
.modal {
    width: 100vw;
    height: 100vh;
    overflow-y: hidden;
    inset: 0;
    position: fixed;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &__overlay {
        position: absolute;
        inset: 0;
        background-color: rgba(0, 0, 0, 0.176);
        top: 0;
        backdrop-filter: blur(2px);
        z-index: 1;
    }

    &__content {
        z-index: 2;
        position: relative;
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