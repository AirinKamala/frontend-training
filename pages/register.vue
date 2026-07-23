<template>
    <UiLogo class="logo" />
    <div class="wrapper">

        <main class="main">
            <h1>Register</h1>
            <form @submit.prevent class="form">
                <label for="" class="form__label">Name</label>
                <input v-model="draft.name" type="text" required class="form__input" placeholder="John Doe">
                <label for="" class="form__label"> Username/Email</label>
                <input v-model="draft.email" type="email" required class="form__input" placeholder="john@email.com">
                <label for="" class="form__label"> Password</label>
                <input v-model="draft.password" :type="togglEye" class="form__input" required placeholder="*******"
                    min="8">

                <ul v-if="draft.password.length > 0">
                    <li v-if="passRule.minLength && draft.password" class="form__error">Password minimal 8 characters
                    </li>
                    <li v-if="passRule.spaces" class="form__error">Password must not contain spaces</li>
                    <li v-if="!passRule.lowerCase" class="form__error">Password must contain at least 1 lowercase
                    </li>
                    <li v-if="!passRule.upperCase" class="form__error">Password must contain at least 1 uppercase
                    </li>
                    <li v-if="!passRule.hasNumber" class="form__error">Password must contain at least 1 number</li>
                    <li v-if="!passRule.hasSpecial" class="form__error">Password must contain at least 1 special
                        characters</li>
                </ul>

                <label for="" class="form__label"> Confirm Password
                </label>
                <input v-model="draft.confirmPass" :type="togglEye" class="form__input" required placeholder="*******"
                    min="8">
                <p class="form__error" v-if="passRule.samePass">Passwords do not match</p> <!--add var error-->

                <label><input type="checkbox" name="showPass" v-model="pass"> Show Password</label>
                <button @click="handleRegister" class="form__btn">Register</button>
                <p>Already have account? <router-link to="login" class="link">Login</router-link></p>
            </form>

        </main>
        <aside class="as">
            <img src="/assets/images/register.webp" alt="">
        </aside>
    </div>
</template>

<script setup lang="ts">
const pass = ref(false)

const togglEye = computed(() => {
    return pass.value ? 'text' : 'password'
})

const draft = ref({
    name: '',
    email: '',
    password: '',
    confirmPass: ''
})

const passRule = computed(() => {
    const val = draft.value.password
    const conVal = draft.value.confirmPass
    return {
        minLength: val.length < 8,
        spaces: /\s/.test(val),
        lowerCase: /[a-z]/.test(val),
        upperCase: /[A-Z]/.test(val),
        hasNumber: /\d/.test(val),
        hasSpecial: /[!@#$%^&*()<>,.?;:{}]/.test(val),
        samePass: conVal !== val && conVal.length > 0

    }
})

const handleRegister = () => {
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
    z-index: 2;
}

.as {
    min-width: 300px;
    max-width: 448px;
    width: auto;
    overflow: hidden;
    height: 100%;
    display: flex;
    bottom: 0;
    position: sticky;


    img {
        object-fit: cover;
        height: 100%;
        width: 100%;
        display: flex;
        -webkit-mask-image: linear-gradient(to top, black 30%, transparent 100%);
        mask-image: linear-gradient(to top, black 30%, transparent 100%);
    }

}

@media (width >=778px) {
    .as {
        max-width: 50%;
        width: auto;

        img {
            -webkit-mask-image: linear-gradient(to left, black 75%, transparent 100%);
            mask-image: linear-gradient(to left, black 75%, transparent 100%);
        }

    }
}
</style>
;