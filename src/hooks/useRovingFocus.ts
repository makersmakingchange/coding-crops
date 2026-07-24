import { useState, useEffect } from "react";

export function useRovingFocus(count: number, prefix: string) {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        document.getElementById(`${prefix}-${activeIndex}`)?.focus();
    }, [activeIndex, prefix]);

    const focus = (index: number) => {
        setActiveIndex(index);
        requestAnimationFrame(() => {
            document.getElementById(`${prefix}-${index}`)?.focus();
        });
    };

    return {
        activeIndex,
        setActiveIndex,
        focus,
    };
}