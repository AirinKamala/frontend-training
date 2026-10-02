import { StoryRepository } from "~/repository/StoryRepository"
import type { ICategory, IPayloadStory, IStory } from "~/types/typeIn"

export const useStoryStore = defineStore('story', () => {
    const stories = ref<IStory[] | null>([])

    const singleStory = ref<IStory | null>(null) 
    const similiarStory = ref<IStory[] | null>(null)
    const categories = ref<ICategory[] | null>(null)
    const isLoading = ref(false)
    const errMes = ref<string | null>(null)
    const storyRepo = new StoryRepository()
    const pageNum = ref<any>()
    const limit = computed(()=> useStateStore().filterParams.limit || 4)


    async function addStory(cred: any) {
        isLoading.value = true
        errMes.value = null

        try {
            const response = await storyRepo.addStory({ ...cred })
            return response
        } catch (err: any) {
            errMes.value = 'Failed add new story'
            throw err
        } finally{
            isLoading.value = false
        }
    }

    async function getDetailStory(id:string) {
        isLoading.value = true
        errMes.value = null
        singleStory.value = null
        try {
            const response = await storyRepo.getDetailStory(id)
            if(!response) return
            return singleStory.value = response
        } catch (er:any) {
            errMes.value = 'Failed fetch story'
            throw er
        } finally {isLoading.value = false}
    }

    async function getDetailStoryBySlug(slug:string) {
        isLoading.value = true
        errMes.value = null
        singleStory.value = null
        try {
            const response = await storyRepo.getDetailStoryBySlug(slug)
            if(!response) return
            return singleStory.value = response
        } catch (er:any) {
            errMes.value = 'Failed fetch story'
            throw er
        } finally {isLoading.value = false}
    }

    async function getAllStories(page:number=1, limitPage:number = limit.value) {
        isLoading.value = true
        errMes.value = null
        stories.value = null
        try {
            const response = await storyRepo.getAllStories(page, limitPage)
            stories.value = response.stories
            pageNum.value = Math.ceil((response.totalCount || 0) / limitPage) || 1
            console.log(response)
        } catch (err:any) {
            errMes.value = err.message || 'Failed fetch stories'
            throw errMes
        } finally { isLoading.value = false}
    }

    async function getStoryByUserId( userId:string, page:number=1,) {
        isLoading.value = true
        errMes.value = null
        stories.value = null
        const limit = computed(()=> useStateStore().filterParams.limit)
        try {
            const response = await storyRepo.getUserStory(page,limit.value, userId )
            stories.value = response.stories
            pageNum.value = response.totalCount
            console.log(response)
        } catch (err:any) {
            errMes.value = err.message || 'Failed fetch stories'
            throw errMes
        } finally { isLoading.value = false}
    }

    async function updateStory(id: string, story:IPayloadStory, oldImage?:string) {
        isLoading.value = true
        errMes.value = null
        try {
            const response = await storyRepo.updateStory(id, story, oldImage)
            singleStory.value = response
        } catch (err: any) {
            errMes.value = err.message
            throw errMes
        } finally { isLoading.value = false}
    }

    async function deleteStory(id:string, cover_image?: string) {
        isLoading.value = true
        errMes.value = null
        try {
            const response = await storyRepo.deleteStory(id, cover_image)            
            return response
        } catch (err: any) {
            errMes.value = err.message
            throw err
        } finally {
            isLoading.value = false
        }
    }

    async function getSimiliarStory(catId:string, slug:string) {
        isLoading.value = true
        errMes.value = null
        similiarStory.value = null
        try {
            const response = await storyRepo.getSimiliarStory(catId, slug)            
            similiarStory.value = response
        } catch (err:any) {
            errMes.value = err.message
            throw err
        } finally {
            isLoading.value = false
        }

    }

    async function fetchCategories() {
        isLoading.value = true
        errMes.value = null
        try {
            const response = await storyRepo.getCategory()
            categories.value = response
        } catch (err: any) {
            errMes.value = err.message || 'Gagal mengambil data category'
            throw errMes
        } finally{ isLoading.value = false}
    }

    return {
        stories, addStory, fetchCategories, categories, getDetailStory, getAllStories, singleStory, updateStory, isLoading, deleteStory, getSimiliarStory,getDetailStoryBySlug, similiarStory, pageNum, getStoryByUserId
    }
})