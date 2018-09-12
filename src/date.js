import moment from 'moment';
import {
	range,
	modulo
} from './utils';

const mod24 = modulo(0, 24);

export const today = () =>
	moment();

export const resetHours = date =>
	moment(date).hour(0);

export const setHours = (date, n) =>
	moment(date).hour(mod24(n));

export const getHour = date => date.hour();

const addHours = n => date => {
	const currentHour = moment(date).hour();
	return setHours(date, currentHour + n);
};

export const addAnHour = addHours(1);
export const subtractAnHour = addHours(-1);

export const resetDay = date =>
	moment(date).date(1);

export const formatDate = date =>
	moment(date).isValid() ?
		moment(date).format('YYYY-MM-DDTHH') :
		'';

export const formatDateMinutes = date =>
	moment(date).isValid() ?
		moment(date).format('YYYY-MM-DDTHH:mm') :
		'';

export const formatDateH23Minutes = date =>
	moment(date).isValid() ?
		moment(date).hour(23).format('YYYY-MM-DDTHH:mm') :
		'';

export const formatYearMonth = date =>
	moment(date).isValid() ?
		moment(date).format('YYYY-MM') :
		'';

// add formats for display within the text
export const prettyFormatDayHour = date =>
	moment(date).isValid() ?
		moment(date).format('MMMM Do YYYY H:mm') :
		'';

// FIXME in order to use 'today' as default date
// routers should always show parameters, otherwise
// a same url opened in different days shows different data

// export const defaultDate = compose(
// 	formatDate,
// 	resetHours,
// 	today
// );

// export const defaultMonth = compose(
// 	formatDate,
// 	resetDay,
// 	resetHours,
// 	today
// );

export const defaultDate = () => formatDateH23Minutes('2017-04-23T00');
export const defaultMonth = () => '2017-04';

export const formatMonthName = date =>
	moment(date).isValid() ?
		moment(date).format('MMMM') :
		'';

export const formatHour = date =>
	moment(date).isValid() ?
		moment(date).format('HH') :
		'';

export const formatHourLabel = date =>
	moment(date).isValid() ?
		moment(date).format('H') :
		'';

export const formatDayMonthLabel = date =>
	moment(date).isValid() ?
		moment(date).format('D/M') :
		'';

export const formatFullHour = date =>
	moment(date).isValid() ?
		moment(date).format('HH:mm') :
		'';

export const formatDay = date =>
	moment(date).isValid() ?
		moment(date).format('DD') :
		'';

export const formatCalendarDay = date =>
	moment(date).isValid() ?
		moment(date).format('D') :
		'';

export const formatMonth = date =>
	moment(date).isValid() ?
		moment(date).format('MM') :
		'';

export const formatYear = date =>
	moment(date).isValid() ?
		moment(date).format('YYYY') :
		'';

export const aMonthBefore = date =>
	moment(date).subtract(1, 'month');

export const aMonthAfter = date =>
	moment(date).add(1, 'month');

export const dayOfWeek = date =>
	moment(date).day();

export const dateFromDayOfCurrentMonth = (date, n) =>
	moment(date).date(n).format('YYYY-MM-DDTHH');

export const datesOfCurrentMonth = date => {
	if (!date) {
		return [];
	}
	const numberOfDays = moment(date).daysInMonth();
	return range(numberOfDays)
		.map(i => dateFromDayOfCurrentMonth(date, i + 1));
};

export const calendarArray = date => {
	const dates = datesOfCurrentMonth(date);
	const dayOfWeekOfFirstDay = dayOfWeek(dates[0]);
	return range(dayOfWeekOfFirstDay)
		.map(() => '')
		.concat(dates)
		.map(el => ({
			date: el ? formatDate(el) : '',
			day: el ? formatDay(el) : ''
		}));
};
