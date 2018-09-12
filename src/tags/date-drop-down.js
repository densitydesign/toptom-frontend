import {
	formatHour,
	formatDay,
	formatMonth,
	formatYear
} from '../date';
import {
	isDateDropdownOpenSelector,
	dateSelector
} from '../state/selectors';
import {
	dispatchToggleDateDropdown
} from '../state/dispatchers';

const setVariables = opts => {
	const state = opts.store.getState();
	this.isDateDropdownClosed = !isDateDropdownOpenSelector(state);
	const date = dateSelector(state);
	this.hour = formatHour(date);
	this.day = formatDay(date);
	this.month = formatMonth(date);
	this.year = formatYear(date);
};

export default function (opts) {
	this.toggleDateDropdown = () =>
		dispatchToggleDateDropdown();
	setVariables.call(this, opts);

	this.on('update', () => {
		setVariables.call(this, opts);
	});
}
