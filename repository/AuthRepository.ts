import type { Session, User } from "@supabase/supabase-js";
import type { Database } from "~/types/database.types";
import type { IAuthRepository, IRegister, ILogin, IError } from "~/types/IAuthRepository";
import type { IAuthor } from "~/types/typeIn";

export class AuthRepository implements IAuthRepository {
    private get supabase() {
        return useSupabaseClient<Database>()
    }
    private bucketName = 'avatar'
    getCurrentSession(): Promise<Session | null> {
        throw new Error("Method not implemented.");
    }
    
    async register({ email, password, name }: IRegister): Promise<any> {
        const { data, error } = await this.supabase.auth.signUp({
            email, password, options: {
                data: {
                    name: name || ''
                }
            }
        })
        if (error) {
            const mappedError:IError = {
                status: String(error.code) || '400',
                message: error.message
            }
            throw mappedError
        }
        return {
            user: data.user,
            session: data.session
        }
    }

    async login({ email, password }: ILogin): Promise<any> {
        const { data, error } = await this.supabase.auth.signInWithPassword({
            email, password
        })

        if (error) {
            const mappedError:IError = {
                status: String(error.code) || '400',
                message: error.message
            }
            throw mappedError
        }
        return {
            user: data.user,
            session: data.session
        }
    }

    async logout(): Promise<void> {
        const { error } = await this.supabase.auth.signOut()
        if (error) {
            const mappedError:IError = {
                status: String(error.code) || '400',
                message: error.message
            }
            throw mappedError
        }
            return
    }

    async getCurrentUser(email:string): Promise<IAuthor> {
        const {data, error} = await this.supabase.from('users').select('id, name, email, created_at, avatar_link, about').eq('email', email).maybeSingle()
        if (error) {
            const mappedError:IError = {
                status: String(error.code) || '400',
                message: error.message
            }
            throw mappedError
        }
        if (!data) {
            const mappedData:IError = {
                status: '404',
                message: `User ${email} not found`
            }
            throw mappedData
        }
        return data as IAuthor
    }

    async updateUserProfile(payload:IAuthor, oldImage:string | null): Promise<IAuthor> {
        let oldPath: string | null = null;
        if (oldImage && oldImage !== payload.avatar_link) {
            const parts = oldImage.split(`/${this.bucketName}/`)
            oldPath = parts.length > 1 ? String(parts[1]) : null
        }
        if (oldPath) {
            const { error } = await this.supabase.storage.from(this.bucketName).remove([oldPath])
            if (error) { console.log(error.message) } else { console.log('Success remove old image'); }
        }
        const { name, email, avatar_link, about } = payload;
        console.log(payload);
        const { data, error } = await this.supabase.from('users').update({ name, email, avatar_link, about }).eq('id', payload.id).select('id, name, email, avatar_link, about, created_at').single()
        if (error) {
            const mappedError: IError = {
                status: error.code,
                message: error.message
            }
            throw mappedError
        }
        return data
    }

}