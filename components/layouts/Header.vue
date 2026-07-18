<template>
  <header class="header">
    <span class="header__logo">Storytime</span>
    <nav class="header__nav">
      <a href="#">Home</a>
      <a href="#">About</a>
      <a href="#">Contact</a>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  font-family: $font-playfair-display;

  &__logo {
    font-weight: bold;
  }

  &__nav {
    display: flex;
    gap: 1.5rem;
  }
}
</style>
