import {compose} from 'redux';
import {
	agendaDataSelector,
	selectedDayOnCalendarSelector
} from '../state/selectors';
import {dispatchSeeNodeInContext} from '../state/dispatchers';
import {formatCalendarDay} from '../date';

const suffix = number => {
	switch (number) {
		case '1':
			return '1st';
		case '2':
			return '2nd';
		case '3':
			return '3rd';
		default:
			return `${number}th`;
	}
};

const getDay = compose(
	suffix,
	formatCalendarDay,
	selectedDayOnCalendarSelector
);

const setVariables = opts => {
	const state = opts.store.getState();
	this.day = getDay(state);
	this.anomalies = agendaDataSelector(state);
	this.isActive = Boolean(selectedDayOnCalendarSelector(state));
};

export default function (opts) {
	setVariables.call(this, opts);

	this.on('update', () => {
		setVariables.call(this, opts);
	});

	this.goToNodeInContextView = e => {
		//date is now passed through API
		const {date, source, node, depth, anomaly_type, interval, granularity} = e.item.anomaly;

		dispatchSeeNodeInContext(date, source, node, depth, anomaly_type, interval, granularity);
	};
}
