<script setup lang="ts">

import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';

const emit = defineEmits(['taken'])
const inputEl = ref<any>(null)
const imgSrc = ref<string>('')
const croppedImg = ref<any>(null)
const result = ref<any>(null)
const handleFileChange = (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
            imgSrc.value = event.target?.result as string
        }
        reader.readAsDataURL(file)
    }
    return file
}

const handleCropChange = ({ coordinates, canvas }: any) => {
    console.log(coordinates, canvas)
}

const crop = () => {
    if (!croppedImg.value) return
    const { canvas } = croppedImg.value.getResult()
    if (canvas) {
        result.value = canvas.toDataURL('image/jpeg')
    }
    croppedImg.value = null
    imgSrc.value = ''
    emit('taken', result.value)
}

</script>

<template>

    <div class="cropper">
        <label for="cover">Cover Story</label>
        <ClientOnly v-if="imgSrc">
            <div class="cropper__crop">
                <Cropper :src="imgSrc" :stencil-props="{
                    aspectRatio: 1 / 1
                }" @change="handleCropChange" ref="croppedImg" />
                <div class="btn-wrap">
                    <UiButton style=" padding: .5rem 1rem;" type="border" class="btn-cancel" @btn-click="imgSrc = ''">
                        Cancel</UiButton>
                    <UiButton style=" padding:.5rem 1rem;" @btn-click="crop">Crop</UiButton>
                </div>
            </div>
        </ClientOnly>

        <div v-if="result" class="cropper__result">
            <img :src="result" alt="">
            <UiButton @btn-click="result = null" style=" padding:.5rem 1rem;" type="remove">Remove image</UiButton>
        </div>
        <div class="cropper__content" @click="inputEl.click()" v-if="!imgSrc && !result">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="gray"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="cropper__content__logo lucide lucide-image-icon lucide-image">
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
            <span class="cropper__content__des">Choose image</span>
            <input type="file" accept="images/*" ref="inputEl" @change="handleFileChange" id="cover" hidden>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.cropper {
    height: auto;
    width: 100%;
    border: $border-gray;
    border-radius: 10px;
    padding: $padd;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    &__content {
        display: grid;
        justify-items: center;
        gap: 1rem;
        color: gray;

        &__logo {
            height: 8rem;
            width: 8rem;
        }
    }

    &__crop {
        display: flex;
        width: 100%;
        flex-direction: column;
        gap: 1rem;

        .btn-wrap {
            width: 100%;
        }

    }

    &__result {
        width: 100%;
        max-width: 320px;
        img {
            width: 100%;
            object-fit: cover;
        }
    }
}

label {
    color: rgb(87, 87, 87);
    font-weight: 600;
    padding-left: 1rem;
}
</style>