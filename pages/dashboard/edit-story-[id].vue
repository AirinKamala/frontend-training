<script setup lang="ts">
import type { IStory } from '~/types/typeIn'


const stories = useStoryStore()
const supabase = useSupabaseClient()
const state = useStateStore()
const take = ref<any | null>(null)
const draft = ref<IStory | null>(null)
const oldImage = ref<string | undefined>(undefined)


const uploadImg = async () => {
    const upImg = state.base64ToBlob(take.value)
    if (!draft.value?.cover_image) return
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
const routes = useRoute()

const loadData = async () => {
    const storyId = routes.params.id
    try {
        stories.fetchCategories()
        const data = await stories.getDetailStory(String(storyId))
        if (data) {
            draft.value = {
                cover_image: data.cover_image || '',
                ...data,
            }
        }
        oldImage.value = data?.cover_image ?? undefined
        console.log('nilai oldimage di load data'+ oldImage.value)
    } catch (err: any) {
        throw err
    }
}

const handleEdit = async () => {
    if(!draft.value) return
    if (!draft.value?.cover_image?.includes('https://')) {await uploadImg()}
    const ids = draft.value.id
    const payload = {
        slug: draft.value.title.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9\s-]/g, ''),
        cover_image: draft.value.cover_image,
        title: draft.value.title,
        content: draft.value.content,
        category_id: draft.value.category.id,
    }
    await stories.updateStory(ids, payload, oldImage.value)
    navigateTo('/dashboard')
}

onMounted(() => loadData())

</script>
<template>
    <section class="section">
        <div class="section__header">
            <div class="section__header__logo " style="width: 8rem;"><svg @click="$router.go(-1)"
                    xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-chevron-left-icon lucide-chevron-left">
                    <path d="m15 18-6-6 6-6" />
                </svg></div>
            <h1>Edit Story</h1> 
        </div>
        <form action="" v-if="draft">
            <label for="title">Story Title</label>
            <UiInput id="title" :place="'A cat and dog'" v-model="draft.title" />

            <label for="category">Category</label>
            <select name="" id="" v-model="draft.category.id">
                <option value="" selected hidden>-- Select Category --</option>
                <option v-for="cat in stories.categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
            </select>

            <UiField :sett="draft.content" @tip="draft.content = $event" />
            <UiCrop @named="draft.cover_image = $event" @taken="take = $event" :url="draft.cover_image" />
        </form>
        <UiButton type="accent" class="btn" @btn-click="handleEdit">{{stories.isLoading ? 'Submit' : 'Loading....'}}</UiButton>

    </section>
</template>

<style lang="scss" scoped>
h1 {
    align-items: center;
    display: flex;
}

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

.section__header {
    display: flex;
    align-items: center;
    margin: 1rem 0;
}
</style>