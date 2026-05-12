<script setup lang="ts">
import { Motion } from "motion-v";
import { ArrowRightCircle } from "lucide-vue-next";
import Button from "./Button.vue";

defineEmits<{
    click: [];
}>();
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
            src="https://bmcdn.nl/assets/joypixels/v7.0/svg/1f35f.svg"
            alt="Patat of friet"
            height="90"
            width="90"/>

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
    </Motion>
</template>
