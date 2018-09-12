import {compose} from 'redux';
import store from './store';
import action from './action-creators';

export const dispatchChangeAnomaly = compose(
	store.dispatch,
	action.changeAnomaly
);

export const dispatchChangeCalendarMonth = compose(
	store.dispatch,
	action.changeCalendarMonth
);

export const dispatchChangeDate = compose(
	store.dispatch,
	action.changeDate
);

export const dispatchChangeDepth = compose(
	store.dispatch,
	action.changeDepth
);

export const dispatchChangeDropdownCalendarMonth = compose(
	store.dispatch,
	action.changeDropdownCalendarMonth
);

export const dispatchChangeSource = compose(
	store.dispatch,
	action.changeSource
);

export const dispatchChangeVertexType = compose(
	store.dispatch,
	action.changeVertexType
);

export const dispatchChangeTimeInterval = compose(
	store.dispatch,
	action.changeTimeInterval
);

export const dispatchChangeView = compose(
	store.dispatch,
	action.changeView
);

export const dispatchCloseDocumentsBox = compose(
	store.dispatch,
	action.closeDocumentsBox
);

export const dispatchCloseErrorBar = compose(
	store.dispatch,
	action.closeErrorBar
);

export const dispatchOpenNodeDocuments = compose(
	store.dispatch,
	action.openNodeDocuments
);

export const dispatchOpenNodeSubIntervalDocuments = compose(
	store.dispatch,
	action.openNodeSubIntervalDocuments
);

export const dispatchRequestCalendarData = compose(
	store.dispatch,
	action.requestCalendarData
);

export const dispatchRequestContextData = compose(
	store.dispatch,
	action.requestContextData
);

export const dispatchSeeNodeInContext = compose(
	store.dispatch,
	action.seeNodeInContext
);

export const dispatchSelectDayOnCalendar = compose(
	store.dispatch,
	action.selectedDayOnCalendar
);

export const dispatchSelectNodeOnStreamgraph = compose(
	store.dispatch,
	action.selectedNodeOnStreamgraph
);

export const dispatchToggleSourceOnCalendar = compose(
	store.dispatch,
	action.toggleSourceOnCalendar
);

export const dispatchSelectSubInterval = compose(
	store.dispatch,
	action.selectedSubInterval
);

export const dispatchToggleAnomalyDropdown = compose(
	store.dispatch,
	action.toggleAnomalyDropdown
);

export const dispatchToggleSourceDropdown = compose(
	store.dispatch,
	action.toggleSourceDropdown
);

export const dispatchToggleDateDropdown = compose(
	store.dispatch,
	action.toggleDateDropdown
);

export const dispatchToggleTimeIntervalDropdown = compose(
	store.dispatch,
	action.toggleTimeIntervalDropdown
);
