import { useState, useEffect } from 'react';

let globalNow = Date.now();
const listeners = new Set<() => void>();

setInterval(() => {
  globalNow = Date.now();
  listeners.forEach((listener) => listener());
}, 1000);

export const useSyncedTime = () => {
  const [now, setNow] = useState(globalNow);

  useEffect(() => {
    const update = () => setNow(globalNow);
    listeners.add(update);
    return () => {
      listeners.delete(update);
    };
  }, []);

  return now;
};
