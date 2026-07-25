<template>
     <div class="search">
            <input type="text" class="search__input" :placeholder="text" v-model="model">
            <span class="search__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" class="lucide lucide-search-icon lucide-search">
                    <path d="m21 21-4.34-4.34" />
                    <circle cx="11" cy="11" r="8" />
                </svg>
            </span>
        </div>
</template>

<script setup lang="ts">
    defineProps({
        text: {type: String, default: 'Search...'},
    })
    const model = defineModel({type: String, default: ''})
    // const emit = defineEmits(['update:modelValue'])
    // const updateVal = (event:any) => {
    //     emit('update:modelValue', event.target.value)
    // }
</script>

<style lang="scss" scoped>
.search {
        display: flex;
        align-items: center;
        width: 80%;
        &__input {
            height: 3rem;
            padding: 1rem 2rem;
            width: 100%;
        }
        &__icon{
            margin-left: -2.5rem;
            opacity: 60%;
        }
    }
</style>