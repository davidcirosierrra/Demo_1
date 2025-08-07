import { useEffect } from 'react';

export type MotionData = { x: number; y: number; z: number };

export function useDeviceMotion(
  isActive: boolean,
  callback: (data: MotionData) => void,
  sampleRate = 100 // in ms
) {
  useEffect(() => {
    if (!isActive) return;

    let lastUpdate = 0;

    const handler = (event: DeviceMotionEvent) => {
      const now = Date.now();
      if (now - lastUpdate < sampleRate) return;
      lastUpdate = now;

      const { x = 0, y = 0, z = 0 } = event.accelerationIncludingGravity || {};

	  console.log('DeviceMotion data:', { x, y, z });
      callback({ x: x ?? 0, y: y ?? 0, z: z ?? 0 });
    };

    window.addEventListener('devicemotion', handler);

    return () => {
      window.removeEventListener('devicemotion', handler);
    };
  }, [isActive, callback, sampleRate]);
}