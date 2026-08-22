
import type {User, Session} from '@supabase/supabase-js'

export interface IRegister {
    email: string,
    password: string,
    name: string,
}
export interface ILogin {
    email: string,
    password: string,
}

export interface IAuthRes {
    user: User | null,
    session: Session |null
}

export interface IError {
    status: string,
    message: string
}

export interface IAuthRepository {
    register(credentials: IRegister): Promise <IAuthRes >
    login(payload: ILogin): Promise <IAuthRes >
    logout() : Promise<void>
    getCurrentSession(): Promise<Session | null>

}