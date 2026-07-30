<template>
    <EditorContent v-if="editor" :editor="editor"></EditorContent>

</template>

<script setup lang="ts">
import StarterKit from '@tiptap/starter-kit';
import { Editor, EditorContent } from '@tiptap/vue-3';

const props = defineProps({ modelValue: { type: String, default: '' } })
const emit = defineEmits(['update:modelValue'])

const editor = shallowRef<Editor | null>(null)

onMounted(() => {
    editor.value = new Editor({
        content: props.modelValue,
        extensions: [StarterKit],
        onUpdate: ({ editor }) => {
            if (editor) {
                emit('update:modelValue', editor.getHTML())
            }
        }
    })
})

onBeforeUnmount(()=>{editor.value?.destroy()})
</script>