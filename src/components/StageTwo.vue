<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";
import { AnimatePresence, Motion } from "motion-v";

const messagePool = [
    "De volledige menselijke geschiedenis doorzoeken...",
    "Blackbox vullen met Aviko...",
    "Nieuwsberichten doorzoeken...",
    "Oud frituurvet controleren...",
    "Vlaamse experts negeren...",
    "Het Patatmuseum raadplegen...",
    "Boven de rivieren kijken...",
    "Mayonaise versus patatsaus afwegen...",
    "Snackbar-recensies cross-checken...",
    "Reddit /r/thenetherlands consulteren...",
    "Onze Taal aan de lijn...",
    "Het patatkrokant-spectrum kalibreren...",
    "Vraag voor de zekerheid nog eens stellen...",
    "Patatzakje openvouwen..."
];

const shuffle = <T,>(arr: T[]): T[] => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
};

const messages = shuffle(messagePool);
const index = ref(0);

const interval = window.setInterval(() => {
    index.value = (index.value + 1) % messages.length;
}, 2000);

onBeforeUnmount(() => {
    window.clearInterval(interval);
});
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
            :initial="{ opacity: 0, scale: 0.5 }"
            :animate="{ opacity: 1, scale: 1, transition: { type: 'spring', bounce: 0.5, delay: 0.30 } }"
            :transition="{ type: 'tween', duration: 0.3 }"
            src="https://bmcdn.nl/assets/joypixels/v7.0/svg/1f916.svg"
            alt="Robot"
            height="90"
            width="90"/>

        <Motion
            as="h1"
            :initial="{ opacity: 0, y: 60 }"
            :animate="{ opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.5, delay: 0.20 } }"
            :transition="{ type: 'tween', duration: 0.3 }">
            Aan het nadenken&hellip;
        </Motion>

        <Motion
            aria-live="polite"
            aria-atomic="true"
            :initial="{ opacity: 0, y: 60 }"
            :animate="{ opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.5, delay: 0.25 } }"
            :transition="{ type: 'tween', duration: 0.3 }">
            <AnimatePresence mode="wait" :initial="false">
                <Motion
                    as="p"
                    :key="index"
                    :initial="{ opacity: 0, x: 60 }"
                    :animate="{ opacity: 1, x: 0, transition: { type: 'spring', bounce: 0.5 } }"
                    :exit="{ opacity: 0, x: -60 }"
                    :transition="{ type: 'tween', duration: 0.3 }">
                    {{ messages[index] }}
                </Motion>
            </AnimatePresence>
        </Motion>
    </Motion>
</template>
