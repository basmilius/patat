<script setup lang="ts">
import { Motion } from "motion-v";

interface Doodle {
    x: number;
    y: number;
    size: number;
    color: string;
    delay: number;
    twinkleDuration: number;
    twinkleDelay: number;
    spinDuration: number;
}

const doodles: Doodle[] = [
    { x: 8,  y: 16, size: 22, color: "#ecb365", delay: 0.9, twinkleDuration: 3.2, twinkleDelay: 0.2, spinDuration: 14 },
    { x: 87, y: 22, size: 18, color: "#f0d290", delay: 1.1, twinkleDuration: 2.6, twinkleDelay: 0.7, spinDuration: 18 },
    { x: 6,  y: 68, size: 14, color: "#ffd86b", delay: 1.3, twinkleDuration: 3.8, twinkleDelay: 1.2, spinDuration: 22 },
    { x: 90, y: 72, size: 26, color: "#ecb365", delay: 1.5, twinkleDuration: 3.0, twinkleDelay: 0.4, spinDuration: 16 },
    { x: 78, y: 10, size: 12, color: "#f0d290", delay: 1.7, twinkleDuration: 2.4, twinkleDelay: 0.9, spinDuration: 20 },
    { x: 14, y: 84, size: 16, color: "#ffd86b", delay: 1.9, twinkleDuration: 3.4, twinkleDelay: 1.5, spinDuration: 24 },
    { x: 50, y: 6,  size: 10, color: "#ecb365", delay: 2.0, twinkleDuration: 2.8, twinkleDelay: 0.5, spinDuration: 12 }
];
</script>

<template>
    <div class="doodles" aria-hidden="true">
        <Motion
            v-for="(d, i) in doodles"
            :key="i"
            class="doodle"
            :style="{ left: `${d.x}%`, top: `${d.y}%`, color: d.color }"
            :initial="{ opacity: 0, scale: 0, rotate: -45 }"
            :animate="{
                opacity: [0.85, 0.35, 0.85],
                scale: 1,
                rotate: 360
            }"
            :transition="{
                opacity: { duration: d.twinkleDuration, repeat: Infinity, ease: 'easeInOut', delay: d.twinkleDelay },
                scale: { type: 'spring', bounce: 0.6, delay: d.delay, duration: 0.8 },
                rotate: { duration: d.spinDuration, repeat: Infinity, ease: 'linear', delay: d.delay }
            }">
            <Sparkle :size="d.size"/>
        </Motion>
    </div>
</template>

<style scoped>
.doodles {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 1;
}

.doodle {
    position: absolute;
}

@media (prefers-reduced-motion: reduce) {
    .doodle {
        animation: none;
    }
}
</style>
