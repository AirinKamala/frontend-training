<template>
    <UiLogo class="logo" />
    <div class="wrapper">
        <aside class="as">
            <img src="/assets/images/login.webp" alt="">
        </aside>
        <main class="main">
            <h1>Login</h1>
            <form @submit.prevent class="form">
                <label for="" class="form__label"> Username/Email</label>
                <input v-model="draft.email" type="email" required class="form__input" placeholder="john@email.com">
                <label for="" class="form__label"> Password
                </label>
                <div>
                    <input  v-model="draft.password":type="pass" class="form__input" required placeholder="*******" min="8">
                    <button :title="`${pass ? 'Show': 'Hide'} password`" @click="togglEye" class="form__pass">
                        <svg v-if="pass === 'password'" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-icon lucide-eye">
                            <path
                                d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                        <svg v-if="pass === 'text'" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-eye-off-icon lucide-eye-off">
                            <path
                                d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
                            <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
                            <path
                                d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
                            <path d="m2 2 20 20" />
                        </svg>
                    </button>
                </div>
                <p class="form__error" v-if="error">{{ error }}</p> <!--add var error-->
                <button class=" form__btn" @click="handleLogin">Login</button>
                <p>You dont have any account? <router-link to="register" class="link">Register</router-link></p>
            </form>

        </main>
    </div>
</template>

<script setup lang="ts">
const pass = ref('password')

const togglEye = () => {
    if (pass.value == 'password') pass.value = 'text'
    else pass.value = 'password'
}

const draft = ref({
    email: '',
    password: ''
})
const error = ref('')
const handleLogin = () =>{

}
</script>

<style lang="scss" scoped>
.logo {
    position: absolute;
    top: 10px;
    left: 10px;
}

.wrapper {
    display: flex;
    flex-wrap: wrap;
    margin-top: 4rem;
    justify-content: center;
    align-items: center;
    align-self: center;
    font-family: $font-dm-sans;
}

.main {
    padding: $padd;
}

.as {
    min-width: $sm;
    max-width: $sm-mx;
    width: auto;
    overflow: hidden;
    height: 100%;
    display: flex;

    img {
        object-fit: cover;
        height: 100%;
        width: 100%;
        display: flex;
    }
}

@media (min-width: $sm-mx) {
    .as {
        max-width: 100%;
        width: auto;
    }
}
</style>
;