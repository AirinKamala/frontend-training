import type { Session, User } from "@supabase/supabase-js";
import type { IAuthRepository, IRegister, ILogin, IError } from "~/types/IAuthRepository";
import type { IAuthor } from "~/types/typeIn";

export class AuthRepository implements IAuthRepository {
    private get supabase() {
        return useSupabaseClient()
    }
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
        const {data, error} = await this.supabase.from('users').select('*').eq('email', email).maybeSingle()
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

}