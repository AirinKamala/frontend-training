export const useApi = () => {
    const config = useRuntimeConfig()

    return $fetch.create({
        baseURL: 'https://timestory.tmdsite.my.id/api',
        headers: {
            Accept:'application/json'
        },

        async onResponseError({response}){
            console.error(`API  error: `, response.status, response._data)
        }
    })
}