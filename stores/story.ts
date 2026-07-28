import { useStoryRepository } from "~/repository/storyRepo"
import type { IStory } from "~/types/typeIn"

export const useStoryStore = defineStore('story', () => {
    const stories = ref<IStory[] | undefined>(undefined) 
    const singleStory = ref<IStory | null>(null)
    const storyRepo = useStoryRepository()

    const fetchStories = async () => {
        const data = await storyRepo.getAllStories()
        stories.value = data 
        return data
    }

    const fetchDetailStory = async (idOrSlug: string) => {
        const data = await storyRepo.getStory(idOrSlug)
        singleStory.value = data 
        return data
    }

    const getSimiliarStory = async (idOrSlug: string) => {
        const data = await storyRepo.getSimiliarStory(idOrSlug)
        stories.value = data 
        return data
    }

    return {
        stories, singleStory, fetchStories, fetchDetailStory,getSimiliarStory
    }
})