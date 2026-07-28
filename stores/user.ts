import { useUserRepo } from "~/repository/authRepo"
import type { IAuth } from "~/types/typeIn"

export const useUserStore = defineStore('user', () => {

    const currentUser = ref<IAuth | null>(null)
    const userRepo = useUserRepo()
    const tokenCookie = useCookie('auth_token', { maxAge: 24 * 7 * 60 * 60 }) //7 days
    const isAuthenticated = computed(()=> !!tokenCookie.value)


    const loginHandle = async (credentials: { email: string, password: string}) => {
        const response = await userRepo.login(credentials)
        if (!response) return
        currentUser.value = response

    }
    const registerHandle = async (payload: { name: string, email: string, password: string, password_confirmation: string}) => {
        
        const response = await userRepo.register(payload)
        if (response) {
            currentUser.value = response
            console.log(currentUser)
            return response
        }
    }
    return {
        currentUser, loginHandle, registerHandle
    }
})