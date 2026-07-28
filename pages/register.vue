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
                <button type="submit" class="form__btn">Register</button>
                <p>Already have account? <router-link to="login" class="link">{{ isLoading ?
                        'Loading...':'Login'}}</router-link></p>
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

const isLoading = ref(false)
const actionError = ref<any | null>(null)
const auth = useUserStore()
const handleRegister = async () => {
    isLoading.value = true

    try {
        console.log({ ...draft.value })
        await auth.registerHandle({ ...draft.value })
        // if(error) actionError.value = error
        await navigateTo('/login')

    } catch (err: any) {
        console.error('Registration error:', err)
        actionError.value = err?.data?.message || err?.message || 'Registration failed.'
    } finally {
        isLoading.value = false
    }
}

</script>

<style lang="scss" scoped>
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