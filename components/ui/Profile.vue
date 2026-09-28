<template>
    <div class="profile">{{ chara?.at(0) }}</div>
</template>
<script setup lang="ts">
    const chara = useUserStore().userData?.name
    const colors = [

    ]
</script>
<style lang="scss" scoped>
    .profile{
        background-color: $accent;
        width: 100%;
        height: 100%;
        
    }
</style>
