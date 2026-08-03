<script setup lang="ts">
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';

const draft = ref({
    title: '',
    category: '',
    content: '',
})

const take = ref<any | null>(null)

</script>
<template>
     <section class="section">
        <div class="section__header">
            <div class="section__header__logo " style="width: 8rem;"><svg @click="$router.go(-1)" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left-icon lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg></div>
            <h1>Create New Story</h1>
        </div>
        <form action="">

            <label for="title">Story Title</label>
            <UiInput id="title" :place="' A cat and dog'" v-model="draft.title" />

            <label for="category">Category</label>
            <select name="" id="">
                <option value="" selected hidden>-- Select Category --</option>
                <option value="romance">Romance</option>
                <option value="comedy">Comedy</option>
                <option value="horror">Horror</option>
            </select>

            <UiField />
            <UiCrop @taken="take = $event" />
        </form>

    </section>
</template>

<style lang="scss" scoped>
.sub {
    padding: $padd;
    border-radius: 10px;
}

label {
    color: rgb(87, 87, 87);
    font-weight: 600;
    padding-left: 1rem;
}

select {
    width: 100%;
    height: 3rem;
    padding: $padd;
    border-radius: 10px;
    background-color: white;

}
.section__header{
    display: flex;
    align-items: center;
    margin: 1rem 0;
}

</style>