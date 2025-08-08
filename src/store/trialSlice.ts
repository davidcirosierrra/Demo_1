import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { TrialData } from '../types/accelData';


interface AssetsState {
	trialData: TrialData;
}

const initialState: AssetsState = {
	trialData: {
		accelValues: [],
		orientationValues: [],
	},
};

const trialSlice = createSlice({
	name: 'trial',
	initialState,
	reducers: {
		setTrialData(state, action: PayloadAction<TrialData>) {
			state.trialData = action.payload;
		},
		addAccelMeasurement(state, action: PayloadAction<{ unitData: { x: number; y: number; z: number } }>) {

			state.trialData.accelValues.push({
				timestamp: Date.now(),
				unitData: action.payload.unitData,
			});
		},
		addOrientationMeasurement(state, action: PayloadAction<{ orientationUnitData: { alpha: number; beta: number; gamma: number } }>) {
			state.trialData.orientationValues.push({
				timestamp: Date.now(),
				orientationData: action.payload.orientationUnitData,		
			});
		},
		clean(state) {
			state.trialData = {
				accelValues: [],
				orientationValues: [],
			};
		}
	},

});

export const { setTrialData, addAccelMeasurement, addOrientationMeasurement, clean } = trialSlice.actions;
export default trialSlice.reducer;