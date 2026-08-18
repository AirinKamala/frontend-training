import type { IError } from "~/types/IAuthRepository";
import type { ICategory, IPayloadStory, IStory } from "~/types/typeIn";

export class StoryRepository {
    private get supabase() {
        return useSupabaseClient() as any
    }
    private bucketName = 'cover'
    state = useStateStore()
    async addStory(cred: any): Promise<any> {
        const { data, error } = await this.supabase.from('stories').insert({ ...cred })
        if (error) {
            const mappedError: IError = {
                status: String(error.code) || '400',
                message: error.message
            }
            throw mappedError
        }
        return data
    }

    async getAllStories(): Promise<IStory[] | null> {
        const { data, error } = await this.supabase.from('stories').select(`
              id,
             slug,
             cover_image,
             title,
             created_at,
             content,
             author:users(id, name, avatar_link),
             category:categories(*)
            `).order('created_at', {ascending:false})
        if (error) {
            const mappedError: IError = {
                status: String(error.code) || '400',
                message: error.message
            }
            throw mappedError
        }
        return data
    }

    async getDetailStory(id: string): Promise<IStory> {
        const { data, error } = await this.supabase.from('stories').select(`
             id,
             slug,
             cover_image,
             title,
             created_at,
             content,
             author:users(
                id,
                name,
                email,
                avatar_link,
                created_at,
                is_admin
             ),
             category:categories(id)
            `).eq('id', id).single()
        if (error) {
            const mappedError: IError = {
                status: String(error.code) || '400',
                message: error.message
            }
            throw mappedError
        }
        return data
    }

    async updateStory(id: string, inData: IPayloadStory, oldImage?:string): Promise<any> {
        let oldPath : string | null = null;
        if(oldImage && inData.cover_image && oldImage !== inData.cover_image) {
            const parts = oldImage.split(`/${this.bucketName}/`)
            oldPath = parts.length > 1 ? String(parts[1]) : null
        }
        if(oldPath) {
            const {error} = await this.supabase.storage.from(this.bucketName).remove([oldPath])
            if(error) {console.log(error.message)} else {console.log('Success remove old image');}
        }
        const { data, error } = await this.supabase.from('stories').update(inData).eq('id', id).select('*, category: categories(*),author: users(*)').single()
        if (error) {
            const mappedError: IError = {
                status: error.code,
                message: error.message
            }
            throw mappedError
        }
        return data
    }

    async deleterStory(id:string): Promise<any> {
        const { error} = await this.supabase.from('stories').delete().eq('id', id)
        if(error){
            const mappedError : IError = {
                status : error.code,
                message: error.message
            }
            throw error
        }
    }
    async getCategory(): Promise<ICategory[]> {
        const { data, error } = await this.supabase.from('categories').select('*')

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