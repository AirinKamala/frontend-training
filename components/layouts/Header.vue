<template>
    <header class="header">
        <UiLogo />

        <nav class="header__nav">
            <UiButton type="border" @btn-click="navigateTo('/register')" class="btn">Register</UiButton>
            <UiButton type="accent" @btn-click="navigateTo('/login')" class="btn">Login</UiButton>
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
        display: flex;
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
        }
       
    }
}

@media (width >=$sm-mx) {
    .header__nav{
        width: 16rem;
    }
}
</style>