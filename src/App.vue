<script setup lang="ts">
import { ref } from "vue";
import { AnimatePresence } from "motion-v";
import Container from "@/components/Container.vue";
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
</script>

<template>
    <SaltGrains/>
    <Container>
        <AnimatePresence mode="wait" :initial="false">
            <StageOne v-if="stage === 1" key="1" @click="onButtonClick"/>
            <StageTwo v-else-if="stage === 2" key="2"/>
            <StageThree v-else-if="stage === 3" key="3" @reset="stage = 1"/>
        </AnimatePresence>
    </Container>
</template>
