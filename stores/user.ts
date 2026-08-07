import type { Session, User } from "@supabase/supabase-js"
import { AuthRepository } from "~/repository/AuthRepository"
import type { ILogin, IRegister } from "~/types/IAuthRepository"

export const useUserStore = defineStore('user', () => {
    const authRepo = new AuthRepository()

    const user = ref<User | null>(null)
    const isLoading = ref<Boolean>(false)
    const session = ref<Session | null>(null)
    const errorMes = ref<string | null>(null)
    const isAuth = computed(() => !!user.value)

    async function register(credentials: IRegister) {
        isLoading.value = true
        errorMes.value = null
        try {
            const response = await authRepo.register({ ...credentials })
            user.value = response.user
            session.value = response.session

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
            const response = await authRepo.login({...payload})
            if(!response.user || !response.session) {errorMes.value = response.msg}
            user.value = response.user
            session.value = response.session
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
            session.value = null
        } catch (err:any) {
            errorMes.value = err.message
            throw err
        } finally {
            isLoading.value = false
        }
    }

    return {
        register, login, logout, isAuth, user, session, errorMes, isLoading
    }
})