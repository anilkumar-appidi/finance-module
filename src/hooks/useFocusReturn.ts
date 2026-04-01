import { useRef, useCallback } from 'react';

export const useFocusReturn = () => {
  const triggerRef = useRef<HTMLElement | null>(null);

  const setTrigger = useCallback((element: HTMLElement | null) => {
    triggerRef.current = element;
  }, []);

  const returnFocus = useCallback(() => {
    if (triggerRef.current) {
      triggerRef.current.focus();
    }
  }, []);

  return { setTrigger, returnFocus, triggerRef };
};
