import type { IApiFormat, IAuth } from "~/types/typeIn"

export const useUserRepo = () => {
    const api = useApi()

    const login = async (credentials: { email: string, password: string }) => {
        const response = await api<{ data: IAuth }>(`/login`, { method: 'POST', body: credentials })
        return response?.data ?? null
    }

    const register = async (payload: { name: string, email: string, password: string, password_confirmation: string }) => {
        const response = await api<{ data: IAuth }>(`/register`, { method: 'POST', body: payload })
        return response?.data ?? null
    }


    return {
        api, login, register
    }
}