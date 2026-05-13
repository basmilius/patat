import type { H3Event } from "h3";

interface KvNamespace {
    get(key: string): Promise<string | null>;
    put(key: string, value: string): Promise<void>;
}

const INITIAL_COUNT = 2014387;
const KV_KEY = "total";

let devCount: number | null = null;

const getKv = (event: H3Event): KvNamespace | undefined => {
    const context = event.context as { cloudflare?: { env?: { PATAT_STATS?: KvNamespace } } };
    return context.cloudflare?.env?.PATAT_STATS;
};

const parseCount = (raw: string | null): number => {
    if (raw === null) {
        return INITIAL_COUNT;
    }
    const parsed = parseInt(raw, 10);
    return Number.isFinite(parsed) ? parsed : INITIAL_COUNT;
};

export const getCount = async (event: H3Event): Promise<number> => {
    const kv = getKv(event);

    if (!kv) {
        if (devCount === null) {
            devCount = INITIAL_COUNT;
        }
        return devCount;
    }

    return parseCount(await kv.get(KV_KEY));
};

export const incrementCount = async (event: H3Event): Promise<number> => {
    const kv = getKv(event);

    if (!kv) {
        if (devCount === null) {
            devCount = INITIAL_COUNT;
        }
        devCount += 1;
        return devCount;
    }

    const next = parseCount(await kv.get(KV_KEY)) + 1;
    await kv.put(KV_KEY, String(next));
    return next;
};
