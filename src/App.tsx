
import Button from '@mui/material/Button';
import './App.css'

import RadarChartComponent from './Components/radarChartComponent';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import SparkLineComponent from './Components/sparkLineComponent';
import { useEffect, useState, useCallback } from 'react';
import type { RootState } from './store/store';
import { useSelector, useDispatch } from 'react-redux';
import { addAccelMeasurement, addOrientationMeasurement, clean } from './store/trialSlice';
import { isAccelerometerSupported } from './measurement/measureAccelerometer';
import { useDeviceMotion, type MotionData } from './hooks/useDeviceMotion';
import { useDeviceOrientation } from './hooks/useDeviceOrientation';
import type { OrientationUnitData } from './types/accelData';
import LinearComponent from './Components/linearComponent';
const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});


function App() {

	const dispatch = useDispatch();
	const trialData = useSelector((state: RootState) => state.assets.trialData);
	const [isMeasuring, setIsMeasuring] = useState(false);
	const isAccelerometer = isAccelerometerSupported();

	// Use useCallback to stabilize the callback functions
	const handleMotionData = useCallback((unitData: MotionData) => {
		dispatch(addAccelMeasurement({ unitData }));
	}, [dispatch]);

	const handleOrientationData = useCallback((orientationUnitData: OrientationUnitData) => {
		dispatch(addOrientationMeasurement({ orientationUnitData }));
	}, [dispatch]);

	// Dispatch motion data to Redux only when measuring
	useDeviceMotion(isMeasuring, handleMotionData);
	useDeviceOrientation(isMeasuring, handleOrientationData);

	useEffect(() => {
		if (isMeasuring) {
			dispatch(clean());
		}
	}, [isMeasuring, dispatch]);

	if (!isAccelerometer) {
		return <div>Accelerometer not supported in this browser.</div>;
	}

	return (
		<>

			<ThemeProvider theme={darkTheme}>
				<CssBaseline />
				<h1>Vibss</h1>

				<Button variant="outlined" onClick={() => setIsMeasuring((v) => !v)}>  {isMeasuring ? 'Stop' : 'Start'}</Button>
				{!isMeasuring && trialData && trialData.accelValues.length > 0 &&
					<>
						<RadarChartComponent
							x_max={Math.max(...trialData.accelValues.map(ac => ac.unitData.x))}
							y_max={Math.max(...trialData.accelValues.map(ac => ac.unitData.y))}
							z_max={Math.max(...trialData.accelValues.map(ac => ac.unitData.z))}
							alpha_max={Math.max(...trialData.orientationValues.map(ac => ac.orientationData.alpha))}
							beta_max={Math.max(...trialData.orientationValues.map(ac => ac.orientationData.beta))}
							gamma_max={Math.max(...trialData.orientationValues.map(ac => ac.orientationData.gamma))}
							x={0}
							y={0}
							z={0}
							alpha={0}
							beta={0}
							gamma={0}
						/>

						<SparkLineComponent title='X acceleration' values={trialData.accelValues.map(ac => ac.unitData.x)} />


						<SparkLineComponent title='Y acceleration' values={trialData.accelValues.map(ac => ac.unitData.y)} />


						<SparkLineComponent title='Z acceleration' values={trialData.accelValues.map(ac => ac.unitData.z)} />


						<SparkLineComponent title='Alpha rotation' values={trialData.orientationValues.map(ac => ac.orientationData.alpha)} />


						<SparkLineComponent title='Beta rotation' values={trialData.orientationValues.map(ac => ac.orientationData.beta)} />


						<SparkLineComponent title='Gamma rotation' values={trialData.orientationValues.map(ac => ac.orientationData.gamma)} />

					</>
				}
				{isMeasuring && trialData && trialData.accelValues.length > 0 &&
					<>
						<RadarChartComponent
							x={trialData.accelValues.at(-1)?.unitData.x}
							y={trialData.accelValues.at(-1)?.unitData.y}
							z={trialData.accelValues.at(-1)?.unitData.z}
							alpha={trialData.orientationValues.at(-1)?.orientationData.alpha}
							beta={trialData.orientationValues.at(-1)?.orientationData.beta}
							gamma={trialData.orientationValues.at(-1)?.orientationData.gamma}

							x_max={Math.max(...trialData.accelValues.map(ac => ac.unitData.x))}
							y_max={Math.max(...trialData.accelValues.map(ac => ac.unitData.y))}
							z_max={Math.max(...trialData.accelValues.map(ac => ac.unitData.z))}
							alpha_max={Math.max(...trialData.orientationValues.map(ac => ac.orientationData.alpha))}
							beta_max={Math.max(...trialData.orientationValues.map(ac => ac.orientationData.beta))}
							gamma_max={Math.max(...trialData.orientationValues.map(ac => ac.orientationData.gamma))}
						/>
						<div style={{display: 'flex', flexDirection: 'row', gap: '0.1rem', flexWrap: 'wrap', justifyContent: 'center'}}>
						<LinearComponent title='X' value={trialData.accelValues.at(-1)?.unitData.x??0} />
						<LinearComponent title='Y' value={trialData.accelValues.at(-1)?.unitData.y??0} />
						<LinearComponent title='Z' value={trialData.accelValues.at(-1)?.unitData.z??0} />
						<LinearComponent title='Alpha' value={trialData.orientationValues.at(-1)?.orientationData.alpha??0} />
						<LinearComponent title='Beta' value={trialData.orientationValues.at(-1)?.orientationData.beta??0} />
						<LinearComponent title='Gamma' value={trialData.orientationValues.at(-1)?.orientationData.gamma??0} />
						</div>
					</>
				}


			</ThemeProvider>
		</>
	)
}

export default App
