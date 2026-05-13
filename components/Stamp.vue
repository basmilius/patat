<script setup lang="ts">
import { Motion } from "motion-v";

const topLines = ["JAZEKER!", "JEPSIE!", "AHA!", "BINGO!", "ALARM!", "EUREKA!", "WAARACHTIG!", "TADAA!"];
const bottomLines = ["geen twijfel", "100% echt", "bewezen!", "officieel!", "getoetst!", "waar en echt", "case closed"];

const top = topLines[Math.floor(Math.random() * topLines.length)];
const bottom = bottomLines[Math.floor(Math.random() * bottomLines.length)];

function generateBurstPoints(): string {
    const points: string[] = [];
    const cx = 100;
    const cy = 100;
    const spikes = 14;

    for (let i = 0; i < spikes * 2; i++) {
        const angle = (i / (spikes * 2)) * Math.PI * 2 - Math.PI / 2;
        const radius = i % 2 === 0 ? 96 : 70;
        const jitter = (Math.random() - 0.5) * 8;
        const x = cx + (radius + jitter) * Math.cos(angle);
        const y = cy + (radius + jitter) * Math.sin(angle);
        points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }

    return points.join(" ");
}

const burstPoints = generateBurstPoints();
</script>

<template>
    <Motion
        class="stamp"
        :initial="{ scale: 0, opacity: 0, rotate: -50 }"
        :animate="{ scale: 1, opacity: 1, rotate: [10, 16, 10] }"
        :transition="{
            scale: { type: 'spring', bounce: 0.6, delay: 1.0, duration: 0.9 },
            opacity: { duration: 0.4, delay: 1.0 },
            rotate: { duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }
        }">
        <svg class="burst" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <polygon
                :points="burstPoints"
                fill="#f5a240"
                stroke="#3a1a05"
                stroke-width="5"
                stroke-linejoin="round"/>
        </svg>
        <div class="content">
            <span class="top">{{ top }}</span>
            <strong class="middle">Patat</strong>
            <span class="bottom">{{ bottom }}</span>
        </div>
    </Motion>
</template>

<style scoped>
.stamp {
    position: fixed;
    top: 36px;
    right: 36px;
    width: 200px;
    height: 200px;
    z-index: 6;
    pointer-events: none;
    filter: drop-shadow(4px 5px 0 rgba(58, 26, 5, 0.55));
    transform-origin: center;
}

.burst {
    height: 100%;
    width: 100%;
    display: block;
}

.content {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #3a1a05;
    text-align: center;
    text-transform: uppercase;
    line-height: 1;
}

.top {
    font-size: 15px;
    font-weight: 900;
    letter-spacing: 1.5px;
}

.middle {
    margin: 4px 0;
    color: #b00505;
    font-size: 40px;
    font-weight: 900;
    letter-spacing: 1px;
    text-shadow:
        2px 2px 0 #ffd86b,
        3px 3px 0 #3a1a05;
    transform: rotate(-2deg);
}

.bottom {
    font-size: 12px;
    font-weight: 900;
    letter-spacing: 1px;
    text-transform: lowercase;
    font-style: italic;
}

@media (max-width: 767.98px) {
    .stamp {
        top: 16px;
        right: 16px;
        width: 130px;
        height: 130px;
    }

    .top {
        font-size: 10px;
        letter-spacing: 1px;
    }

    .middle {
        font-size: 26px;
        text-shadow:
            1.5px 1.5px 0 #ffd86b,
            2px 2px 0 #3a1a05;
    }

    .bottom {
        font-size: 9px;
    }
}
</style>
