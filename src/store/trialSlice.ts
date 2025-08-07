import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { TrialData } from '../types/accelData';


interface AssetsState {
	trialData: TrialData;
}

const initialState: AssetsState = {
	trialData: {
		accelValues: [],
	},
};	

const trialSlice = createSlice({
	name: 'trial',
	initialState,
	reducers: {
		setTrialData(state, action: PayloadAction<TrialData>) {
			state.trialData = action.payload;
		},
		addMeasurement(state, action: PayloadAction<{ unitData: { x: number; y: number; z: number } }>) {

			state.trialData.accelValues.push({
				timestamp: Date.now(),
				...action.payload,
			});
		},
		clean(state) {
			state.trialData = {
				accelValues: [],
			};
		}
	},

});

export const { setTrialData, addMeasurement, clean } = trialSlice.actions;
export default trialSlice.reducer;