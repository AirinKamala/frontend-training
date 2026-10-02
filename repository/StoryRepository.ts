import type { Database } from "~/types/database.types";
import type { IError } from "~/types/IAuthRepository";
import type { IAuthor, ICategory, IPaginate, IPayloadStory, IStory } from "~/types/typeIn";

export class StoryRepository {
    private get supabase() {
        return useSupabaseClient<Database>()
    }
    private bucketName = 'cover'
    state = useStateStore()
    async addStory(cred: any): Promise<any> {
        const { data, error } = await this.supabase.from('stories').insert({ ...cred }).select()
        if (error) {
            const mappedError: IError = {
                status: String(error.code) || '400',
                message: error.message
            }
            throw mappedError
        }
        return { data }
    }

    async getAllStories(page: number = 1, limit: number = 10): Promise<IPaginate> {
        const prev = (page - 1) * limit
        const next = prev + limit - 1
        const { data, count, error } = await this.supabase.from('stories').select(`
              id,
             slug,
             cover_image,
             title,
             created_at,
             content,
             author:users(id, name, avatar_link),
             category:categories(*)
            `, { count: 'exact' }).order('created_at', { ascending: false }).range(prev, next)
        if (error) {
            const mappedError: IError = {
                status: String(error.code) || '400',
                message: error.message
            }
            throw mappedError
        }
        const formattedData: IStory[] = data.map(item => ({
            id: item.id,
            slug: item.slug,
            cover_image: item.cover_image,
            title: item.title,
            created_at: item.created_at,
            content: item.content,
            author: Array.isArray(item.author) ? item.author[0] : item.author,
            category: Array.isArray(item.category) ? item.category[0] : item.category
        }))

        return {
            stories: formattedData,
            totalCount: count || 0
        }
    }

    async getUserStory(page: number = 1, limit: number = 10, userId: string ): Promise<IPaginate> {
        const prev = (page - 1) * limit
        const next = prev + limit - 1
        const { data, count, error } = await this.supabase.from('stories').select(`
              id,
             slug,
             cover_image,
             title,
             created_at,
             content,
             author:users(id, name, avatar_link),
             category:categories(*)
            `, { count: 'exact' }).eq('author_id', userId).order('created_at', { ascending: false }).range(prev, next)
        if (error) {
            const mappedError: IError = {
                status: String(error.code) || '400',
                message: error.message
            }
            throw mappedError
        }
        const formattedData: IStory[] = data.map(item => ({
            id: item.id,
            slug: item.slug,
            cover_image: item.cover_image,
            title: item.title,
            created_at: item.created_at,
            content: item.content,
            author: Array.isArray(item.author) ? item.author[0] : item.author,
            category: Array.isArray(item.category) ? item.category[0] : item.category
        }))
        console.log(count);

        return {
            stories: formattedData,
            totalCount: count || 0
        }
    }

    async getDetailStory(id: string): Promise<IStory> {
        const { data, error } = await this.supabase.from('stories').select(`
             id,
             slug,
             cover_image,
             title,
             created_at,
             content,
             category:categories(id)
            `).eq('id', id).single()
        if (error) {
            const mappedError: IError = {
                status: String(error.code) || '400',
                message: error.message
            }
            throw mappedError
        }
        const story: IStory = {
            id: data.id,
            slug: data.slug,
            cover_image: data.cover_image,
            title: data.title,
            created_at: data.created_at,
            content: data.content,
            category: data.category as unknown as ICategory
        }
        return story
    }

    async getDetailStoryBySlug(slug: string): Promise<IStory> {
        const { data, error } = await this.supabase.from('stories').select(`
             id,
             slug,
             cover_image,
             title,
             created_at,
             content,
             author:users(id, name, avatar_link),
             category:categories(id)
            `).eq('slug', slug).single()
        if (error) {
            const mappedError: IError = {
                status: String(error.code) || '400',
                message: error.message
            }
            throw mappedError
        }
        const story: IStory = {
            id: data.id,
            slug: data.slug,
            cover_image: data.cover_image,
            title: data.title,
            created_at: data.created_at,
            content: data.content,
            author: data.author as unknown as IAuthor,
            category: data.category as unknown as ICategory
        }
        return story
    }

    async updateStory(id: string, inData: IPayloadStory, oldImage?: string): Promise<any> {
        let oldPath: string | null = null;
        if (oldImage && inData.cover_image && oldImage !== inData.cover_image) {
            const parts = oldImage.split(`/${this.bucketName}/`)
            oldPath = parts.length > 1 ? String(parts[1]) : null
        }
        if (oldPath) {
            const { error } = await this.supabase.storage.from(this.bucketName).remove([oldPath])
            if (error) { console.log(error.message) } else { console.log('Success remove old image'); }
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

    async deleteStory(id: string, imagePath?: string | null): Promise<void> {
        if (imagePath) {
            const parts = imagePath.split(`/${this.bucketName}/`)
            const cleanPath = parts.length > 1 ? parts[1] : null
            console.log("clean img");
            if (cleanPath) {
                await this.supabase.storage.from(this.bucketName).remove([cleanPath])
            }
        }

        const { error } = await this.supabase.from('stories').delete().eq('id', id)
        if (error) {
            const mappedError: IError = {
                status: error.code,
                message: error.message
            }
            throw mappedError
        }

    }

    async getSimiliarStory(catId: string, slug: string): Promise<IStory[] | null> {
        const { data, error } = await this.supabase.from('stories').select('*, category: categories(id,name), author: users(id, name, avatar_link)').eq('category_id', catId).neq('slug', slug).limit(3)
        if (error) {
            const mappedError: IError = {
                status: error.code,
                message: error.message
            }
            throw mappedError
        }
        return data
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