import { defineStore } from "pinia";

export const useStateStore = defineStore("state", () => {
  const activeModal = ref("");
  const articles = [
    {
      id: 1,
      image: "https://picsum.photos/400/300?random=1",
      title: "Misteri Rumah Tua di Tengah Hutan",
      shortContent:
        "Sebuah rumah tua menyimpan rahasia kelam yang menunggu untuk diungkap oleh sekelompok remaja.",
      authorAvatar: "https://picsum.photos/50/50?random=11",
      authorName: "Elara Vance",
      createdDate: "2025-08-14",
      category: "horror",
    },
    {
      id: 2,
      image: "https://picsum.photos/400/300?random=2",
      title: "Cinta Terlarang di Musim Semi",
      shortContent:
        "Kisah cinta dua insan dari dunia yang berbeda, harus berjuang melawan takdir dan restu orang tua.",
      authorAvatar: "https://picsum.photos/50/50?random=12",
      authorName: "Julian Hayes",
      createdDate: "2025-08-13",
      category: "romance",
    },
    {
      id: 3,
      image: "https://picsum.photos/400/300?random=3",
      title: "Ketika Badut Menjadi Presiden",
      shortContent:
        "Seorang badut sirkus tiba-tiba terpilih sebagai presiden dan menyebabkan kekacauan kocak di seluruh negeri.",
      authorAvatar: "https://picsum.photos/50/50?random=13",
      authorName: "Leo Miller",
      createdDate: "2025-08-12",
      category: "comedy",
    },
    {
      id: 4,
      image: "https://picsum.photos/400/300?random=4",
      title: "Boneka Kayu yang Membawa Petaka",
      shortContent:
        "Sebuah boneka antik yang dibeli dari pelelangan gelap mulai menunjukkan tanda-tanda kehidupan yang menyeramkan.",
      authorAvatar: "https://picsum.photos/50/50?random=14",
      authorName: "Cassian Finn",
      createdDate: "2025-08-11",
      category: "horror",
    },
    {
      id: 5,
      image: "https://picsum.photos/400/300?random=5",
      title: "Pesta Pernikahan yang Kacau",
      shortContent:
        "Semua yang bisa salah di pesta pernikahan, terjadi di sini. Dari kue yang jatuh hingga tukar cincin yang salah.",
      authorAvatar: "https://picsum.photos/50/50?random=15",
      authorName: "Maya Lin",
      createdDate: "2025-08-10",
      category: "comedy",
    },
    {
      id: 6,
      image: "https://picsum.photos/400/300?random=6",
      title: "Janji di Bawah Bintang Jatuh",
      shortContent:
        "Dua sahabat masa kecil bertemu kembali setelah bertahun-tahun, dan cinta yang lama terpendam kembali bersemi.",
      authorAvatar: "https://picsum.photos/50/50?random=16",
      authorName: "Ethan Reed",
      createdDate: "2025-08-09",
      category: "romance",
    },
    {
      id: 7,
      image: "https://picsum.photos/400/300?random=7",
      title: "Labirin Tanpa Ujung",
      shortContent:
        "Empat mahasiswa terjebak dalam labirin buatan yang dihuni oleh entitas misterius yang tidak terlihat.",
      authorAvatar: "https://picsum.photos/50/50?random=17",
      authorName: "Seraphina Quinn",
      createdDate: "2025-08-08",
      category: "horror",
    },
    {
      id: 8,
      image: "https://picsum.photos/400/300?random=8",
      title: "Operasi Pemujaan Setan",
      shortContent:
        "Seorang detektif harus menyamar dan menyusup ke dalam sebuah kultus pemujaan yang penuh dengan ritual mengerikan.",
      authorAvatar: "https://picsum.photos/50/50?random=18",
      authorName: "Liam Carter",
      createdDate: "2025-08-07",
      category: "horror",
    },
    {
      id: 9,
      image: "https://picsum.photos/400/300?random=9",
      title: "Sahabat Selamanya, Pasangan Selamanya",
      shortContent:
        "Kisah tentang dua sahabat yang menyadari bahwa ikatan mereka lebih dari sekadar pertemanan, tapi juga cinta.",
      authorAvatar: "https://picsum.photos/50/50?random=19",
      authorName: "Chloe Foster",
      createdDate: "2025-08-06",
      category: "romance",
    },
    {
      id: 10,
      image: "https://picsum.photos/400/300?random=10",
      title: "Liburan Musim Panas yang Konyol",
      shortContent:
        "Sekelompok teman berlibur ke pantai, tetapi rencana mereka berubah menjadi serangkaian kejadian lucu yang tak terduga.",
      authorAvatar: "https://picsum.photos/50/50?random=20",
      authorName: "Felix Turner",
      createdDate: "2025-08-05",
      category: "comedy",
    },
    {
      id: 11,
      image: "https://picsum.photos/400/300?random=11",
      title: "Cinta Tak Terduga di Kerajaan",
      shortContent:
        "Seorang putri jatuh cinta pada seorang ksatria biasa, dan mereka harus menghadapi rintangan yang mengancam kerajaan.",
      authorAvatar: "https://picsum.photos/50/50?random=21",
      authorName: "Amelia Chen",
      createdDate: "2025-08-04",
      category: "romance",
    },
    {
      id: 12,
      image: "https://picsum.photos/400/300?random=12",
      title: "Sang Pengantin dan Mayat Hidup",
      shortContent:
        "Malam pernikahan yang seharusnya bahagia berubah menjadi mimpi buruk saat pengantin pria bangkit dari kuburnya.",
      authorAvatar: "https://picsum.photos/50/50?random=22",
      authorName: "Silas Kane",
      createdDate: "2025-08-03",
      category: "horror",
    },
    {
      id: 13,
      image: "https://picsum.photos/400/300?random=13",
      title: "Misi Gagal ke Bulan",
      shortContent:
        "Sebuah tim astronot gagal mendarat di bulan dan harus bertahan hidup dengan humor yang konyol.",
      authorAvatar: "https://picsum.photos/50/50?random=23",
      authorName: "Oliver Vance",
      createdDate: "2025-08-02",
      category: "comedy",
    },
    {
      id: 14,
      image: "https://picsum.photos/400/300?random=14",
      title: "Siapa yang Mencuri Celana Saya?",
      shortContent:
        "Seorang detektif harus memecahkan kasus paling penting dalam hidupnya: menemukan celana kesayangannya yang hilang.",
      authorAvatar: "https://picsum.photos/50/50?random=24",
      authorName: "Fiona Reid",
      createdDate: "2025-08-01",
      category: "comedy",
    },
    {
      id: 15,
      image: "https://picsum.photos/400/300?random=15",
      title: "Cinta Terpendam di Perpustakaan",
      shortContent:
        "Dua kutu buku yang saling membenci menemukan bahwa mereka memiliki rasa yang sama satu sama lain saat terjebak di perpustakaan.",
      authorAvatar: "https://picsum.photos/50/50?random=25",
      authorName: "Noah Collins",
      createdDate: "2025-07-31",
      category: "romance",
    },
    {
      id: 16,
      image: "https://picsum.photos/400/300?random=16",
      title: "Pria Tanpa Wajah",
      shortContent:
        "Seorang pria misterius muncul di kota kecil, tetapi setiap orang melihat wajah yang berbeda darinya.",
      authorAvatar: "https://picsum.photos/50/50?random=26",
      authorName: "Iris Lee",
      createdDate: "2025-07-30",
      category: "horror",
    },
    {
      id: 17,
      image: "https://picsum.photos/400/300?random=17",
      title: "Jodoh di Ujung Senja",
      shortContent:
        "Seorang nenek tua berbagi kisah cintanya di masa muda yang penuh lika-liku dan pengorbanan.",
      authorAvatar: "https://picsum.photos/50/50?random=27",
      authorName: "Sofia Diaz",
      createdDate: "2025-07-29",
      category: "romance",
    },
    {
      id: 18,
      image: "https://picsum.photos/400/300?random=18",
      title: "Petualangan Kucing dan Anjing",
      shortContent:
        "Seekor anjing dan kucing yang awalnya bermusuhan harus bekerja sama untuk menemukan jalan pulang dari petualangan aneh.",
      authorAvatar: "https://picsum.photos/50/50?random=28",
      authorName: "Ben Carter",
      createdDate: "2025-07-28",
      category: "comedy",
    },
  ];

  return {
    activeModal,
    articles,
  };
});
