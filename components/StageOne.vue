<script setup lang="ts">
import { Motion } from "motion-v";
import { ArrowRightCircle } from "lucide-vue-next";

defineEmits<{
    click: [];
}>();

const { count, formatted } = useCount();
</script>

<template>
    <Motion
        as="div"
        class="stage"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :exit="{ opacity: 0 }"
        :transition="{ duration: 0.3 }">
        <Motion
            as="img"
            class="patat-trigger"
            :initial="{ opacity: 0, scale: 0.5, rotate: 0 }"
            :animate="{ opacity: 1, scale: 1, rotate: [-3, 3, -3] }"
            :while-hover="{ scale: 1.1 }"
            :while-tap="{ scale: 0.9, rotate: 12 }"
            :transition="{
                opacity: { duration: 0.3 },
                scale: { type: 'spring', bounce: 0.5, delay: 0.30 },
                rotate: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }
            }"
            src="https://bmcdn.nl/assets/joypixels/v7.0/svg/1f35f.svg"
            alt="Patat of friet"
            height="90"
            width="90"
            @click="$emit('click')"/>

        <Motion
            as="h1"
            :initial="{ opacity: 0, y: 60 }"
            :animate="{ opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.5, delay: 0.20 } }"
            :transition="{ type: 'tween', duration: 0.3 }">
            Is het nou patat of friet?
        </Motion>

        <Motion
            as="p"
            :initial="{ opacity: 0, y: 60 }"
            :animate="{ opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.5, delay: 0.25 } }"
            :transition="{ type: 'tween', duration: 0.3 }">
            Deze website kan doormiddel van
            <a href="https://nl.wikipedia.org/wiki/Kunstmatige_intelligentie" rel="noopener" target="_blank">Artificial Intelligence</a>
            uitzoeken wat het antwoord op de meest brandende vraag in Nederland is.
        </Motion>

        <Motion
            :initial="{ opacity: 0, scale: 0.5 }"
            :animate="{ opacity: 1, scale: 1, transition: { type: 'spring', bounce: 0.5, delay: 0.40 } }"
            :transition="{ type: 'tween', duration: 0.3 }">
            <Button
                :icon-after="ArrowRightCircle"
                label="Kom erachter"
                @click="$emit('click')"/>
        </Motion>

        <Motion
            v-if="count > 0"
            as="p"
            class="count-line"
            :initial="{ opacity: 0, y: 10 }"
            :animate="{ opacity: 1, y: 0, transition: { delay: 0.55 } }"
            :transition="{ type: 'tween', duration: 0.3 }">
            Al <strong>{{ formatted }}</strong> keer aan de AI gevraagd
        </Motion>
    </Motion>
</template>

<style scoped>
.patat-trigger {
    cursor: pointer;
    user-select: none;
}

.count-line {
    margin: 0;
    color: var(--text);
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 1.5px;
    line-height: 1.4;
    opacity: 0.7;
    text-transform: uppercase;
}

.count-line strong {
    color: var(--text-prominent);
    font-weight: 900;
}

@media (max-width: 575.98px) {
    .count-line {
        font-size: 13px;
        letter-spacing: 1px;
    }
}
</style>
