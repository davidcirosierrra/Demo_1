export type AccelUnitData = {
	x: number;
	y: number;
	z: number;
};

export type OrientationUnitData = {
	alpha: number;
	beta: number;
	gamma: number;
};

export type AccelData = {
	timestamp: number;
	unitData: AccelUnitData;

};

export type OrientationData = {
	timestamp: number;
	orientationData: OrientationUnitData;
};


export type TrialData = {
	accelValues: AccelData[];
	orientationValues: OrientationData[];
};
