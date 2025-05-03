import React, { useState } from 'react';
import '../css/YourTime.css';
import { testIds } from '../testData/testIds';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ClientSideRowModelModule } from 'ag-grid-community';

const DailyHabitsPage = () => {
	const [rowData, setRowData] = useState([
		{
			habit: 'Reading',
			monday: true,
			tuesday: true,
			wednesday: true,
			thursday: false,
			friday: true,
			saturday: false,
			sunday: true,
			goal: '21',
		},
		{
			habit: 'Running',
			monday: true,
			tuesday: true,
			wednesday: true,
			thursday: false,
			friday: true,
			saturday: false,
			sunday: true,
			goal: '23',
		},
		{
			habit: 'Guitar',
			monday: true,
			tuesday: true,
			wednesday: true,
			thursday: false,
			friday: true,
			saturday: false,
			sunday: true,
		},
	]);

	const handleCheckboxChange = (rowIndex, day) => {
		const newData = [...rowData];
		newData[rowIndex][day] = !newData[rowIndex][day];
		setRowData(newData);
	};

	//   const handleCellValueChange = (params) => {
	// 	const updatedData = [...rowData];
	// 	updatedData[params.node.rowIndex] = {
	// 	...updatedData[params.node.rowIndex],
	//   [params.colDef.field]: params.newValue
	// 	};
	// 	setRowData(updatedData);
	//   };

	const createCheckboxCol = (field) => ({
		field,
		cellRenderer: (params) => {
			return (
				<input
					type="checkbox"
					checked={params.value}
					onChange={() => handleCheckboxChange(params.node.rowIndex, field)}
				/>
			);
		},
	});

	const [colDefs] = useState([
		{ field: 'habit', editable: true },
		createCheckboxCol('monday'),
		createCheckboxCol('tuesday'),
		createCheckboxCol('wednesday'),
		createCheckboxCol('thursday'),
		createCheckboxCol('friday'),
		createCheckboxCol('saturday'),
		createCheckboxCol('sunday'),
		{ field: 'goal', editable: true },
		{ field: 'achieved' },
	]);

	return (
		<div data-testid={testIds.yourTime.yourTime}>
			<h1>Daily Habits</h1>
			<br />
			<div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
				<AgGridReact
					modules={[ClientSideRowModelModule]}
					rowData={rowData}
					columnDefs={colDefs}
					domLayout="autoHeight"
					// defaultColDef={{
					//     editable: true, // Enable editing for all columns by default
					//     sortable: true,
					//     filter: true,
					//   }}
					// onCellValueChanged={handleCellValueChange}
				/>
			</div>
		</div>
	);
};

export default DailyHabitsPage;
