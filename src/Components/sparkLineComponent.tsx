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
		<div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
			<div style={{fontSize: '8px'}}>{props.title}</div>
			<Box sx={{ flexGrow: 1 }}>
				<SparkLineChart
					plotType="line"
					data={props.values}
					height={100}
				/>
			</Box>
		</div>);
};

export default SparkLineComponent;