<template>
    <div class="wrapper">
        <section class="main">
            <h1>Register</h1>
            <hr>
            <form @submit.prevent="handleRegister" class="form" style="margin-top: 2rem;">

                <label for="form-name" class="form__label">Name</label>
                <input id="form-name" v-model="draft.name" type="text" required class="form__input"
                    placeholder="John Doe">
                <label for="form-email" class="form__label"> Username/Email</label>
                <input id="form-email" v-model="draft.email" type="email" required class="form__input"
                    placeholder="john@email.com">
                <label for="form-pass" class="form__label"> Password</label>
                <input id="form-pass" v-model="draft.password" :type="togglEye" class="form__input" required
                    placeholder="*******" minlength="8">

                <ul v-if="draft.password && draft.password.length > 0">
                    <li v-if="!passRule.minLength && draft.password" class="form__error">Password minimal 8 characters
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
                <label for="form-pass-con" class="form__label"> Confirm Password
                </label>
                <input id="form-pass-con" v-model="draft.password_confirmation" :type="togglEye" class="form__input"
                    required placeholder="*******" minlength="8">
                <p class="form__error" v-if="passRule.samePass">Password doesnt match</p> <!--add var error-->
                <p class="form__error" v-if="actionError">{{ actionError }}</p> <!--add var error-->

                <label><input type="checkbox" name="showPass" v-model="pass"> Show Password</label>
                <p class="form__error" v-if="auth.errorMes">{{ auth.errorMes }}</p>

                <button type="submit" class="form__btn">{{ auth.isLoading ?
                    'Loading...' : 'Login' }}</button>
                <p>Already have account? <router-link to="login" class="link">Login</router-link></p>
            </form>

        </section>
        <section class="as">
            <img src="/assets/images/register.webp" alt="">
        </section>
    </div>
</template>

<script setup lang="ts">

const draft = ref({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
})

const pass = ref(false)

const togglEye = computed(() => {
    return pass.value ? 'text' : 'password'
})

const passRule = computed(() => {
    const val = draft.value.password || ''
    const conVal = draft.value.password_confirmation || ''
    return {
        minLength: val.length >= 8,
        spaces: /\s/.test(val),
        lowerCase: /[a-z]/.test(val),
        upperCase: /[A-Z]/.test(val),
        hasNumber: /\d/.test(val),
        hasSpecial: /[!@#$%^&*()<>,.?;:{}]/.test(val),
        samePass: conVal !== val && conVal.length > 0
    }
})
const actionError = ref<any | null>(null)
const auth = useUserStore()
const handleRegister = async () => {

    try {
        console.log({ ...draft.value })
        const credintials = {
            email: draft.value.email,
            password: draft.value.password,
            name: draft.value.name
        }
        const { user, session } = await auth.register(credintials)
        if(!user || !session) return
        await navigateTo('/login')

    } catch (err: any) {
        console.error('Registration error:', err)
        actionError.value = err?.data?.message || err?.message || 'Registration failed.'
    }
}

</script>

<style lang="scss" scoped>
.wrapper {
    background-color: $bg;
    display: flex;
    flex-wrap: wrap;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
    align-self: center;
    font-family: $font-dm-sans;
}

.main {
    padding: $padd;
    z-index: 2;
    min-width: 280px;
    background-color: white;
    border-radius: 10px;
    box-shadow: $shadow;
    padding: 1rem;
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