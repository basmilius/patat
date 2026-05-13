<script setup lang="ts">
import { AnimatePresence, Motion } from "motion-v";
import { Plus } from "lucide-vue-next";

interface Fact {
    title: string;
    body: string;
}

const facts: Fact[] = [
    {
        title: "Patat won de taalwedstrijd",
        body: "'Patat' komt rechtstreeks van het Spaanse 'patata' (aardappel) en zit al eeuwen stevig verankerd in onze taal. 'Friet' is een latere verbastering van het Franse 'pomme frite'. Wie er als eerste was, mag bepalen hoe het heet."
    },
    {
        title: "Zelfs de woordenboeken weten het",
        body: "In het standaardwoordenboek van de Nederlandse taal staat 'patat' netjes als zelfstandig naamwoord. Bij 'friet' staat — niet geheel verbazingwekkend — een verwijzing naar 'patat'. De taalkundigen hebben er al lang over nagedacht."
    },
    {
        title: "18 kilo per Nederlander, per jaar",
        body: "Gemiddeld eet de Nederlander zo'n 18 kilo patat per jaar. Dat is bijna een patatje per drie dagen. Een land dat zoveel patat verstouwt, gaat dat product echt niet zomaar 'friet' noemen."
    },
    {
        title: "De FEBO is Nederlands erfgoed",
        body: "De automatiek-snackbar waar je patat uit een muur kunt trekken, bestaat sinds 1941 in Amsterdam. Pogingen om het over de grens te repliceren zijn nooit echt aangeslagen. Een puur Hollandse uitvinding, met patat als hoofdrolspeler."
    },
    {
        title: "Patatje oorlog is Hollands",
        body: "De combinatie van mayonaise, pindasaus en uitjes is een 100% Nederlandse uitvinding. Een culinaire bom die alleen kan ontstaan in een land dat dit gewasje gewoon 'patat' noemt — en die niemand anders zomaar navertelt."
    },
    {
        title: "Joppiesaus, ook Nederlands",
        body: "Joppiesaus werd in 1976 uitgevonden door Joop Hoogeveen in Glanerbrug, Twente. Sindsdien is geen Nederlandse patatkraam compleet zonder een schep joppie. Probeer dat eens uit te leggen aan iemand die het 'friet' noemt."
    },
    {
        title: "De kapsalon is Rotterdams",
        body: "In 2003 bedacht in een Rotterdams shoarmazaakje: patat onderop, shoarma erbovenop, gesmolten kaas, salade en sausjes. Een rechttoe rechtaan Nederlandse uitvinding met patat als onmisbaar fundament — geen Vlaams equivalent in zicht."
    },
    {
        title: "De aardappel kwam via Spanje",
        body: "Aardappels reisden in de 16e eeuw via Spaanse handelaren naar de Lage Landen. Het Spaanse woord 'patata' reisde gewoon mee. De oorsprong zit dus letterlijk verstopt in het Nederlandse woord 'patat' — niet in het Franse 'frite'."
    },
    {
        title: "Nederland is patat-exportland",
        body: "Nederland is wereldwijd een van de grootste exporteurs van aardappelen en pootgoed. Een flink deel van wat in andere landen op het bord ligt, komt hier vandaan. Wij leveren letterlijk de patat aan de rest van de wereld."
    },
    {
        title: "Een patatje doen is een werkwoord",
        body: "'Zullen we een patatje doen?' is een uitnodiging waar iedereen direct ja op zegt. 'Een frietje doen' bestaat in Nederland eigenlijk niet — onze taal heeft er een complete sociale bezigheid van gemaakt."
    },
    {
        title: "Van Gogh schilderde aardappeleters",
        body: "Vincent van Gogh maakte in 1885 'De Aardappeleters', een wereldberoemd Nederlands meesterwerk over een groep mensen rond een schaal aardappels. Geen 'De Frietetters' te bekennen in de kunstgeschiedenis. Onze patat-fixatie is officieel cultureel erfgoed."
    },
    {
        title: "De puntzak hoort bij Nederland",
        body: "Patat in een kartonnen puntzak, vorkje erin geprikt, klaar. Geen bakje, geen bord, geen onzin. Een vorm zo eigen aan Nederland dat hij vanzelf bij het straatbeeld is gaan horen — net als de patat zelf."
    }
];

const open = ref<number | null>(null);

const toggle = (i: number) => {
    open.value = open.value === i ? null : i;
};
</script>

<template>
    <Motion
        as="section"
        class="fun-facts"
        :initial="{ opacity: 0, y: 30 }"
        :animate="{ opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.4, delay: 0.7 } }"
        :transition="{ type: 'tween', duration: 0.3 }">
        <Motion
            as="h2"
            :initial="{ opacity: 0, scale: 0.8, rotate: -3 }"
            :animate="{ opacity: 1, scale: 1, rotate: -2, transition: { type: 'spring', bounce: 0.5, delay: 0.8 } }">
            Wist je dat&hellip;
        </Motion>

        <ul class="fun-facts-list">
            <li
                v-for="(fact, i) in facts"
                :key="i"
                class="fun-fact"
                :class="{ 'is-open': open === i }">
                <button
                    type="button"
                    class="fun-fact-title"
                    :aria-expanded="open === i"
                    :aria-controls="`fun-fact-body-${i}`"
                    @click="toggle(i)">
                    <span>{{ fact.title }}</span>
                    <Plus class="icon"/>
                </button>
                <AnimatePresence :initial="false">
                    <Motion
                        v-if="open === i"
                        :id="`fun-fact-body-${i}`"
                        :initial="{ height: 0, opacity: 0 }"
                        :animate="{ height: 'auto', opacity: 1 }"
                        :exit="{ height: 0, opacity: 0 }"
                        :transition="{ duration: 0.25, ease: [0.55, 0, 0.1, 1] }"
                        class="fun-fact-body-wrap">
                        <p class="fun-fact-body">{{ fact.body }}</p>
                    </Motion>
                </AnimatePresence>
            </li>
        </ul>
    </Motion>
</template>

<style scoped>
.fun-facts {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
    max-width: 660px;
    margin-bottom: 60px;
}

.fun-facts h2 {
    margin: 0;
    color: #ffd86b;
    font-size: 36px;
    font-weight: 900;
    letter-spacing: -0.01em;
    line-height: 1;
    text-align: center;
    text-transform: uppercase;
    text-shadow:
        2px 0 0 #3a1a05,
        -2px 0 0 #3a1a05,
        0 2px 0 #3a1a05,
        0 -2px 0 #3a1a05,
        2px 2px 0 #3a1a05,
        3px 5px 0 #3a1a05;
    transform-origin: center;
}

.fun-facts-list {
    display: flex;
    flex-direction: column;
    gap: 14px;
    margin: 0;
    padding: 0;
    list-style: none;
    width: 100%;
}

.fun-fact {
    background: #f0d290;
    border: 4px solid #3a1a05;
    border-radius: 18px;
    box-shadow: 5px 6px 0 #3a1a05;
    overflow: hidden;
    transition: transform 120ms ease-out, box-shadow 120ms ease-out;
}

.fun-fact:hover {
    transform: translate(-1px, -2px);
    box-shadow: 6px 8px 0 #3a1a05;
}

.fun-fact.is-open {
    background: #ffd86b;
}

.fun-fact-title {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    background: transparent;
    border: 0;
    color: #3a1a05;
    cursor: pointer;
    font-family: inherit;
    font-size: 18px;
    font-weight: 900;
    letter-spacing: 0.5px;
    line-height: 1.2;
    outline: 0;
    padding: 18px 22px;
    text-align: left;
    text-transform: uppercase;
}

.fun-fact-title:focus-visible {
    outline: 3px solid #b00505;
    outline-offset: -7px;
    border-radius: 14px;
}

.fun-fact-title .icon {
    flex-shrink: 0;
    height: 26px;
    width: 26px;
    color: #b00505;
    transition: transform 220ms cubic-bezier(0.55, 0, 0.1, 1);
}

.fun-fact.is-open .fun-fact-title .icon {
    transform: rotate(135deg);
}

.fun-fact-body-wrap {
    overflow: hidden;
}

.fun-fact-body {
    margin: 0;
    padding: 0 22px 20px;
    color: #3a1a05;
    font-size: 17px;
    font-weight: 500;
    line-height: 1.5;
    max-width: none;
    text-align: left;
}

@media (max-width: 575.98px) {
    .fun-facts {
        margin-bottom: 40px;
    }

    .fun-facts h2 {
        font-size: 30px;
        text-shadow:
            1.5px 0 0 #3a1a05,
            -1.5px 0 0 #3a1a05,
            0 1.5px 0 #3a1a05,
            0 -1.5px 0 #3a1a05,
            1.5px 1.5px 0 #3a1a05,
            2px 4px 0 #3a1a05;
    }

    .fun-fact-title {
        font-size: 16px;
        letter-spacing: 0.3px;
        padding: 14px 18px;
        gap: 12px;
    }

    .fun-fact-title .icon {
        height: 22px;
        width: 22px;
    }

    .fun-fact-body {
        font-size: 17px;
        padding: 0 18px 16px;
    }
}
</style>
