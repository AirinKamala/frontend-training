<template>
    <span class="logo" @click="navigateTo('/')"><span class="logo__accent">st</span>ory time</span>
</template>

<style lang="scss" scoped>
.logo {
    color: black;
    font-size: 16pt;
    font-family: $font-playfair-display;
    cursor: pointer;

    &__accent {
        background-color: black;
        color: white;
        text-align: center;
        padding: 0 .4rem;
    }
}

@media (min-width: $sm-mx) {
    .logo{
        font-size: 24pt;
    }
}
</style>