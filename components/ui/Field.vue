<template>
    <div v-if="editor" class="field">
        <div class="field__group field__tools">
            <button @click="editor.chain().focus().toggleBold().run()"
                :class="{ 'is-active': editor.isActive('bold') }">B</button>
            <button @click="editor.chain().focus().toggleItalic().run()"
                :class="{ 'is-active': editor.isActive('i') }">i</button>
            <button @click="editor.chain().focus().toggleUnderline().run()"
                :class="{ 'is-active': editor.isActive('u') }">U</button>
            <select name="heading" id="heading" @change="handleHeadingChange($event)" :value="currentHeading"
                class="heading">
                <option value="p">Paragraph</option>
                <option value="1">Heading 1</option>
                <option value="2">Heading 2</option>
                <option value="3">Heading 3</option>
                <option value="4">Heading 4</option>
                <option value="5">Heading 5</option>
                <option value="6">Heading 6</option>
            </select>
            <button @click="editor.chain().focus().toggleOrderedList().run()"
                :class="{ 'is-active': editor.isActive('ol') }">ol</button>
            <button @click="editor.chain().focus().toggleBulletList().run()"
                :class="{ 'is-active': editor.isActive('ul') }">ul</button>
            <button @click="editor.chain().focus().setHorizontalRule().run()">Horizontal rule</button>
        </div>
        <div class="content">
            <EditorContent :editor="editor" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { Editor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align'

const handleHeadingChange = (event: Event) => {
    const target = event.target as HTMLSelectElement
    const value = target.value

    if (!editor.value) return
    if (value === 'p') { editor.value.chain().focus().setParagraph().run() } else {
        const level = parseInt(value, 10) as 1 | 2 | 3
        editor.value.chain().focus().toggleHeading({ level }).run()
    }
}
const currentHeading = computed(() => {
    if (!editor.value) return
    if (editor.value.isActive('heading', { level: 1 })) return '1'
    if (editor.value.isActive('heading', { level: 2 })) return '2'
    if (editor.value.isActive('heading', { level: 3 })) return '3'
    if (editor.value.isActive('heading', { level: 4 })) return '4'
    if (editor.value.isActive('heading', { level: 5 })) return '5'
    if (editor.value.isActive('heading', { level: 6 })) return '6'
    if (editor.value.isActive('paragraph')) return 'p'

})

const editor = shallowRef<Editor | null>(null)
onMounted(() => {
    editor.value = new Editor({
        extensions: [StarterKit, TextAlign.configure({ types: ['headings', 'paragraph'] })],
        content: '',
    })
})
onBeforeUnmount(() => {
    editor.value?.destroy();
})
</script>

<style lang="scss" scoped>
.field {
    max-width: 72rem;
    height: auto;
    max-height: 48rem;
    margin: 1rem 0;

    &__tools {
        display: flex;
        flex-wrap: wrap;
        padding: .5rem;
        border: $border-gray;
        gap: .5rem;
        margin-bottom: .5rem;

        button {
            background-color: white;
            border: none;
            padding: .5rem 1rem;

            &:hover {
                background-color: rgba(218, 216, 216, 0.769);
                transition: all .5s ease-in-out;
            }
        }

        .is-active {
            background-color: plum;

        }
    }

    .content :deep(.tiptap) {
        height: 12rem;
        border: $border-gray;
        padding: .5rem 1rem;


        ul,
        ol {
            padding: 0 1rem;
            margin: 1.25rem 10rem 1.25rem 0.4rem;

            li p {
                margin-top: 0.25em;
                margin-bottom: 0.25em;
            }
        }

        /* Heading styles */
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            line-height: 1.1;
            margin-top: 2.5rem;
            text-wrap: pretty;
        }

        h1,
        h2 {
            margin-top: 3.5rem;
            margin-bottom: 1.5rem;
        }

        h1 {
            font-size: 1.4rem;
        }

        h2 {
            font-size: 1.2rem;
        }

        h3 {
            font-size: 1.1rem;
        }

        h4,
        h5,
        h6 {
            font-size: 1rem;
        }


        strong {
            font-weight: 800;
        }

        i {
            font-style: italic;
        }
    }
}
</style>
