import { useEffect, useRef } from 'react';

export function useFormAutoSave(watch, key) {
  const firstRun = useRef(true);
  useEffect(() => {
    const subscription = watch((value) => {
      if (firstRun.current) {
        firstRun.current = false;
        return;
      }
      localStorage.setItem(key, JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [watch, key]);
  return localStorage.getItem(key) ? 'Saved' : 'Not saved';
}
