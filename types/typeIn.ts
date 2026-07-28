export interface IStory {
    id: number,
    slug: string,
    title: string,
    cover_image: string,
    created_at: string,
    content_preview: string,
    author: IAuthor,
    category: ICategory
}

export interface IAuthor {
    id: string,
    name: string,
    profile_image: string
}

export interface ICategory {
    id: 0,
    name: string,
    slug: string
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