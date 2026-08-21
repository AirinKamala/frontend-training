<template>
    <div class="search">
        <input type="text" class="search__input" @input="handleInput" :placeholder="text" :value="props.modelValue">
        <span class="search__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-search-icon lucide-search">
                <path d="m21 21-4.34-4.34" />
                <circle cx="11" cy="11" r="8" />
            </svg>
        </span>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    text: { type: String, default: 'Search...' },
    modelValue: { type: String, default: '' },
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
.search {
    display: flex;
    align-items: center;
    width: 80%;

    &__input {
        height: 3rem;
        padding: 1rem 2rem;
        width: 100%;
    }

    &__icon {
        margin-left: -2.5rem;
        opacity: 60%;
    }
}
</style>