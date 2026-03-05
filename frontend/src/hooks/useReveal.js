import { useEffect } from 'react';

const useReveal = (selector = '[data-reveal]', threshold = 0.12) => {
    useEffect(() => {
        const els = document.querySelectorAll(selector);
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add('animate-in');
                        observer.unobserve(e.target);
                    }
                });
            },
            { threshold }
        );
        els.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [selector, threshold]);
};

export default useReveal;
