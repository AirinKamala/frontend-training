<template>
    <header class="header">
        <UiLogo />

        <nav class="header__nav">
            <router-link to="register" class="btn-border btn">Register</router-link>
            <router-link to="login" class="btn-accent btn">Login</router-link>
        </nav>
    </header>
</template>

<style lang="scss" scoped>
.header {
    display: flex;
    padding: 1rem;
    position: sticky;
    z-index: 99;
    background-color: white;
    top: 0;
    border-bottom: 2px solid rgba(196, 196, 196, 0.595);
    justify-content: space-between;

    &__nav {
        display: grid;
        gap: .5rem;
        justify-content: space-around;
        .btn{
            border-radius: 10px;
            flex: 1;
            padding:  0.5rem;
            width: 6rem;
            display: flex;
            align-items: center;
            justify-content: center;
            &:hover, &:active{
                box-shadow: $shadow;
                transform: scale(0.95);
                transition: transform .5s ease-in-out;
            }
        }
       
    }
}

@media (width >=$sm-mx) {
    .header__nav{
        width: 16rem;
        display: flex
    }
}
</style>