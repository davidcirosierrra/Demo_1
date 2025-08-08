import { useEffect } from 'react';

import type { OrientationUnitData } from '../types/accelData';

export function useDeviceOrientation(
	isActive: boolean,
	callback: (data: OrientationUnitData) => void,
	sampleRate = 100 // in ms
) {
	useEffect(() => {
		
		if (!isActive) return;

		let lastUpdate = 0;
		let fakeDataInterval: number | null = null;
		let hasRealEvent = false;

		const handler = (event: DeviceOrientationEvent) => {
		
			const now = Date.now();
			if (now - lastUpdate < sampleRate) return;
			lastUpdate = now;

			const { alpha = 0, beta = 0, gamma = 0 } = event;

			// Only consider it a real event if we get actual sensor data
			const hasValidData = alpha !== null && beta !== null && gamma !== null &&
				(Math.abs(alpha) > 0.1 || Math.abs(beta) > 0.1 || Math.abs(gamma) > 0.1);

		

			if (hasValidData) {
				hasRealEvent = true;
		

				// Clear fake data interval if real events are coming
				if (fakeDataInterval) {
					clearInterval(fakeDataInterval);
					fakeDataInterval = null;
				}
			}

			callback({ alpha: alpha ?? 0, beta: beta ?? 0, gamma: gamma ?? 0 });
		};

		// Generate fake orientation data
		const generateFakeData = () => {
			const now = Date.now();
			const time = now / 1000; // Convert to seconds for smoother animation

			const fakeData = {
				alpha: Math.sin(time * 0.5) * 180 + 180, // 0-360 degrees
				beta: Math.sin(time * 0.3) * 45, // -45 to 45 degrees
				gamma: Math.cos(time * 0.4) * 30  // -30 to 30 degrees
			};

		
			callback(fakeData);
		};

		window.addEventListener('deviceorientation', handler);
		
		const checkTimeout = setTimeout(() => {

			if (!hasRealEvent) {

				fakeDataInterval = setInterval(generateFakeData, sampleRate);
			} 

			
		}, 500); // Wait 500ms to see if real events come

		return () => {
			window.removeEventListener('deviceorientation', handler);
			clearTimeout(checkTimeout);
			if (fakeDataInterval) {
				clearInterval(fakeDataInterval);
			}
		};
	}, [isActive, callback, sampleRate]);
}