<script setup lang="ts">

import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';

const emit = defineEmits(['taken', 'named'])
const props = defineProps({ url: { type: String, default: '' }, type: {type: String, default: 'ori'} })
const imageName = ref<String>('')
const inputEl = ref<any>(null)
const imgSrc = ref<string>('')
const croppedImg = ref<any>(null)
const result = ref<string>(props.url || '')
const chara = useUserStore().userData?.name || null
const handleFileChange = (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (file) {
        imageName.value = file.name
        const reader = new FileReader()
        reader.onload = (event) => {
            imgSrc.value = event.target?.result as string
        }
        reader.readAsDataURL(file)
    }
    return file
}

// const handleCropChange = ({ coordinates, canvas }: any) => {
//     console.log(coordinates, canvas)
// }

const crop = () => {
    if (!croppedImg.value) return
    const { canvas } = croppedImg.value.getResult()
    if (canvas) {
        result.value = canvas.toDataURL('image/jpeg')
    }
    croppedImg.value = null
    imgSrc.value = ''
    emit('taken', result.value)
    emit('named', imageName.value)
}

</script>

<template>

    <div class="cropper" v-if="type==='ori'">
        <label for="cover">Cover Story</label>
        <ClientOnly v-if="imgSrc">
            <div class="cropper__crop">
                <Cropper :src="imgSrc" :stencil-props="{
                    aspectRatio: 1 / 1
                }" ref="croppedImg" />
                <div class="btn-wrap">
                    <UiButton style=" padding: .5rem 1rem;" type="border" class="btn-cancel" @btn-click="imgSrc = ''">
                        Cancel</UiButton>
                    <UiButton style=" padding:.5rem 1rem;" @btn-click="crop">Crop</UiButton>
                </div>
            </div>
        </ClientOnly>

        <div v-if="result" class="cropper__result">
            <img :src="result" alt="">
            <p style="color: #333333; margin: .4rem;">{{ imageName }}</p>
            <UiButton @btn-click="result = ''" style=" padding:.5rem 1rem;" type="remove">Remove image</UiButton>
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

    <div class="cropper" v-if="type === 'profile'">
        <ClientOnly v-if="imgSrc">

            <div class="cropper__crop">
                <Cropper :src="imgSrc" :stencil-props="{
                    aspectRatio: 1 / 1
                }" ref="croppedImg" />
                <div class="btn-wrap">
                    <UiButton style=" padding: .5rem 1rem;" type="border" class="btn-cancel" @btn-click="imgSrc = ''">
                        Cancel</UiButton>
                    <UiButton style=" padding:.5rem 1rem;" @btn-click="crop">Crop</UiButton>
                </div>
            </div>
        </ClientOnly>
        <div class="cropper-profile"  v-if="result">
            <div class="cropper-profile__content">
                <img class="" :src="result" alt="">
            </div>
            <input type="file" accept="images/*" ref="inputEl" @change="handleFileChange" id="cover" hidden>
            <div class="cropper__add" @click="inputEl.click()">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-image-plus-icon lucide-image-plus">
                    <path d="M16 5h6" />
                    <path d="M19 2v6" />
                    <path d="M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5" />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                    <circle cx="9" cy="9" r="2" />
                </svg>
            </div>
        </div>

        <div class="cropper-profile"  v-if="!imgSrc && !result">
            <div class="cropper-profile__content">
                {{ chara?.at(0) }}
            </div>
            <input type="file" accept="images/*" ref="inputEl" @change="handleFileChange" id="cover" hidden>
            <div class="cropper__add" @click="inputEl.click()">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-image-plus-icon lucide-image-plus">
                    <path d="M16 5h6" />
                    <path d="M19 2v6" />
                    <path d="M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5" />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                    <circle cx="9" cy="9" r="2" />
                </svg>
            </div>
        </div>
    </div>

</template>
<style lang="scss" scoped>
.cropper {
    height: auto;
    padding: $padd;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    border-radius: 10px;
    width: 100%;
    max-width: 600px;

    &-profile {
        position: relative;
        border: none;
        display: flex;
        align-self: flex-start;

        &__content {
            border-radius: 50%;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 12rem;
            height: 12rem;
            font-weight: 700;
            font-size: 48pt;
            background-color: $accent-light;
            border: .2rem solid $accent;
            color: $accent;
            img {
                height: 12rem;
                object-position: center;
                object-fit: contain;
            }
        }
    }

    &-ori{
    border: $border-gray;
    }
    &__add {
        background-color: $accent;
        color: white;
        padding: .5rem;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        right: 0;
        z-index: 30;
        position: absolute;
        bottom: 0;
    }

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

        img,
        .img__result {
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