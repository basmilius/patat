<script setup lang="ts">
withDefaults(defineProps<{
    size?: number;
    color?: string;
}>(), {
    size: 20,
    color: "currentColor"
});
</script>

<template>
    <svg
        :width="size"
        :height="size"
        viewBox="0 0 24 24"
        :fill="color"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z"/>
    </svg>
</template>
