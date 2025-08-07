export type AccelUnitData = {
	x: number;
	y: number;
	z: number;
};

export type AccelData = {
	timestamp: number;
	unitData: AccelUnitData;
};

export type TrialData = {
	accelValues: AccelData[];
};
