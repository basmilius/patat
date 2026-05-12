import { Resvg } from "@resvg/resvg-js";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptsDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(scriptsDir, "..");

const FRIES_SVG_PATH = join(scriptsDir, "fries-emoji.svg");
const OG_TEMPLATE_PATH = join(scriptsDir, "og.svg");
const OUTPUT_PATH = join(projectRoot, "public", "og.png");

function renderFriesAsBase64(): string {
    const svg = readFileSync(FRIES_SVG_PATH, "utf-8");

    const resvg = new Resvg(svg, {
        fitTo: { mode: "width", value: 480 },
        background: "rgba(0, 0, 0, 0)"
    });

    return resvg.render().asPng().toString("base64");
}

function renderOgImage(friesBase64: string): Buffer {
    const template = readFileSync(OG_TEMPLATE_PATH, "utf-8");
    const svg = template.replace("{{FRIES_IMAGE}}", `data:image/png;base64,${friesBase64}`);

    const resvg = new Resvg(svg, {
        font: {
            loadSystemFonts: true,
            defaultFontFamily: "Helvetica"
        }
    });

    return resvg.render().asPng();
}

const friesBase64 = renderFriesAsBase64();
const ogPng = renderOgImage(friesBase64);

writeFileSync(OUTPUT_PATH, ogPng);

console.log(`Generated ${OUTPUT_PATH} (${(ogPng.length / 1024).toFixed(1)} KB)`);
