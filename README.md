# Storytime

## Tech Stack

- **Nuxt 3** — framework Vue full-stack (SSR/SSG)
- **Vue 3** — UI library
- **Vue Router** — routing
- **SCSS/Sass** — styling (`lang="scss"` di tiap component)
- **pnpm** — package manager
- **Husky** — git hooks (validasi commit message)

## Packages

### Dependencies
| Package | Fungsi |
|---|---|
| `nuxt` | Framework utama |
| `vue` | UI library |
| `vue-router` | Routing |

### DevDependencies
| Package | Fungsi |
|---|---|
| `sass` | Compiler SCSS, dipakai lewat `<style lang="scss">` |
| `husky` | Git hooks, dipakai buat validasi format commit message |

## Setup

```bash
pnpm install
```

## Development Server

```bash
pnpm dev
```
Jalan di `http://localhost:3000`.

## Production

```bash
pnpm build
pnpm preview
```

## Commit Message

Commit di-validasi otomatis lewat Husky (`.husky/commit-msg`). Format wajib:

```
<type> : <subject>
```

Type yang valid: `feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `perf`, `test`

Contoh:
```
fix : bug fixing this bug
feat : add login page
docs : update readme
```

Commit yang gak sesuai format bakal ditolak otomatis.

## Repository Pattern

Repository Pattern adalah pola desain yang naruh lapisan abstraksi antara logic aplikasi (component/page) dengan sumber data (API call). Semua logic fetch data dibungkus dalam class/module "repository", component tinggal manggil method-nya tanpa tau detail implementasi `$fetch`/endpoint di baliknya.

**Kenapa pakai:**
- Hindari duplikasi kode fetch API di banyak halaman (DRY)
- Pisah business logic dari data-access logic
- Gampang di-test (repository bisa di-mock)
- Kalau endpoint/format API berubah, cukup update di repository, gak perlu ubah tiap halaman yang makai

**Struktur umum (Nuxt 3):**
```
repository/
├── factory.ts          # abstract base class (wrap ofetch/$fetch)
└── modules/
    └── products.ts      # module repository, extend factory
plugins/
└── api.ts               # register semua repository, expose sebagai $api
pages/
└── index.vue             # pakai `$api.products.getProducts()`
```

**Alur:**
1. Buat `FetchFactory` — base class yang bungkus `$fetch`
2. Buat module repository (mis. `ProductsModule`) yang extend factory, isi method per endpoint
3. Register di plugin `api.ts`, expose lewat `$api`
4. Di page/component, panggil `$api.products.getProducts()` (biasanya dibungkus `useAsyncData`)

Sumber: [Nuxt 3 Repository Pattern — Luiz Zappa (Medium)](https://medium.com/@luizzappa/nuxt-3-repository-pattern-organising-and-managing-your-calls-to-apis-with-typescript-acd563a4e046)
