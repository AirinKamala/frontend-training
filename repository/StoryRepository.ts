import type { IError } from "~/types/IAuthRepository";
import type { ICategory, IStory } from "~/types/typeIn";

export class StoryRepository {
    private get supabase() {
        return useSupabaseClient()
    }

    async addStory(cred: any): Promise<any> {
        const { data, error } = await this.supabase.from('stories').insert({...cred})
        if (error) {
            const mappedError: IError = {
                status: String(error.code) || '400',
                message: error.message
            }
            throw mappedError
        }
        return data
    }

    async getCategory(): Promise<ICategory[]> {
        const { data , error } = await this.supabase.from('categories').select('*')

        console.log(data)
        if (error) {
            const mappedError: IError = {
                status: String(error.code) || '400',
                message: error.message
            }
            throw mappedError
        }
        return data
    }
}