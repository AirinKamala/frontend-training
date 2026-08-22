<template>
    <NuxtLayout >
      <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
  const st = useUserStore()
onMounted(()=>{
  st.getUser()
  })
</script>
