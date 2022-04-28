import React, { useEffect, useRef, useState } from 'react';

export const useCountDown = (idx: number, initCount: number = -1) => {
  const intervalRef = useRef<number>();
  const [countDown, setCountDown] = useState(initCount);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (idx == -1) return;

    if (isRunning && !intervalRef.current) {
      intervalRef.current = window.setInterval(() => {
        setCountDown((count) => {
          return count - 1;
        });
      }, 40);
    }

    return cleanup;
  }, [idx, isRunning]);

  useEffect(() => {
    setCountDown(initCount);
  }, [initCount]);

  useEffect(() => {
    if (countDown === 0) cleanup();
  }, [countDown]);

  const cleanup = () => {
    if (intervalRef.current) {
      setIsRunning(false);
      window.clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  };

  return {
    countDown,
    isRunning,
    stop: cleanup,
    start: (count?: number) => {
      setCountDown(count ?? initCount);
      setIsRunning(true);
    },
  };
};
