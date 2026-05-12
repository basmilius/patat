<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(defineProps<{
    count?: number;
}>(), {
    count: 160
});

interface Grain {
    x: number;
    y: number;
    size: number;
    opacity: number;
    color: string;
    delay: number;
    duration: number;
}

const COLORS = ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#f0d290", "#ecb365"];

const random = (min: number, max: number) => Math.random() * (max - min) + min;
const pick = <T,>(arr: readonly T[]): T => arr[Math.floor(Math.random() * arr.length)];

const grains = computed<Grain[]>(() =>
    Array.from({ length: props.count }, () => ({
        x: random(0, 100),
        y: random(0, 100),
        size: random(1, 3),
        opacity: random(0.25, 0.75),
        color: pick(COLORS),
        delay: random(0, 6),
        duration: random(4, 8)
    }))
);
</script>

<template>
    <div class="salt-grains" aria-hidden="true">
        <span
            v-for="(g, i) in grains"
            :key="i"
            class="grain"
            :style="{
                left: `${g.x}%`,
                top: `${g.y}%`,
                width: `${g.size}px`,
                height: `${g.size}px`,
                background: g.color,
                '--opacity': g.opacity,
                animationDelay: `${g.delay}s`,
                animationDuration: `${g.duration}s`
            }"/>
    </div>
</template>

<style scoped>
.salt-grains {
    position: fixed;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
    z-index: 0;
}

.grain {
    position: absolute;
    border-radius: 50%;
    opacity: var(--opacity);
    animation-name: salt-twinkle;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    will-change: opacity;
}

@keyframes salt-twinkle {
    0%, 100% {
        opacity: calc(var(--opacity) * 0.3);
    }
    50% {
        opacity: var(--opacity);
    }
}

@media (prefers-reduced-motion: reduce) {
    .grain {
        animation: none;
    }
}
</style>
