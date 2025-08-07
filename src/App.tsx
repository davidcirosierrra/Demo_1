
import Button from '@mui/material/Button';
import './App.css'
import RadarChartComponent from './Components/radarChartComponent';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import SparkLineComponent from './Components/sparkLineComponent';
import { useEffect, useState } from 'react';
import type { RootState } from './store/store';
import { useSelector, useDispatch } from 'react-redux';
import { addMeasurement, clean } from './store/trialSlice';
import { isAccelerometerSupported } from './measurement/measureAccelerometer';
import { useDeviceMotion } from './hooks/useDeviceMotion';
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

	// Dispatch motion data to Redux only when measuring
	useDeviceMotion(isMeasuring, (unitData) => {
		dispatch(addMeasurement({ unitData }));
	});

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
				<h1>Vibs</h1>

				<Button variant="outlined" onClick={() => setIsMeasuring((v) => !v)}>  {isMeasuring ? 'Stop' : 'Start'}</Button>
				{!isMeasuring && trialData && trialData.accelValues.length > 0 &&
					<>
						<RadarChartComponent x={Math.max(...trialData.accelValues.map(ac => ac.unitData.x))} y={Math.max(...trialData.accelValues.map(ac => ac.unitData.y))} z={Math.max(...trialData.accelValues.map(ac => ac.unitData.z))} />
						<SparkLineComponent title="X axis" values={trialData.accelValues.map(ac => ac.unitData.x)} />
						<SparkLineComponent title="Y axis" values={trialData.accelValues.map(ac => ac.unitData.y)} />
						<SparkLineComponent title="Z axis" values={trialData.accelValues.map(ac => ac.unitData.z)} />
					</>
				}
				{isMeasuring && trialData && trialData.accelValues.length > 0 &&
					<>
						<RadarChartComponent
							x={trialData.accelValues.at(-1)?.unitData.x}
							y={trialData.accelValues.at(-1)?.unitData.y}
							z={trialData.accelValues.at(-1)?.unitData.z}
							x_max={Math.max(...trialData.accelValues.map(ac => ac.unitData.x))}
							y_max={Math.max(...trialData.accelValues.map(ac => ac.unitData.y))}
							z_max={Math.max(...trialData.accelValues.map(ac => ac.unitData.z))} />
						<p>{`X: ${trialData.accelValues.at(-1)?.unitData.x.toFixed(3)}`} </p>
						<p>{`Y: ${trialData.accelValues.at(-1)?.unitData.y.toFixed(3)}`} </p>
						<p>{`Z: ${trialData.accelValues.at(-1)?.unitData.z.toFixed(3)}`} </p>
					</>
				}


			</ThemeProvider>
		</>
	)
}

export default App
