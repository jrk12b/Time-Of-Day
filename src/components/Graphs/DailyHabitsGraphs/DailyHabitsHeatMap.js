import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { Tooltip } from 'react-tooltip';

const DailyHabitsHeatMap = ({ rowData }) => {
	const allDays = {};

	// Loop through each habit's data to count daily completions
	rowData.forEach((habit) => {
		Object.keys(habit).forEach((key) => {
			if (/\d{4}-\d{2}-\d{2}/.test(key) && habit[key]) {
				allDays[key] = (allDays[key] || 0) + 1;
			}
		});
	});

	const values = Object.entries(allDays).map(([date, count]) => ({
		date,
		count,
	}));

	return (
		<>
			<CalendarHeatmap
				startDate={new Date(new Date().getFullYear(), 0, 1)}
				endDate={new Date()}
				values={values}
				classForValue={(value) => {
					if (!value) return 'color-empty';
					if (value.count >= 5) return 'color-github-4';
					if (value.count >= 3) return 'color-github-3';
					if (value.count >= 1) return 'color-github-2';
					return 'color-github-1';
				}}
				tooltipDataAttrs={(value) => ({
					'data-tip': `${value.date}: ${value.count || 0} completions`,
				})}
				showWeekdayLabels
			/>
			<Tooltip />
		</>
	);
};

export default DailyHabitsHeatMap;
