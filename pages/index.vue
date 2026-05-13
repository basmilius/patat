<script setup lang="ts">
import { AnimatePresence } from "motion-v";

const stage = ref(1);

const { count, increment } = useCount();

if (import.meta.server) {
    const event = useRequestEvent();
    if (event) {
        const { getCount } = await import("../server/utils/counter");
        count.value = await getCount(event);
    }
}

const onButtonClick = async () => {
    stage.value = 2;
    increment();

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
let konamiTimer: ReturnType<typeof setTimeout> | undefined;

const onKeyDown = (e: KeyboardEvent) => {
    if (e.code === KONAMI[konamiIndex]) {
        konamiIndex++;

        if (konamiIndex === KONAMI.length) {
            konamiActive.value = true;
            konamiIndex = 0;

            if (konamiTimer) {
                clearTimeout(konamiTimer);
            }
            konamiTimer = setTimeout(() => {
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
    if (konamiTimer) {
        clearTimeout(konamiTimer);
    }
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
