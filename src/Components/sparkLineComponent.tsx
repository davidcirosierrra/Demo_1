import React from 'react';
import Box from '@mui/material/Box';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
export type SparkLineComponentProps = {
	title: string;
	values: number[];

};

const SparkLineComponent: React.FC<SparkLineComponentProps> = ({ ...props }) => {
	if (!props.values || props.values.length === 0) {
		return <div>No data available</div>;
	}

	return (
		<div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
			<div style={{ position: 'relative', width: '100%', fontSize: '0.875rem', color: '#555', alignSelf: 'flex-start', justifyContent: 'flex-start', textAlign: 'left', padding: '0.5rem' }}>
				{props.title}
				<Box sx={{ flexGrow: 1 }}>
					<SparkLineChart
						plotType="line"
						data={props.values}
						height={100}
					/>
				</Box>
			</div>
		</div>);
};

export default SparkLineComponent;