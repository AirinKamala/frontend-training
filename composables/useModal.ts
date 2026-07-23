const isOpen = ref(false)

export const useModal = ()=>{
    const openModal = () => {isOpen.value = true}
    const closeModal = () => {isOpen.value = false}
    const toogleModal = ()=> isOpen.value = !isOpen.value

    
    return{
        openModal, closeModal, toogleModal, isOpen
    }
}