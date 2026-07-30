<template>
<button type="button" @click="$emit('btn-click', $event)"
    :style="`background-color: ${currectType.back}; border: 1px solid ${currectType.border}; color: ${currectType.color}`"
><slot></slot></button>
</template>

<script setup lang="ts">
    const emit = defineEmits(['btn-click'])
    
    const props = defineProps({
        type: {type: String, default: 'border'},
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
        return btnProp.value
    })

</script>
