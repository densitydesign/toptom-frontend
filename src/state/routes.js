import {viewNames} from '../parameters';
import {defaultMonth, defaultDate} from '../date';
import actions from './action-creators';
import {
	anomalySelector,
	calendarMonthSelector,
	dateSelector,
	depthIndexSelector,
	selectedNodeSelector,
	selectedSubIntervalSelector,
	sourceSelector,
	timeIntervalSelector,
	vertexTypeSelector,
	viewSelector
} from './selectors';

export default {
	v: {
		selector: viewSelector,
		action: actions.changeView,
		defaultValue: viewNames.CALENDAR
	},
	di: {
		selector: depthIndexSelector,
		action: actions.changeDepth,
		defaultValue: 10
	},
	ti: {
		selector: timeIntervalSelector,
		action: actions.changeTimeInterval,
		defaultValue: '1D'
	},
	sn: {
		selector: selectedNodeSelector,
		action: actions.selectedNodeOnStreamgraph,
		defaultValue: ''
	},
	si: {
		selector: selectedSubIntervalSelector,
		action: actions.selectedSubInterval,
		defaultValue: ''
	},
	an: {
		selector: anomalySelector,
		action: actions.changeAnomaly,
		defaultValue: ''
	},
	so: {
		selector: sourceSelector,
		action: actions.changeSource,
		defaultValue: 'twitter'
	},
	ty: {
		selector: vertexTypeSelector,
		action: actions.changeVertexType,
		defaultValue: 'keywords'
	},
	da: {
		selector: dateSelector,
		action: actions.changeDate,
		defaultValue: defaultDate()
	},
	cm: {
		selector: calendarMonthSelector,
		action:	actions.changeCalendarMonth
	}
};
