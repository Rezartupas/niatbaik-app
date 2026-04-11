import { useState, useEffect, useRef } from 'react';

/**
 * useCounter — animates a number from 0 to `target` once the referenced
 * element enters the viewport. Uses requestAnimationFrame for smooth easing.
 *
 * @param {number} target   - The final number to count up to.
 * @param {number} duration - Animation duration in milliseconds (default 1800).
 * @returns {{ count: number, ref: React.RefObject }}
 *
 * @example
 *   const { count, ref } = useCounter(100, 2000);
 *   return <div ref={ref}>{count}+</div>;
 */
export function useCounter(target, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          // Ease-out cubic: decelerates towards the end
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * target));
          if (progress < 1) requestAnimationFrame(tick);
          else setCount(target);
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}
