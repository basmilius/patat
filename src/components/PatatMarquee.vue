<script setup lang="ts">
const phrases = [
    "DE GROOTSTE VRAAG ALLER TIJDEN",
    "GETOETST DOOR FRITUURMEESTERS",
    "100% AARDAPPEL ENERGY",
    "ZOUT NAAR SMAAK",
    "🍟",
    "MET OF ZONDER SAUS",
    "BETER DAN GOOGLEN",
    "WACHT NIET TE LANG, ETEN WORDT KOUD",
    "AANBEVOLEN MET MAYO",
    "WETENSCHAPPELIJK ONDERBOUWD",
    "PAS OP VOOR HEET FRITUURVET",
    "SNACKBAR-CERTIFIED"
];

const line = phrases.join(" · ");
</script>

<template>
    <div class="marquee" aria-hidden="true">
        <div class="marquee-track">
            <span v-for="i in 4" :key="i" class="marquee-item">{{ line }} ·&nbsp;</span>
        </div>
    </div>
</template>

<style scoped>
.marquee {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    padding: 14px 0;
    background: #ffd86b;
    border-top: 4px solid #3a1a05;
    box-shadow: 0 -3px 0 #b00505;
    z-index: 2;
    pointer-events: none;
}

.marquee-track {
    display: flex;
    width: max-content;
    animation: marquee-scroll 40s linear infinite;
    will-change: transform;
}

.marquee-item {
    flex-shrink: 0;
    color: #3a1a05;
    font-size: 14px;
    font-weight: 900;
    letter-spacing: 3px;
    white-space: nowrap;
}

@keyframes marquee-scroll {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
}

@media (prefers-reduced-motion: reduce) {
    .marquee-track {
        animation: none;
    }
}
</style>
