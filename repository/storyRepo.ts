import type { IApiFormat, IStory } from "~/types/typeIn"

export const useStoryRepository = () => {
    const api = useApi()

    const getAllStories = async():Promise<IStory[]> => {
      const response = await api<IApiFormat<IStory[]>>('/stories', {method: 'GET'})
      return response?.data ?? []
    }

    const getStory = async (idOrSlug: string): Promise<IStory | null> => {
        const response = await api<IApiFormat<IStory>>(`/stories/${idOrSlug}`, { method: 'GET' })
        return response?.data ?? null
    }

    const getSimiliarStory = async (idOrSlug: string): Promise<IStory[]> => {
        const response =  await api<IApiFormat<IStory[]>>(`/stories/${idOrSlug}/similar`, { method: 'GET' })
        return response?.data ?? []
    }
    return {
        api, getAllStories, getStory, getSimiliarStory

    }
}