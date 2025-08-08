interface AccelerometerInterface {
	new(options?: { frequency?: number }): {
		x: number | null;
		y: number | null;
		z: number | null;
		start(): void;
		stop(): void;
		addEventListener(type: 'reading' | 'error', callback: (event: Event) => void): void;
		removeEventListener(type: 'reading' | 'error', callback: (event: Event) => void): void;
	};
}

export function getAccelerometerData(): Promise<{ x: number; y: number; z: number }> {
	return new Promise((resolve, reject) => {
		const AccelerometerClass = (window as unknown as { Accelerometer?: AccelerometerInterface }).Accelerometer;

		if (!AccelerometerClass) {
			reject(new Error('Accelerometer not supported'));
			return;
		}

		const accelerometer = new AccelerometerClass({ frequency: 60 });

		const handleReading = () => {
			resolve({
				x: accelerometer.x ?? 0,
				y: accelerometer.y ?? 0,
				z: accelerometer.z ?? 0,
			});

			accelerometer.removeEventListener('reading', handleReading);
			accelerometer.stop();
		};

		const handleError = (event: Event) => {
			reject((event as any).error); // unavoidable `any` here unless you type event properly
			accelerometer.removeEventListener('error', handleError);
			accelerometer.stop();
		};

		accelerometer.addEventListener('reading', handleReading);
		accelerometer.addEventListener('error', handleError);

		try {
			accelerometer.start();
		} catch (err) {
			reject(err);
		}
	});
}
export function isAccelerometerSupported(): boolean {
	// Check for both Accelerometer API and DeviceMotion events
	return 'Accelerometer' in (window as unknown as { Accelerometer?: AccelerometerInterface }) ||
		'DeviceMotionEvent' in window;
}