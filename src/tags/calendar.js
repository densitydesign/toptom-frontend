import {compose} from 'redux';
import {
	lineRadial as lineRadialFactory,
	curveCatmullRomClosed
} from 'd3-shape';
import {scaleLinear} from 'd3-scale';
import {
	CALENDAR_CELL_HEIGHT,
	CALENDAR_CELL_WIDTH
} from '../parameters';
import {
	aMonthBefore,
	aMonthAfter,
	calendarArray,
	formatMonthName,
	formatYear,
	formatYearMonth
} from '../date';
import {
	calendarMonthSelector,
	calendarDayAnomalySelector
} from '../state/selectors';
import {
	dispatchChangeCalendarMonth,
	dispatchSelectDayOnCalendar
} from '../state/dispatchers';

const goToPreviousMonth = opts => compose(
	dispatchChangeCalendarMonth,
	formatYearMonth,
	aMonthBefore,
	calendarMonthSelector,
	() => opts.store.getState()
);

const RADIUS = CALENDAR_CELL_HEIGHT / 2;

const goToNextMonth = opts => compose(
	dispatchChangeCalendarMonth,
	formatYearMonth,
	aMonthAfter,
	calendarMonthSelector,
	() => opts.store.getState()
);

const radiusScale = scaleLinear()
	.domain([0, 3])
	.range([RADIUS * 0.65, RADIUS * 0.8]);

const angleScale = scaleLinear()
	.domain([0, 23])
	.range([0, 2 * Math.PI]);

const lineRadial = lineRadialFactory()
	.curve(curveCatmullRomClosed)
	.angle((d, i) => angleScale(i))
	.radius(d => radiusScale(d));

const anomalyPath = source => state => date => {
	const dayData = calendarDayAnomalySelector(state)[date];
	return dayData ?
		lineRadial(dayData[source]) :
		[];
};

const twitterAnomalyPath = anomalyPath('twitter');
const gdeltAnomalyPath = anomalyPath('gdelt');
const redditAnomalyPath = anomalyPath('reddit');

const setVariables = opts => {
	const state = opts.store.getState();
	const date = calendarMonthSelector(state);
	this.days = calendarArray(date);
	this.monthAndYear = `${formatMonthName(date)} ${formatYear(date)}`;
	this.twitterAnomalyPath = twitterAnomalyPath(state);
	this.gdeltAnomalyPath = gdeltAnomalyPath(state);
	this.redditAnomalyPath = redditAnomalyPath(state);
};

export default function (opts) {
	this.goToPreviousMonth = goToPreviousMonth(opts);
	this.goToNextMonth = goToNextMonth(opts);
	this.centerWidth = CALENDAR_CELL_WIDTH / 2;
	this.centerHeight = CALENDAR_CELL_HEIGHT / 2;
	setVariables.call(this, opts);

	this.on('update', () => {
		setVariables.call(this, opts);
	});

	this.openDayInAgenda = e =>
		dispatchSelectDayOnCalendar(e.item.item.date);
}
