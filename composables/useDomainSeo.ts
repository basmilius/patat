interface DomainVariant {
    host: string;
    word: string;
    title: string;
    description: string;
    hreflang: string;
}

const PATAT: DomainVariant = {
    host: "ishetpatat.nl",
    word: "patat",
    title: "Is het nou patat of friet? · Het AI-antwoord op IsHetPatat.nl",
    description: "De ultieme vraag van Nederland, eindelijk beslecht door AI. Druk op de knop op IsHetPatat.nl en ontdek wat het officiële antwoord is.",
    hreflang: "nl-NL"
};

const FRIET: DomainVariant = {
    host: "ishetfriet.nl",
    word: "friet",
    title: "Is het nou friet of patat? · Het AI-antwoord op IsHetFriet.nl",
    description: "De ultieme vraag van Vlaanderen, eindelijk beslecht door AI. Druk op de knop op IsHetFriet.nl en ontdek wat het officiële antwoord is.",
    hreflang: "nl-BE"
};

const VARIANTS = [PATAT, FRIET];

const variantFor = (host: string): DomainVariant => {
    if (host.includes("friet")) {
        return FRIET;
    }
    return PATAT;
};

export const useDomainSeo = () => {
    const url = useRequestURL();
    const host = url.hostname;
    const variant = variantFor(host);
    const origin = `${url.protocol}//${host}`;
    const canonical = `${origin}/`;
    const ogImage = `${origin}/og.png`;

    useSeoMeta({
        title: variant.title,
        description: variant.description,
        author: "Bas Milius",
        themeColor: "#064663",
        ogType: "website",
        ogTitle: variant.title,
        ogDescription: variant.description,
        ogUrl: canonical,
        ogSiteName: `IsHet${variant.word.charAt(0).toUpperCase()}${variant.word.slice(1)}.nl`,
        ogLocale: variant.hreflang.replace("-", "_"),
        ogImage,
        ogImageType: "image/png",
        ogImageWidth: 1200,
        ogImageHeight: 630,
        ogImageAlt: "Is het nou patat of friet? AI heeft het antwoord.",
        twitterCard: "summary_large_image",
        twitterTitle: variant.title,
        twitterDescription: variant.description,
        twitterImage: ogImage,
        twitterImageAlt: "Is het nou patat of friet? AI heeft het antwoord."
    });

    const alternateLinks = VARIANTS.map(v => ({
        rel: "alternate",
        hreflang: v.hreflang,
        href: `https://${v.host}/`
    }));

    const jsonLdWebsite = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: `IsHet${variant.word.charAt(0).toUpperCase()}${variant.word.slice(1)}.nl`,
        alternateName: "Is het nou patat of friet?",
        url: canonical,
        inLanguage: variant.hreflang,
        description: variant.description,
        publisher: {
            "@type": "Person",
            name: "Bas Milius",
            url: "https://bas.dev"
        }
    };

    const jsonLdFaq = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            {
                "@type": "Question",
                name: "Is het nou patat of friet?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Dat hangt af van waar je woont. Boven de rivieren in Nederland zegt men patat, in Vlaanderen en de zuidelijke provincies zegt men friet. Op deze website laat een AI er definitief uitsluitsel over geven."
                }
            },
            {
                "@type": "Question",
                name: "Wat is het verschil tussen patat en friet?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "In de basis is er geen verschil: beide woorden verwijzen naar dezelfde gefrituurde aardappelreep. Het verschil zit in de naam en is voornamelijk regionaal bepaald."
                }
            },
            {
                "@type": "Question",
                name: "Wie zegt patat en wie zegt friet?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "In het noorden en midden van Nederland zegt men patat. In Limburg, Brabant en België zegt men friet. Beide woorden verwijzen naar hetzelfde gefrituurde aardappelproduct."
                }
            }
        ]
    };

    useHead({
        htmlAttrs: { lang: variant.hreflang.toLowerCase() },
        link: [
            { rel: "canonical", href: canonical },
            ...alternateLinks,
            { rel: "alternate", hreflang: "x-default", href: "https://ishetpatat.nl/" }
        ],
        script: [
            {
                type: "application/ld+json",
                innerHTML: JSON.stringify(jsonLdWebsite)
            },
            {
                type: "application/ld+json",
                innerHTML: JSON.stringify(jsonLdFaq)
            }
        ]
    });
};
