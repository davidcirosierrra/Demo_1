import React from 'react';
import { RadarChart } from '@mui/x-charts/RadarChart';

export type RadarChartProps = {
	x?: number;
	y?: number;
	z?: number;
	x_max?: number;
	y_max?: number;
	z_max?: number;

};

const RadarChartComponent: React.FC<RadarChartProps> = ({ ...props }) => {

	return (
		<div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
			<RadarChart
				height={300}
				series={[{ data: [props.x ?? 0, props.y ?? 0, props.z ?? 0] },
				{ data: [props.x_max ?? 0, props.y_max ?? 0, props.z_max ?? 0] },

				]}
				radar={{
					metrics: [
						{ name: 'X', max: 120 },
						{ name: 'Y', max: 120 },
						{ name: 'Z', max: 120 },

					],
				}}
			/>
		</div>);
};

export default RadarChartComponent;