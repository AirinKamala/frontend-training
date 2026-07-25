
export const useModal = <T = any>() => {
    const isOpen = ref(false)
    const modalType = ref('')
    const modalData = ref<any | null>(null)

    const openModal = (type: string, data?: T) => {
        isOpen.value = true
        modalData.value = data
        modalType.value = type
    }
    const closeModal = () => { 
        isOpen.value = false
        modalData.value = null
        modalType.value = ''
     }

    return {
        openModal, closeModal, isOpen, modalData, modalType
    }
}
