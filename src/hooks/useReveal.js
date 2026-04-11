import { useEffect, useRef } from 'react';

/**
 * useReveal — triggers the `.visible` CSS class when the referenced element
 * enters the viewport using IntersectionObserver.
 *
 * @param {number} threshold - How much of the element must be visible (0–1).
 * @returns {React.RefObject} - Attach this ref to the target DOM element.
 *
 * @example
 *   const ref = useReveal(0.15);
 *   return <section ref={ref} className="reveal">…</section>;
 */
export function useReveal(threshold = 0.15) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          // Also add visible class to all reveal children for proper animation
          el.querySelectorAll('.reveal').forEach(child => {
            child.classList.add('visible');
          });
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
