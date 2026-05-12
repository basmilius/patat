<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { AnimatePresence } from "motion-v";
import CartoonSplats from "@/components/CartoonSplats.vue";
import Container from "@/components/Container.vue";
import Doodles from "@/components/Doodles.vue";
import EmojiShower from "@/components/EmojiShower.vue";
import PatatMarquee from "@/components/PatatMarquee.vue";
import SaltGrains from "@/components/SaltGrains.vue";
import StageOne from "@/components/StageOne.vue";
import StageTwo from "@/components/StageTwo.vue";
import StageThree from "@/components/StageThree.vue";

const stage = ref(1);

const onButtonClick = async () => {
    stage.value = 2;

    await new Promise(resolve => setTimeout(resolve, 8000));

    stage.value = 3;
};

const KONAMI = [
    "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
    "KeyB", "KeyA"
];

const konamiActive = ref(false);
let konamiIndex = 0;
let konamiTimer: number | undefined;

const onKeyDown = (e: KeyboardEvent) => {
    if (e.code === KONAMI[konamiIndex]) {
        konamiIndex++;

        if (konamiIndex === KONAMI.length) {
            konamiActive.value = true;
            konamiIndex = 0;

            window.clearTimeout(konamiTimer);
            konamiTimer = window.setTimeout(() => {
                konamiActive.value = false;
            }, 6500);
        }
    } else {
        konamiIndex = e.code === KONAMI[0] ? 1 : 0;
    }
};

onMounted(() => window.addEventListener("keydown", onKeyDown));
onBeforeUnmount(() => {
    window.removeEventListener("keydown", onKeyDown);
    window.clearTimeout(konamiTimer);
});
</script>

<template>
    <CartoonSplats/>
    <SaltGrains/>
    <Doodles/>
    <Container>
        <AnimatePresence mode="wait" :initial="false">
            <StageOne v-if="stage === 1" key="1" @click="onButtonClick"/>
            <StageTwo v-else-if="stage === 2" key="2"/>
            <StageThree v-else-if="stage === 3" key="3" @reset="stage = 1"/>
        </AnimatePresence>
    </Container>
    <PatatMarquee/>
    <EmojiShower
        v-if="konamiActive"
        :count="120"
        :emojis="['🍟', '🍟', '🥔', '👌', '🎉', '✨', '⭐', '🌟', '💥', '🧂', '🍅', '🥨']"/>
</template>
