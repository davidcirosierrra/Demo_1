import { configureStore } from '@reduxjs/toolkit';

import assetsSliceReducer from './trialSlice';

export const store = configureStore({
	reducer: {
		assets: assetsSliceReducer as typeof assetsSliceReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
