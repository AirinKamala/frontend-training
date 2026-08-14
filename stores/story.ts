// import { useStoryRepository } from "~/repository/storyRepo"
import { isAllowedUri } from "@tiptap/extension-link"
import { StoryRepository } from "~/repository/StoryRepository"
import type { ICategory, IStory } from "~/types/typeIn"

export const useStoryStore = defineStore('story', () => {
    const stories = ref<IStory[] | undefined>([

        {
            id: 1,
            slug: "Misteri Rumah Tua di Tengah Hutan",
            title: "Misteri Rumah Tua di Tengah Hutan",
            cover_image: "https://picsum.photos/400/300?random=1",
            created_at: "2025-08-14",
            content_preview: "Sebuah rumah tua menyimpan rahasia kelam yang menunggu untuk diungkap oleh sekelompok remaja.",
            author: {
                id: "1",
                name: "Elara Vance",
                profile_image: "https://picsum.photos/50/50?random=11",
            },

            category: {
                id: "1",
                name: "horror",
                slug: "horror"
            }
        },
        {
            id: 2,
            slug: "Cinta Terlarang di Musim Semi",
            title: "Cinta Terlarang di Musim Semi",
            cover_image: "https://picsum.photos/400/300?random=2",
            created_at: "2025-08-13",
            content_preview: "Kisah cinta dua insan dari dunia yang berbeda, harus berjuang melawan takdir dan restu orang tua.",
            author: {
                id: "2",
                name: "Julian Hayes",
                profile_image: "https://picsum.photos/50/50?random=12",
            },

            category: {
                id: "2",
                name: "romance",
                slug: "romance"
            }
        },
        {
            id: 3,
            slug: "Ketika Badut Menjadi Presiden",
            title: "Ketika Badut Menjadi Presiden",
            cover_image: "https://picsum.photos/400/300?random=3",
            created_at: "2025-_at2",
            content_preview: "Seorang badut sirkus tiba-tiba terpilih sebagai presiden dan menyebabkan kekacauan kocak di seluruh negeri.",
            author: {
                id: "3",
                name: "Leo Miller",
                profile_image: "https://picsum.photos/50/50?random=13",
            },

            category: {
                id: "3",
                name: "comedy",
                slug: "comedy"
            }
        },
        {
            id: 4,
            slug: "Boneka Kayu yang Membawa Petaka",
            title: "Boneka Kayu yang Membawa Petaka",
            cover_image: "https://picsum.photos/400/300?random=4",
            created_at: "2025-_at1",
            content_preview: "Sebuah boneka antik yang dibeli dari pelelangan gelap mulai menunjukkan tanda-tanda kehidupan yang menyeramkan.",
            author: {
                id: "4",
                name: "Cassian Finn",
                profile_image: "https://picsum.photos/50/50?random=14",
            },

            category: {
                id: "4",
                name: "horror",
                slug: "horror"
            }
        },
        {
            id: 5,
            slug: "Pesta Pernikahan yang Kacau",
            title: "Pesta Pernikahan yang Kacau",
            cover_image: "https://picsum.photos/400/300?random=5",
            created_at: "2025-_at0",
            content_preview: "Semua yang bisa salah di pesta pernikahan, terjadi di sini. Dari kue yang jatuh hingga tukar cincin yang salah.",
            author: {
                id: "5",
                name: "Maya Lin",
                profile_image: "https://picsum.photos/50/50?random=15",
            },

            category: {
                id: "5",
                name: "comedy",
                slug: "comedy"
            }
        },
        {
            id: 6,
            slug: "Janji di Bawah Bintang Jatuh",
            title: "Janji di Bawah Bintang Jatuh",
            cover_image: "https://picsum.photos/400/300?random=6",
            created_at: "2025-_at9",
            content_preview: "Dua sahabat masa kecil bertemu kembali setelah bertahun-tahun, dan cinta yang lama terpendam kembali bersemi.",
            author: {
                id: "6",
                name: "Ethan Reed",
                profile_image: "https://picsum.photos/50/50?random=16",
            },

            category: {
                id: "6",
                name: "romance",
                slug: "romance"
            }
        },
        {
            id: 7,
            slug: "Labirin Tanpa Ujung",
            title: "Labirin Tanpa Ujung",
            cover_image: "https://picsum.photos/400/300?random=7",
            created_at: "2025-_at8",
            content_preview: "Empat mahasiswa terjebak dalam labirin buatan yang dihuni oleh entitas misterius yang tidak terlihat.",
            author: {
                id: "7",
                name: "Seraphina Quinn",
                profile_image: "https://picsum.photos/50/50?random=17",
            },

            category: {
                id: "7",
                name: "horror",
                slug: "horror"
            }
        },
        {
            id: 8,
            slug: "Operasi Pemujaan Setan",
            title: "Operasi Pemujaan Setan",
            cover_image: "https://picsum.photos/400/300?random=8",
            created_at: "2025-_at7",
            content_preview: "Seorang detektif harus menyamar dan menyusup ke dalam sebuah kultus pemujaan yang penuh dengan ritual mengerikan.",
            author: {
                id: "8",
                name: "Liam Carter",
                profile_image: "https://picsum.photos/50/50?random=18",
            },

            category: {
                id: "8",
                name: "horror",
                slug: "horror"
            }
        },
        {
            id: 9,
            slug: "Sahabat Selamanya, Pasangan Selamanya",
            title: "Sahabat Selamanya, Pasangan Selamanya",
            cover_image: "https://picsum.photos/400/300?random=9",
            created_at: "2025-_at6",
            content_preview: "Kisah tentang dua sahabat yang menyadari bahwa ikatan mereka lebih dari sekadar pertemanan, tapi juga cinta.",
            author: {
                id: "9",
                name: "Chloe Foster",
                profile_image: "https://picsum.photos/50/50?random=19",
            },

            category: {
                id: "9",
                name: "romance",
                slug: "romance"
            }
        },
        {
            id: 10,
            slug: "Liburan Musim Panas yang Konyol",
            title: "Liburan Musim Panas yang Konyol",
            cover_image: "https://picsum.photos/400/300?random=10",
            created_at: "2025-_at5",
            content_preview: "Sekelompok teman berlibur ke pantai, tetapi rencana mereka berubah menjadi serangkaian kejadian lucu yang tak terduga.",
            author: {
                id: "10",
                name: "Felix Turner",
                profile_image: "https://picsum.photos/50/50?random=20",
            },

            category: {
                id: "10",
                name: "comedy",
                slug: "comedy"
            }
        },
        {
            id: 11,
            slug: "Cinta Tak Terduga di Kerajaan",
            title: "Cinta Tak Terduga di Kerajaan",
            cover_image: "https://picsum.photos/400/300?random=11",
            created_at: "2025-_at4",
            content_preview: "Seorang putri jatuh cinta pada seorang ksatria biasa, dan mereka harus menghadapi rintangan yang mengancam kerajaan.",
            author: {
                id: "11",
                name: "Amelia Chen",
                profile_image: "https://picsum.photos/50/50?random=21",
            },

            category: {
                id: "11",
                name: "romance",
                slug: "romance"
            }
        },
        {
            id: 12,
            slug: "Sang Pengantin dan Mayat Hidup",
            title: "Sang Pengantin dan Mayat Hidup",
            cover_image: "https://picsum.photos/400/300?random=12",
            created_at: "2025-_at3",
            content_preview: "Malam pernikahan yang seharusnya bahagia berubah menjadi mimpi buruk saat pengantin pria bangkit dari kuburnya.",
            author: {
                id: "12",
                name: "Silas Kane",
                profile_image: "https://picsum.photos/50/50?random=22",
            },

            category: {
                id: "12",
                name: "horror",
                slug: "horror"
            }
        },
        {
            id: 13,
            slug: "Misi Gagal ke Bulan",
            title: "Misi Gagal ke Bulan",
            cover_image: "https://picsum.photos/400/300?random=13",
            created_at: "2025-_at2",
            content_preview: "Sebuah tim astronot gagal mendarat di bulan dan harus bertahan hidup dengan humor yang konyol.",
            author: {
                id: "13",
                name: "Oliver Vance",
                profile_image: "https://picsum.photos/50/50?random=23",
            },

            category: {
                id: "3",
                name: "comedy",
                slug: "comedy"
            }
        },
        {
            id: 14,
            slug: "Siapa yang Mencuri Celana Saya?",
            title: "Siapa yang Mencuri Celana Saya?",
            cover_image: "https://picsum.photos/400/300?random=14",
            created_at: "2025-_at1",
            content_preview: "Seorang detektif harus memecahkan kasus paling penting dalam hidupnya: menemukan celana kesayangannya yang hilang.",
            author: {
                id: "14",
                name: "Fiona Reid",
                profile_image: "https://picsum.photos/50/50?random=24",
            },

            category: {
                id: "14",
                name: "comedy",
                slug: "comedy"
            }
        },
        {
            id: 15,
            slug: "Cinta Terpendam di Perpustakaan",
            title: "Cinta Terpendam di Perpustakaan",
            cover_image: "https://picsum.photos/400/300?random=15",
            created_at: "2025-_at1",
            content_preview: "Dua kutu buku yang saling membenci menemukan bahwa mereka memiliki rasa yang sama satu sama lain saat terjebak di perpustakaan.",
            author: {
                id: "15",
                name: "Noah Collins",
                profile_image: "https://picsum.photos/50/50?random=25",
            },

            category: {
                id: "15",
                name: "romance",
                slug: "romance"
            }
        },
        {
            id: 16,
            slug: "Pria Tanpa Wajah",
            title: "Pria Tanpa Wajah",
            cover_image: "https://picsum.photos/400/300?random=16",
            created_at: "2025-_at0",
            content_preview: "Seorang pria misterius muncul di kota kecil, tetapi setiap orang melihat wajah yang berbeda darinya.",
            author: {
                id: "16",
                name: "Iris Lee",
                profile_image: "https://picsum.photos/50/50?random=26",
            },

            category: {
                id: "6",
                name: "horror",
                slug: "horror"
            }
        },
        {
            id: 17,
            slug: "Jodoh di Ujung Senja",
            title: "Jodoh di Ujung Senja",
            cover_image: "https://picsum.photos/400/300?random=17",
            created_at: "2025-_at9",
            content_preview: "Seorang nenek tua berbagi kisah cintanya di masa muda yang penuh lika-liku dan pengorbanan.",
            author: {
                id: "17",
                name: "Sofia Diaz",
                profile_image: "https://picsum.photos/50/50?random=27",
            },

            category: {
                id: "7",
                name: "romance",
                slug: "romance"
            }
        },
        {
            id: 18,
            slug: "Petualangan Kucing dan Anjing",
            title: "Petualangan Kucing dan Anjing",
            cover_image: "https://picsum.photos/400/300?random=18",
            created_at: "2025-_at8",
            content_preview: "Seekor anjing dan kucing yang awalnya bermusuhan harus bekerja sama untuk menemukan jalan pulang dari petualangan aneh.",
            author: {
                id: "18",
                name: "Ben Carter",
                profile_image: "https://picsum.photos/50/50?random=28",
            },

            category: {
                id: "8",
                name: "comedy",
                slug: "comedy"
            }
        },

    ])
    const categories = ref<ICategory[] | null>(null)
    const isLoading = ref(false)
    const errMes = ref<string | null>(null)
    const storyRepo = new StoryRepository()

    async function addStory(cred: any) {
        isLoading.value = true
        errMes.value = null

        try {
            const response = await storyRepo.addStory({ ...cred })
            return response
        } catch (err: any) {
            errMes.value = 'Failed add neew story'
            throw err
        }
    }

    async function fetchCategories() {
        isLoading.value = true
        errMes.value = null
        try {
            const response = await storyRepo.getCategory()
            categories.value = response
        } catch (err: any) {
            errMes.value = err.message || 'Gagal mengambil data category'
            throw errMes
        }
    }

    return {
        stories, addStory, fetchCategories, categories
    }
})