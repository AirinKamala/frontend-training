<template>
<button style="letter-spacing: .1rem; font-weight: 600;" type="button" @click="$emit('btn-click', $event)"
    :style="`background-color: ${currectType.back}; border: 1px solid ${currectType.border}; color: ${currectType.color}`"
><slot></slot></button>
</template>
<style lang="scss" scoped>

button:hover, button:active{
    transform: scale(.95);
    transition: all .5s ease-in-out;
    box-shadow: $shadow;

}
</style>

<script setup lang="ts">
    const emit = defineEmits(['btn-click'])
    
    const props = defineProps({
        type: {type: String, default: 'accent'},
    })
    

    const btnProp = ref({
        back: '',
        border: '',
        color: ''
    })
    const currectType = computed(()=>{
        if(props.type === 'accent') return btnProp.value ={
            back: '#006a2a',
            border: '#006a2a',
            color: '#ffffff'
        }
        if(props.type === 'border') return btnProp.value ={
            back: 'white',
            border: '#006a2a',
            color: '#006a2a'
        }

        if(props.type === 'remove') return btnProp.value ={
            back: '#990202',
            border: '#990202',
            color: '#ffffff'
        }
        return btnProp.value
    })

</script>
