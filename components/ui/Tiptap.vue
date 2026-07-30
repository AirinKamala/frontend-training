<template>
    <EditorContent v-if="editor" :editor="editor" style="height: inherit;"></EditorContent>

</template>

<script setup lang="ts">
import StarterKit from '@tiptap/starter-kit';
import { Editor, EditorContent } from '@tiptap/vue-3';

const props = defineProps({ modelValue: { type: String, default: '' }, canEdit: { type: Boolean, default: true } })
const emit = defineEmits(['update:modelValue'])



watch(() => props.modelValue, (value) => {
    const isSame = editor.value?.getHTML() === value

    if (isSame) return
    editor.value?.commands.setContent(value)
})

const editor = shallowRef<Editor | null>(null)

onMounted(() => {
    editor.value = new Editor({
        content: props.modelValue,
        extensions: [StarterKit],
        editable: props.canEdit,
        onUpdate: ({ editor }) => {
            if (editor) {
                emit('update:modelValue', editor.getHTML())
            }
        }
    })
})

onBeforeUnmount(()=>{editor.value?.destroy()})
</script>