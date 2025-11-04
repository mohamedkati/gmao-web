import { useEffect, useState } from 'react';

/**
 * Hook pour détecter les media queries
 */
export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        
        const listener = () => setMatches(media.matches);

        listener();

        media.addEventListener('change', listener);

        return () => media.removeEventListener('change', listener);
    }, [matches,query]);



    return matches;
}

/**
 * Hooks prédéfinis pour les breakpoints courants
 */
export function useIsMobile() {
    return useMediaQuery('(max-width: 768px)');
}

export function useIsTablet() {
    return useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
}

export function useIsDesktop() {
    return useMediaQuery('(min-width: 1025px)');
}

export function useIsLargeScreen() {
    return useMediaQuery('(min-width: 1440px)');
}