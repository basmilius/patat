<script setup lang="ts">
useDomainSeo();

if (import.meta.client) {
    console.log(
        "%c🍟 Het is patat. Punt.",
        "color: #ecb365; font-size: 28px; font-weight: 900; padding: 10px 0; text-shadow: 2px 2px 0 #B00505;"
    );
    console.log(
        "%cCode kijken? github.com/basmilius/patat",
        "color: #f0d290; font-size: 13px; font-weight: 700; letter-spacing: 1px;"
    );
}
</script>

<template>
    <NuxtPage/>
</template>
