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
    height: 64px;
    padding: 0 30px;
    align-items: center;
    gap: 14px;
    background: #f5a240;
    border: 4px solid #3a1a05;
    border-radius: 999px;
    box-shadow: 5px 6px 0 #3a1a05;
    color: #3a1a05;
    font-family: inherit;
    font-size: 17px;
    font-weight: 900;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    outline: 0;
    cursor: pointer;
    transition: transform 120ms ease-out, box-shadow 120ms ease-out, background 120ms;
}

.button:hover {
    background: #ffd86b;
    transform: translate(-2px, -3px);
    box-shadow: 7px 9px 0 #3a1a05;
}

.button:active {
    transform: translate(3px, 4px);
    box-shadow: 1px 2px 0 #3a1a05;
}

.button:focus-visible {
    outline: 3px solid #ffd86b;
    outline-offset: 4px;
}

.button-icon {
    height: 22px;
    width: 22px;
    flex-shrink: 0;
}

.button-icon-before {
    margin-left: -8px;
}

.button-icon-after {
    margin-right: -8px;
}

@media (max-width: 767.98px) {
    .button {
        height: 58px;
        padding: 0 24px;
        font-size: 15px;
        box-shadow: 4px 5px 0 #3a1a05;
    }

    .button:hover {
        box-shadow: 6px 7px 0 #3a1a05;
    }

    .button-icon {
        height: 20px;
        width: 20px;
    }
}
</style>
