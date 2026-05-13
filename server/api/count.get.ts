import { getCount } from "../utils/counter";

export default defineEventHandler(async (event) => {
    const count = await getCount(event);
    setHeader(event, "Cache-Control", "no-store");
    return { count };
});
