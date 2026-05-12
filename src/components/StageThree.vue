<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Motion } from "motion-v";
import { RotateCcw, Share2 } from "lucide-vue-next";
import Button from "./Button.vue";
import EmojiShower from "./EmojiShower.vue";
import Stamp from "./Stamp.vue";

defineEmits<{
    reset: [];
}>();

const answers = [
    "Het is Patat.",
    "Hartstikke patat.",
    "Pure patat.",
    "Officieel patat.",
    "100% patat.",
    "Patat, en niets anders.",
    "Het was, is en blijft patat.",
    "Onbetwist patat.",
    "Gewoon, patat.",
    "Onmiskenbaar patat."
];

const answer = answers[Math.floor(Math.random() * answers.length)];

const canShare = ref(false);

onMounted(() => {
    canShare.value = typeof navigator !== "undefined" && typeof navigator.share === "function";
});

const onShareClick = async () => {
    const data: ShareData = {
        title: "Is het nou patat of friet?",
        text: "Is het nou patat of friet? Vraag het de AI.",
        url: window.location.href
    };

    try {
        const response = await fetch("/og.png");

        if (response.ok) {
            const blob = await response.blob();
            const file = new File([blob], "is-het-patat.png", { type: "image/png" });

            if (navigator.canShare?.({ files: [file] })) {
                data.files = [file];
            }
        }
    } catch {
        // share zonder file als fetch faalt
    }

    try {
        await navigator.share(data);
    } catch {
        // door gebruiker afgebroken
    }
};
</script>

<template>
    <Motion
        as="div"
        class="stage"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :exit="{ opacity: 0 }"
        :transition="{ duration: 0.3 }">
        <EmojiShower/>
        <Stamp/>

        <Motion
            as="img"
            :initial="{ opacity: 0, scale: 0.5, rotate: 0 }"
            :animate="{ opacity: 1, scale: 1, rotate: [-4, 8, -4] }"
            :transition="{
                opacity: { duration: 0.3 },
                scale: { type: 'spring', bounce: 0.5, delay: 0.30 },
                rotate: { duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }
            }"
            src="https://bmcdn.nl/assets/joypixels/v7.0/svg/1f91f-1f3fc.svg"
            alt="Hand"
            height="90"
            width="90"/>

        <Motion
            as="h1"
            class="answer"
            :initial="{ opacity: 0, y: 60 }"
            :animate="{ opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.5, delay: 0.20 } }"
            :transition="{ type: 'tween', duration: 0.3 }">
            {{ answer }}
        </Motion>

        <Motion
            as="p"
            :initial="{ opacity: 0, y: 60 }"
            :animate="{ opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.5, delay: 0.25 } }"
            :transition="{ type: 'tween', duration: 0.3 }">
            Na een paar grote berekeningen heeft de AI het enige juiste antwoord kunnen vinden. Het is patat.
        </Motion>

        <Motion
            v-if="canShare"
            :initial="{ opacity: 0, scale: 0.5 }"
            :animate="{ opacity: 1, scale: 1, transition: { type: 'spring', bounce: 0.5, delay: 0.40 } }"
            :transition="{ type: 'tween', duration: 0.3 }">
            <Button
                :icon-before="Share2"
                label="Stuur naar twijfelaar"
                @click="onShareClick"/>
        </Motion>

        <Motion
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.3, delay: 0.50 } }"
            :transition="{ type: 'tween', duration: 0.3 }">
            <button
                type="button"
                class="reset-link"
                @click="$emit('reset')">
                <RotateCcw class="reset-icon"/>
                <span>Opnieuw</span>
            </button>
        </Motion>
    </Motion>
</template>

<style scoped>
.reset-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: transparent;
    border: 0;
    color: var(--text);
    font-family: inherit;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 1px;
    opacity: 0.7;
    outline: 0;
    padding: 6px 12px;
    text-transform: uppercase;
    cursor: pointer;
    transition: opacity 180ms cubic-bezier(0.55, 0, 0.1, 1);
}

.reset-link:hover,
.reset-link:focus-visible {
    opacity: 1;
}

.reset-icon {
    height: 16px;
    width: 16px;
}
</style>
