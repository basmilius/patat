<script setup lang="ts">
import { Motion } from "motion-v";

interface Position {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
}

interface SplatConfig {
    position: Position;
    size: number;
    color: string;
    rotation: number;
    seed: number;
    delay: number;
    dots: Array<{ cx: number; cy: number; r: number }>;
}

const splats: SplatConfig[] = [
    {
        position: { top: "-90px", left: "-80px" },
        size: 320,
        color: "#b00505",
        rotation: -14,
        seed: 42,
        delay: 0.15,
        dots: [
            { cx: 200, cy: 30, r: 8 },
            { cx: 175, cy: 55, r: 5 },
            { cx: 35, cy: 175, r: 7 },
            { cx: 215, cy: 60, r: 4 }
        ]
    },
    {
        position: { top: "32%", right: "-110px" },
        size: 230,
        color: "#f5a240",
        rotation: 22,
        seed: 137,
        delay: 0.4,
        dots: [
            { cx: 25, cy: 90, r: 7 },
            { cx: 15, cy: 60, r: 4 },
            { cx: 35, cy: 130, r: 5 }
        ]
    },
    {
        position: { bottom: "12%", left: "-70px" },
        size: 240,
        color: "#f0d290",
        rotation: -28,
        seed: 521,
        delay: 0.65,
        dots: [
            { cx: 185, cy: 55, r: 6 },
            { cx: 170, cy: 80, r: 8 },
            { cx: 195, cy: 30, r: 4 }
        ]
    }
];

function generateBlobPath(seed: number, points: number = 10, baseRadius: number = 75, variance: number = 16): string {
    let s = seed;
    const random = () => {
        s = (s * 9301 + 49297) % 233280;
        return s / 233280;
    };

    const center = 100;
    const pts: Array<{ x: number; y: number }> = [];
    for (let i = 0; i < points; i++) {
        const angle = (i / points) * Math.PI * 2;
        const r = baseRadius + (random() - 0.5) * variance * 2;
        pts.push({
            x: center + r * Math.cos(angle),
            y: center + r * Math.sin(angle)
        });
    }

    const smoothness = 0.34;
    const path: string[] = [`M${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`];

    for (let i = 0; i < points; i++) {
        const p0 = pts[(i - 1 + points) % points];
        const p1 = pts[i];
        const p2 = pts[(i + 1) % points];
        const p3 = pts[(i + 2) % points];

        const c1x = p1.x + (p2.x - p0.x) * smoothness;
        const c1y = p1.y + (p2.y - p0.y) * smoothness;
        const c2x = p2.x - (p3.x - p1.x) * smoothness;
        const c2y = p2.y - (p3.y - p1.y) * smoothness;

        path.push(`C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`);
    }
    path.push("Z");

    return path.join(" ");
}
</script>

<template>
    <div class="splats" aria-hidden="true">
        <Motion
            v-for="(splat, i) in splats"
            :key="i"
            class="splat"
            :style="{
                top: splat.position.top,
                right: splat.position.right,
                bottom: splat.position.bottom,
                left: splat.position.left,
                width: `${splat.size}px`,
                height: `${splat.size}px`
            }"
            :initial="{ scale: 0, opacity: 0, rotate: splat.rotation - 35 }"
            :animate="{ scale: 1, opacity: 1, rotate: splat.rotation }"
            :transition="{ type: 'spring', bounce: 0.5, delay: splat.delay, duration: 1.0 }">
            <svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">
                <g :fill="splat.color" stroke="#3a1a05" stroke-width="5" stroke-linejoin="round">
                    <path :d="generateBlobPath(splat.seed)" transform="translate(10 10)"/>
                    <circle
                        v-for="(dot, di) in splat.dots"
                        :key="di"
                        :cx="dot.cx + 10"
                        :cy="dot.cy + 10"
                        :r="dot.r"
                        stroke-width="3"/>
                </g>
            </svg>
        </Motion>
    </div>
</template>

<style scoped>
.splats {
    position: fixed;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
    z-index: 0;
}

.splat {
    position: absolute;
    filter: drop-shadow(4px 5px 0 rgba(58, 26, 5, 0.55));
}

.splat svg {
    width: 100%;
    height: 100%;
    display: block;
}

@media (max-width: 767.98px) {
    .splat {
        transform-origin: center;
    }
}
</style>
