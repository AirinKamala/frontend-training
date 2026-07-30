<template>
<input :type="props.type" @input="handleInput" :placeholder="props.place" :value="props.modelValue" >
</template>
<script setup lang="ts">


const props = defineProps({
    type: {type: String, default: 'text'},
    modelValue: {type: String || Number, },
    place: {type:String, default: ''}
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    emit('update:modelValue', target.value)
}
</script>

<style lang="scss" scoped>
input{
    padding: $padd;
    border-radius: 10px;
    
}
</style>