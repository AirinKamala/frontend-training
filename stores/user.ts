import type { Session, User } from "@supabase/supabase-js"
import { AuthRepository } from "~/repository/AuthRepository"
import type { ILogin, IRegister, } from "~/types/IAuthRepository"
import type { IAuthor } from "~/types/typeIn"

export const useUserStore = defineStore('user', () => {
    const authRepo = new AuthRepository()
    const user = ref<User | null>(null)
    const userData = ref<IAuthor | null>(null)

    const getUser = ()=> {
        
        if (typeof window === 'undefined') return null
        try {
            const userInfo = localStorage.getItem('user_info')
            const userAuth = localStorage.getItem('users')

            if(userInfo) userData.value = JSON.parse(userInfo)|| null
            if(userAuth) user.value = JSON.parse(userAuth)|| null
        } catch (err: any) {
            throw err.message
        }
    }
    const isLoading = ref<Boolean>(false)
    const session = ref<Session | null>(null)
    const errorMes = ref<string | null>(null)

    async function register(credentials: IRegister) {
        isLoading.value = true
        errorMes.value = null
        try {
            const response = await authRepo.register({ ...credentials })
            user.value = response.user
            session.value = response.session
            userData.value = await fetchUser(response.user.email)
            localStorage.setItem('user_info', JSON.stringify(userData.value))
            console.log(userData)
            return response
        } catch (err: any) {
            errorMes.value = err.message || 'Registration Failed'
            throw err
        } finally {
            isLoading.value = false
        }
    }

    async function login(payload: ILogin) {
        isLoading.value = true
        errorMes.value = null
        try {
            const response = await authRepo.login({ ...payload })
            if (!response.user || !response.session) { errorMes.value = response.msg }
            user.value = response.user
            session.value = response.session
            userData.value = await fetchUser(response.user.email)
            localStorage.setItem('user_info', JSON.stringify(userData.value))
            localStorage.setItem('users', JSON.stringify(user.value))
            return response
        } catch (err: any) {
            errorMes.value = err.message || 'Login failed'
            throw err
        } finally {
            isLoading.value = false
        }
    }

    async function logout() {
        isLoading.value = true
        errorMes.value = null

        try {
            await authRepo.logout()
            user.value = null
            userData.value = null
            session.value = null
            localStorage.removeItem('user_info')
            localStorage.removeItem("users")
            await navigateTo('/login')

        } catch (err: any) {
            errorMes.value = err.message
            throw err
        } finally {
            isLoading.value = false
        }
    }

    async function fetchUser(email:string) {
        try {
            const response = await authRepo.getCurrentUser(email)            
            return response
        } catch (err:any) {
            errorMes.value = err.message
            throw err
        }
    }

    async function updateProfile(datas:IAuthor, oldImage:string |null) {
        isLoading.value = true
        errorMes.value = null
        try {
            console.log(datas);
            const response = await authRepo.updateUserProfile(datas, oldImage)      
            localStorage.setItem('user_info', JSON.stringify(response))
            return response
        } catch (err:any) {
            errorMes.value = err.message
            throw err
        } finally{
            isLoading.value = false
        }
    }

    return {
        register, login, logout, user, session, errorMes, isLoading, getUser, userData, updateProfile
    }
})