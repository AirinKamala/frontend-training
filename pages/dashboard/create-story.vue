<script setup lang="ts">
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';

const draft = ref({
    title: '',
    category: '',
    content: '',
    cover_image: ''
})
const supabase = useSupabaseClient()
const take = ref<any | null>(null)
const sate = useStateStore()
const auth = useUserStore()
const story = useStoryStore()

const handleAddStory = async () => {
    try {
        await uploadImg()
        const payload = {
            title: draft.value.title,
            slug: draft.value.title.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9\s-]/g, ''),
            category_id: draft.value.category,
            cover_image: draft.value?.cover_image,
            content: draft.value.content,
            author_id: auth.user?.id
        }

        const { data } = await story.addStory(payload)
        console.log(data);
        if(!data) return
        
        await navigateTo('/dashboard')
    } catch (err: any) {
        console.log(err);
        throw err
    }
}

const uploadImg = async () => {
const upImg = sate.base64ToBlob(take.value)
    try {
        const imgName = `${Date.now()}_${draft.value.cover_image}`;
        const { error } = await supabase.storage.from('cover').upload(imgName, upImg)
        if (error) return console.log(error.message + ' masalah upload photo')
        const { data: linkUrl } = supabase.storage.from('cover').getPublicUrl(imgName)
        draft.value.cover_image = linkUrl.publicUrl
        return linkUrl.publicUrl
    } catch (err: any) {

    }
}


onMounted(()=>{story.fetchCategories(); auth.getUser()})
</script>
<template>
    <section class="section">
        <div class="section__header">
            <div class="section__header__logo" style="width: 8rem;"><svg @click="$router.go(-1)"
                    xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide-chevron-left lucide-chevron-left-icon lucide">
                    <path d="m15 18-6-6 6-6" />
                </svg></div>
            <h1>Create New Story</h1>
        </div>
        <form action="">
            <label for="title">Story Title</label>
            <UiInput id="title" :place="' A cat and dog'" v-model="draft.title" />

            <label for="category">Category</label>
            <select name="" id="" v-model="draft.category">
                <option value="" selected hidden>-- Select Category --</option>
                <option v-for="cat in story.categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
            </select>

            <UiField @tip="draft.content = $event"/>
            <UiCrop @named="draft.cover_image = $event" @taken="take = $event" />
        </form>
        <UiButton type="accent" class="btn" @btn-click="handleAddStory">Submit</UiButton>
    </section>
</template>

<style lang="scss" scoped>
.sub {
    padding: $padd;
    border-radius: 10px;
}
.btn{
    padding:  $padd;
    margin: 1rem 0;
    width: 12rem;
    justify-content: center;
    display: flex;
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

.section__header {
    display: flex;
    align-items: center;
    margin: 1rem 0;
}
</style>