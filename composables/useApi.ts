export const useApi = () => {
    const config = useRuntimeConfig()

    const token = useCookie('auth_token')
    return $fetch.create({
        baseURL:' https://timestory.tmdsite.my.id/api',
        onRequest({ options }) {

            const headers = new Headers(options.headers)
            if (token.value) {
                headers.set('Authorization', `Bearer ${token.value}`)
            }
            options.headers = headers
        },

        async onResponseError({ response }) {
            if (response.status === 401) {
                token.value = null
                navigateTo('/login')
                console.error(`API  error: `, response.status, response._data)
            }
        }
    })
}