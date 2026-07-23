<template>
    <header class="header">
        <UiLogo />

        <nav class="header__nav">
            <router-link to="register" class="header__nav__reg btn">Register</router-link>
            <router-link to="login" class="header__nav__log btn">Login</router-link>
        </nav>
    </header>
</template>

<style lang="scss" scoped>
.header {
    display: flex;
    padding: 1rem;
    border-bottom: 2px solid rgba(196, 196, 196, 0.595);
    justify-content: space-between;

    &__nav {
        display: flex;
        gap: .5rem;
        justify-content: space-around;
        .btn{
            border-radius: 10px;
        flex: 1;
            padding:  0.5rem;
            width: 4rem;
            display: flex;
            align-items: center;
            justify-content: center;
            &:hover, &:active{
                box-shadow: $shadow;
                transform: scale(0.95);
                transition: transform .5s ease-in-out;
            }
        }
        &__log{
            color: white;
            background-color: $accent;
            border:1px solid $accent;

        }
        &__reg{
            color: $accent;
            border:1px solid $accent;
        }
    }
}

@media (width >=$sm-mx) {
    .header__nav{
        width: 16rem;
    }
}
</style>