import {timeIntervalNames} from '../parameters';
import {
	isTimeIntervalDropdownOpenSelector,
	timeIntervalSelector
} from '../state/selectors';
import {
	dispatchToggleTimeIntervalDropdown,
	dispatchChangeTimeInterval
} from '../state/dispatchers';

const setVariables = opts => {
	this.isTimeIntervalDropdownClosed = !isTimeIntervalDropdownOpenSelector(opts.store.getState());
	this.currentTimeInterval = timeIntervalNames[timeIntervalSelector(opts.store.getState())];
	this.isCurrentTimeInterval = interval =>
		interval === timeIntervalSelector(opts.store.getState());
};

export default function (opts) {
	this.toggleTimeIntervalDropdown = () =>
		dispatchToggleTimeIntervalDropdown();
	this.selectTimeInterval = interval => () =>
		dispatchChangeTimeInterval(interval);
	this.timeIntervalName = interval => timeIntervalNames[interval];
	setVariables.call(this, opts);

	this.on('update', () => {
		setVariables.call(this, opts);
	});
}
