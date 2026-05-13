<script setup lang="ts">
const props = withDefaults(defineProps<{
    count?: number;
    emojis?: string[];
}>(), {
    count: 32,
    emojis: () => ["🍟", "🍟", "🍟", "🥔", "👌"]
});

interface Particle {
    char: string;
    left: number;
    delay: number;
    duration: number;
    size: number;
    rotateStart: number;
    rotateEnd: number;
    drift: number;
}

const random = (min: number, max: number) => Math.random() * (max - min) + min;

const particles = computed<Particle[]>(() =>
    Array.from({ length: props.count }, () => ({
        char: props.emojis[Math.floor(Math.random() * props.emojis.length)]!,
        left: random(0, 100),
        delay: random(0, 2.5),
        duration: random(4, 7.5),
        size: random(22, 48),
        rotateStart: random(-180, 180),
        rotateEnd: random(360, 720) * (Math.random() > 0.5 ? 1 : -1),
        drift: random(-20, 20)
    }))
);
</script>

<template>
    <ClientOnly>
        <div class="emoji-shower" aria-hidden="true">
            <span
                v-for="(p, i) in particles"
                :key="i"
                class="emoji"
                :style="{
                    left: `${p.left}vw`,
                    fontSize: `${p.size}px`,
                    animationDelay: `${p.delay}s`,
                    animationDuration: `${p.duration}s`,
                    '--rotate-start': `${p.rotateStart}deg`,
                    '--rotate-end': `${p.rotateEnd}deg`,
                    '--drift': `${p.drift}vw`
                }">
                {{ p.char }}
            </span>
        </div>
    </ClientOnly>
</template>

<style scoped>
.emoji-shower {
    position: fixed;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
    z-index: 0;
}

.emoji {
    position: absolute;
    top: -10vh;
    display: block;
    line-height: 1;
    user-select: none;
    animation-name: emoji-fall;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    will-change: transform;
}

@keyframes emoji-fall {
    0% {
        transform: translate3d(0, 0, 0) rotate(var(--rotate-start));
        opacity: 0;
    }
    10% {
        opacity: 1;
    }
    90% {
        opacity: 1;
    }
    100% {
        transform: translate3d(var(--drift), 120vh, 0) rotate(var(--rotate-end));
        opacity: 0;
    }
}

@media (prefers-reduced-motion: reduce) {
    .emoji {
        animation: none;
        display: none;
    }
}
</style>
