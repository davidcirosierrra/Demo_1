import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Gauge } from '@mui/x-charts/Gauge';
export type LinearComponentProps = {
	title: string;
	value: number;

};

const LinearComponent: React.FC<LinearComponentProps> = ({ ...props }) => {
	const [maxValue, setMaxValue] = useState<number>(10);

	useEffect(() => {
		// Update max value if current value is greater
		const currentAbsValue = Math.abs(props.value);
		if (currentAbsValue > maxValue) {
			setMaxValue(currentAbsValue);
		}
	}, [props.value, maxValue]);

	return (

		<div style={{ position: 'relative', fontSize: '0.875rem', color: '#555', alignSelf: 'flex-start', justifyContent: 'flex-start', textAlign: 'left', padding: '0.5rem' }}>

			<Box sx={{ flexGrow: 1 }}>
				<Gauge
					width={100}
					height={100}
					value={Math.abs(props.value)}
					valueMax={maxValue}
					startAngle={-90}
					endAngle={90}
					sx={{
						['& .MuiGauge-valueText']: {
							fontSize: 12,
							transform: 'translate(0px, 10px)',
						},
					}}
					text={({ valueMax }) => `${props.title} ${props.value.toFixed(2)} / ${valueMax?.toFixed(2)}`}
				/>
			</Box>
		</div>);
};

export default LinearComponent;