<script setup lang="ts">
import type { Component } from "vue";

defineProps<{
    iconBefore?: Component;
    iconAfter?: Component;
    label: string;
}>();
</script>

<template>
    <button class="button" type="button">
        <component :is="iconBefore" v-if="iconBefore" class="button-icon button-icon-before"/>
        <span>{{ label }}</span>
        <component :is="iconAfter" v-if="iconAfter" class="button-icon button-icon-after"/>
    </button>
</template>

<style scoped>
.button {
    display: flex;
    height: 63px;
    padding-left: 30px;
    padding-right: 30px;
    align-items: center;
    gap: 18px;
    background: transparent;
    border: 3px solid var(--button);
    border-radius: 99px;
    color: var(--text);
    font-family: inherit;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 2px;
    outline: 0;
    text-transform: uppercase;
    transition: background 180ms cubic-bezier(0.55, 0, 0.1, 1);
    cursor: pointer;
}

.button:hover {
    background: var(--button);
}

.button-icon {
    height: 1em;
    width: 1em;
    font-size: 23px;
}

.button-icon-before {
    margin-left: -9px;
}

.button-icon-after {
    margin-right: -9px;
}

@media (max-width: 767.98px) {
    .button {
        height: 60px;
        font-size: 16px;
    }

    .button-icon {
        font-size: 20px;
    }
}
</style>
