import { incrementCount } from "../utils/counter";

export default defineEventHandler(async (event) => {
    const count = await incrementCount(event);
    setHeader(event, "Cache-Control", "no-store");
    return { count };
});
