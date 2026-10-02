import type { IError } from "./IAuthRepository"

export interface IStory {
    id: string,
    slug: string,
    cover_image?: string,
    title: string,
    created_at: string,
    content: string,
    author?: IAuthor,
    category: ICategory
}

export interface IPaginate {
    stories: IStory[],
    totalCount: number

}

export interface IPayloadStory {
    slug?: string,
    cover_image?: string,
    title?: string,
    content?: string,
    category_id?: string,
}

export interface IAuthor {
    id: string,
    name: string,
    email?: string,
    avatar_link?: string,
    about?: string,
    created_at?: string,
    is_admin?: boolean
}

export interface ICategory {
    id: string,
    name: string,
    slug: string,
    created_at: string
}

export interface IApiFormat<T> {
    message?: string,
    data?: T,
    meta?: T,
}


export interface IAuth {
    user: {
        name: string,
        email: string,
        profile_image: string | null,
        about: string | null,
        updated_at: string,
        created_at: string,
        id: number
    },
    token: string
}

export interface typeIn {
    getCategory(): Promise<ICategory[]>
    getDetailStory(): Promise<IStory>
    getAllStories(): Promise<IPaginate>
    getSimiliarStores(): Promise<IStory[] | null>
    updateStory(id: string,inData: IPayloadStory): Promise<IStory>
}