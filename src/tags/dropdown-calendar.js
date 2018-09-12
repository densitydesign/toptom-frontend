import {compose} from 'redux';
import {
	formatMonthName,
	formatDate,
	aMonthBefore,
	aMonthAfter,
	calendarArray,
	addAnHour,
	subtractAnHour,
	formatHour,
	formatYearMonth
} from '../date';
import {
	dropdownCalendarMonthSelector,
	dateSelector,
	timeIntervalSelector
} from '../state/selectors';
import {
	dispatchChangeDropdownCalendarMonth,
	dispatchChangeDate
} from '../state/dispatchers';

const goToPreviousMonth = opts => compose(
	dispatchChangeDropdownCalendarMonth,
	formatYearMonth,
	aMonthBefore,
	dropdownCalendarMonthSelector,
	() => opts.store.getState()
);

const goToNextMonth = opts => compose(
	dispatchChangeDropdownCalendarMonth,
	formatYearMonth,
	aMonthAfter,
	dropdownCalendarMonthSelector,
	() => opts.store.getState()
);

const addHour = opts => compose(
	dispatchChangeDate,
	formatDate,
	addAnHour,
	dateSelector,
	() => opts.store.getState()
);

const subtractHour = opts => compose(
	dispatchChangeDate,
	formatDate,
	subtractAnHour,
	dateSelector,
	() => opts.store.getState()
);

const setVariables = opts => {
	const date = opts.store.getState().date;
	this.days = calendarArray(date);
	this.month = formatMonthName(date);
	this.hours = formatHour(dateSelector(opts.store.getState()));
	this.inactive = timeIntervalSelector(opts.store.getState()) !== '24h';
};

export default function (opts) {
	this.changeDate = e => dispatchChangeDate(e.item.item.date);
	this.goToPreviousMonth = goToPreviousMonth(opts);
	this.goToNextMonth = goToNextMonth(opts);
	this.addHour = addHour(opts);
	this.subtractHour = subtractHour(opts);
	setVariables.call(this, opts);

	this.on('update', () => {
		setVariables.call(this, opts);
	});
}
