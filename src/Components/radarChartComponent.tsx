import React from 'react';
import { RadarChart } from '@mui/x-charts/RadarChart';

export type RadarChartProps = {
	x?: number;
	y?: number;
	z?: number;
	x_max?: number;
	y_max?: number;
	z_max?: number;
	alpha?: number;
	beta?: number;
	gamma?: number;
	alpha_max?: number;
	beta_max?: number;
	gamma_max?: number;


};

const RadarChartComponent: React.FC<RadarChartProps> = ({ ...props }) => {

	return (
		<div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
			<RadarChart
				height={300}
				series={[{ label:'Current',  data: [props.x ?? 0, props.y ?? 0, props.z ?? 0, props.alpha ?? 0, props.beta ?? 0, props.gamma ?? 0] },
				{ label:'Max', data: [props.x_max ?? 0, props.y_max ?? 0, props.z_max ?? 0, props.alpha_max ?? 0, props.beta_max ?? 0, props.gamma_max ?? 0] },

				]}
				radar={{
					metrics: [
						{ name: 'X' },
						{ name: 'Y' },
						{ name: 'Z' },
						{ name: 'Alpha' },
						{ name: 'Beta' },
						{ name: 'Gamma' },

					],
				}}
			/>
		</div>);
};

export default RadarChartComponent;