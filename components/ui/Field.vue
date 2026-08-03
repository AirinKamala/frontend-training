<template>
    <div v-if="editor" class="field">
        <div class="field__group field__tools">
            <select name="heading" id="heading" @change="handleHeadingChange($event)" :value="currentHeading"
                class="heading">
                <option value="p">Normal</option>
                <option value="1">Heading 1</option>
                <option value="2">Heading 2</option>
                <option value="3">Heading 3</option>
                <option value="4">Heading 4</option>
                <option value="5">Heading 5</option>
                <option value="6">Heading 6</option>
            </select>
            <button type="button" @click="editor.chain().focus().toggleBold().run()"
                :class="{ 'is-active': editor.isActive('bold') }"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                    height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bold-icon lucide-bold">
                    <path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8" />
                </svg></button>
            <button type="button" @click="editor.chain().focus().toggleItalic().run()"
                :class="{ 'is-active': editor.isActive('i') }"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                    height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-italic-icon lucide-italic">
                    <line x1="19" x2="10" y1="4" y2="4" />
                    <line x1="14" x2="5" y1="20" y2="20" />
                    <line x1="15" x2="9" y1="4" y2="20" />
                </svg></button>
            <button type="button" @click="editor.chain().focus().toggleUnderline().run()"
                :class="{ 'is-active': editor.isActive('u') }">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-underline-icon lucide-underline">
                    <path d="M6 4v6a6 6 0 0 0 12 0V4" />
                    <line x1="4" x2="20" y1="20" y2="20" />

                </svg></button>
            <button type="button" @click="openModal('url')" :class="{ 'is-active': editor.isActive('link') }">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-link-icon lucide-link">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
            </button>
            <UiModal v-if="modalType == 'url'" @close="closeModal">
                <h2>Enter your URL</h2>
                <UiInput id="url" v-model="myUrl" style="height: fit-content;" :place="'www.example.com'" />
                <UiButton @btn-click="setLink" type="accent">Ok</UiButton>
            </UiModal>
            <button type="button" @click="editor.chain().focus().toggleOrderedList().run()"
                :class="{ 'is-active': editor.isActive('ol') }">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-list-ordered-icon lucide-list-ordered">
                    <path d="M11 5h10" />
                    <path d="M11 12h10" />
                    <path d="M11 19h10" />
                    <path d="M4 4h1v5" />
                    <path d="M4 9h2" />
                    <path d="M6.5 20H3.4c0-1 2.6-1.925 2.6-3.5a1.5 1.5 0 0 0-2.6-1.02" />
                </svg>
            </button>
            <button type="button" @click="editor.chain().focus().toggleBulletList().run()"
                :class="{ 'is-active': editor.isActive('ul') }">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-list-icon lucide-list">
                    <path d="M3 5h.01" />
                    <path d="M3 12h.01" />
                    <path d="M3 19h.01" />
                    <path d="M8 5h13" />
                    <path d="M8 12h13" />
                    <path d="M8 19h13" />
                </svg>
            </button>
            <button type="button" @click="editor.chain().focus().unsetAllMarks().run()"><svg
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-remove-formatting-icon lucide-remove-formatting">
                    <path d="M4 7V4h16v3" />
                    <path d="M5 20h6" />
                    <path d="M13 4 8 20" />
                    <path d="m15 15 5 5" />
                    <path d="m20 15-5 5" />
                </svg></button>
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
import { Placeholder } from '@tiptap/extensions';
import { Link } from '@tiptap/extension-link'

const { openModal, closeModal, modalType } = useModal()
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

const myUrl = ref(editor.value?.getAttributes('link').href || '')
const setLink = () => {
    const url = myUrl.value || ''
    if (url === '') { editor.value?.chain().extendMarkRange('link').unsetLink().run(); return closeModal() }
    editor.value?.chain().focus().extendMarkRange('link').setLink({ href: url, target: '_blank' }).run()
    closeModal()
}

onMounted(() => {
    editor.value = new Editor({
        extensions: [StarterKit,
            TextAlign.configure({ types: ['headings', 'paragraph'] }),
            Placeholder.configure({ placeholder: 'Enter content here' }),
            Link.configure({
                openOnClick: false,
                markdownLinks: true,
                defaultProtocol: 'https'
            })
        ],
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
    border-radius: 10px;
    border: $border-gray;

    &__tools {
        display: flex;
        flex-wrap: wrap;
        padding: .5rem;
        gap: .5rem;
        border-bottom: $border-gray;

        button,
        select,
        option {
            background-color: white;
            border: none;
            padding: .5rem;

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
        height: 8rem;
        padding: .5rem 1rem;
        overflow-y: auto;

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
            margin-top: .5rem;
            text-wrap: pretty;
        }

        h1,
        h2 {
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

        p.is-editor-empty:first-child::before {
            color: gray;
            content: attr(data-placeholder);
            float: left;
            height: 0;
            pointer-events: none;
        }

        a {
            color: purple;
            cursor: pointer;

            &:hover {
                color: rgb(43, 0, 128)
            }
        }
    }
}

</style>
