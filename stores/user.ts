import type { Session, User } from "@supabase/supabase-js"
import { AuthRepository } from "~/repository/AuthRepository"
import type { ILogin, IRegister } from "~/types/IAuthRepository"

export const useUserStore = defineStore('user', () => {
    const authRepo = new AuthRepository()

    const user = ref<User | null>(null)
    //     "id": "5e185d41-7b4e-449e-a7d4-d778bbe9a928", 
    //     "aud": "authenticated", "role": "authenticated", 
    //     "email": "janedoe@test.com", 
    //     "email_confirmed_at": "2026-08-07T06:09:37.089098Z", 
    //     "phone": "", "confirmed_at": "2026-08-07T06:09:37.089098Z", 
    //     "last_sign_in_at": "2026-08-12T09:24:37.362112356Z", 
    //     "app_metadata": { "provider": "email", "providers": ["email"] }, "user_metadata": { "email": "janedoe@test.com", "email_verified": true, "name": "Jane Doe", "phone_verified": false, "sub": "5e185d41-7b4e-449e-a7d4-d778bbe9a928" }, "identities": [{ "identity_id": "828bc0d8-8167-42c2-915f-27d5cd119a56", "id": "5e185d41-7b4e-449e-a7d4-d778bbe9a928", "user_id": "5e185d41-7b4e-449e-a7d4-d778bbe9a928", "identity_data": { "email": "janedoe@test.com", "email_verified": false, "name": "Jane Doe", "phone_verified": false, "sub": "5e185d41-7b4e-449e-a7d4-d778bbe9a928" }, "provider": "email", "last_sign_in_at": "2026-08-07T06:09:37.079643Z", "created_at": "2026-08-07T06:09:37.079689Z", "updated_at": "2026-08-07T06:09:37.079689Z", "email": "janedoe@test.com" }], "created_at": "2026-08-07T06:09:37.055015Z", "updated_at": "2026-08-12T09:24:37.36429Z", "is_anonymous": false 
// null    
// })
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
            const response = await authRepo.login({ ...payload })
            if (!response.user || !response.session) { errorMes.value = response.msg }
            user.value = response.user
            session.value = response.session
            localStorage.setItem('user', JSON.stringify(user.value))
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
        } catch (err: any) {
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