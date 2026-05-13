<template>
    <div class="container">
        <slot/>
    </div>
</template>

<style scoped>
.container {
    position: relative;
    display: flex;
    padding: 36px 36px 80px;
    min-height: 100dvh;
    width: 100vw;
    align-items: center;
    justify-content: center;
}
</style>
