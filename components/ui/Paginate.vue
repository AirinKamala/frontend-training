<template>
 <section class="paginate">
        <div class="paginate__level ">&larr; Prev</div>
        <div class="paginate__level paginate__level__active">1</div>
        <div class="paginate__level">....</div>
        <div class="paginate__level ">10</div>
        <div class="paginate__level">Next &rarr; </div>
    </section>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.paginate {
    display: flex;
    gap: 0.5rem;
    width: 18rem;
    margin: 2rem auto;
    justify-content: space-around;

    &__level {
        cursor: pointer;
        background-color: $accent-light;
        padding: .5rem;
        min-width: 2rem;
        text-align: center;

        &__active {
            background-color: $accent;
            color: white;
        }
    }
}
</style>