<template>
    <section id="me" v-if="datas">
        <h1 class="">Profile Settings</h1>
        <hr>
        <UiCrop @named="datas.avatar_link = $event" @taken="take = $event" :url="datas.avatar_link" type="profile" />
        <form>
            <label for="title">Name</label>
            <UiInput id="title" :place="'Name...'" v-model="datas.name" />

            <label for="">Email</label>
            <UiInput disabled place="Email..." v-model="datas.email" />

            <label for="about">About</label> 

            <UiField :sett="datas.about" @tip="datas.about = $event" />
        </form>
        <UiButton style="accent" class="btn" @btn-click="saveProfile">{{ st.isLoading ? 'Loading...' : 'Save' }}</UiButton>
    </section>
</template>
<script setup lang="ts">
import type { IAuthor } from '~/types/typeIn'


const st = useUserStore()
const datas = ref<IAuthor | null>(null)
const take = ref('')
const oldAva = ref<string | null>(null)
const state = useStateStore()
const supabase = useSupabaseClient()


const uploadImg = async () => {
    console.log('before upload img');
    // if(!take) return
    if(take){ 
        console.log('upload img');
           const upImg = state.base64ToBlob(take.value)
        if (!datas.value?.avatar_link) return
        try {
            const imgName = `${Date.now()}_${datas.value.avatar_link}`;
            const { error } = await supabase.storage.from('avatar').upload(imgName, upImg)
            if (error) return console.log(error.message + ' masalah upload photo')
            const { data: linkUrl } = supabase.storage.from('avatar').getPublicUrl(imgName)
            datas.value.avatar_link = linkUrl.publicUrl
            console.log(linkUrl.publicUrl);
            return datas.value.avatar_link = linkUrl.publicUrl
        } catch (err: any) {
            throw err
        }
} else return 
}
// upload image terjadi jika -> link datas beda -> 
// upload ga terjadi kalo -> link sama 


const saveProfile = async () => {
    if (!datas.value) return
    if (datas.value.avatar_link !== oldAva.value && take) {
        await uploadImg();
    }
    const payload = {
        id: datas.value.id,
        avatar_link: datas.value.avatar_link ?? '',
        email: datas.value.email,
        name: datas.value.name,
        about: datas.value.about,
    }
    console.log(payload)
    console.log('----');
    console.log(oldAva.value);
    await st.updateProfile(payload, oldAva.value)
    navigateTo('/dashboard')
}

onMounted(() => {
    st.getUser
    datas.value = st.userData
    oldAva.value = datas.value?.avatar_link || null
})
</script>

<style lang="scss" scoped>
.btn {
    padding: $padd;
    border-radius: 10px;
}
</style>