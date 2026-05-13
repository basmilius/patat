export const useCount = () => {
    const count = useState<number>("count", () => 0);

    const formatted = computed(() => new Intl.NumberFormat("nl-NL").format(count.value));

    const increment = async () => {
        count.value += 1;

        try {
            const data = await $fetch<{ count: number }>("/api/count", { method: "POST" });
            count.value = data.count;
        } catch {
            // optimistic value blijft staan
        }
    };

    return { count, formatted, increment };
};
