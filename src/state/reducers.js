import {viewNames} from '../parameters';
import {defaultMonth, defaultDate} from '../date';
import actionTypes from './action-types';

export const anomaly = (state = '', action) => {
	switch (action.type) {
		case actionTypes.CHANGE_ANOMALY:
			return action.anomaly;
		case actionTypes.CHANGE_VIEW:
			return '';
		case actionTypes.REQUEST_CONTEXT_DATA_FROM_CALENDAR_SUCCEEDED:
			return action.anomaly;
		default:
			return state;
	}
};

export const calendarData = (state = [], action) => {
	switch (action.type) {
		case actionTypes.REQUEST_CALENDAR_DATA_SUCCEEDED:
			return action.data.body;
		default:
			return state;
	}
};

export const calendarMonth = (state = '', action) => {
	switch (action.type) {
		case actionTypes.REQUEST_CALENDAR_DATA_SUCCEEDED:
			return action.data.month;
		default:
			return state;
	}
};

export const date = (state = defaultDate(), action) => {
	switch (action.type) {
		case actionTypes.CHANGE_DATE:
			return action.date
		case actionTypes.REQUEST_CONTEXT_DATA_FROM_CALENDAR_SUCCEEDED:
		case actionTypes.REQUEST_CONTEXT_DATA_SUCCEEDED:
			return action.data.date;
		default:
			return state;
	}
};

export const dendrogram = (state = [], action) => {
	switch (action.type) {
		case actionTypes.REQUEST_CONTEXT_DATA_FROM_CALENDAR_SUCCEEDED:
		case actionTypes.REQUEST_CONTEXT_DATA_SUCCEEDED:
			return action.data.dendrogram;
		default:
			return state;
	}
};

export const documents = (state = {}, action) => {
	switch (action.type) {
		case actionTypes.REQUEST_CONTEXT_DATA_FROM_CALENDAR_SUCCEEDED:
		case actionTypes.REQUEST_CONTEXT_DATA_SUCCEEDED:
			return action.data.documents;
		default:
			return state;
	}
};

export const listedDocuments = (state = {}, action) => {
	switch (action.type) {
		case actionTypes.OPEN_NODE_DOCUMENTS:
		case actionTypes.OPEN_NODE_SUBINTERVAL_DOCUMENTS:
			const {documents, nodeId, subInterval} = action;
			return {
				documents,
				nodeId,
				subInterval
			};
		case actionTypes.CLOSE_DOCUMENTS_BOX:
			return {};
		default:
			return state;
	}
};

export const dropdownCalendarMonth = (state = defaultMonth(), action) => {
	switch (action.type) {
		case actionTypes.CHANGE_DROPDOWN_CALENDAR_MONTH:
			return action.date;
		default:
			return state;
	}
};

export const errorMessage = (state = '', action) => {
	switch (action.type) {
		case actionTypes.REQUEST_CALENDAR_DATA_FAILED:
		case actionTypes.REQUEST_CONTEXT_DATA_FAILED:
		case actionTypes.REQUEST_CONTEXT_DATA_FROM_CALENDAR_FAILED:
			return action.error;
		case actionTypes.CLOSE_ERROR_BAR:
			return '';
		default:
			return state;
	}
};

export const isAnomalyDropdownOpen = (state = false, action) => {
	switch (action.type) {
		case actionTypes.TOGGLE_ANOMALY_DROPDOWN:
			return !state;
		case actionTypes.CHANGE_ANOMALY:
			return false;
		default:
			return state;
	}
};

export const isSourceDropdownOpen = (state = false, action) => {
	switch (action.type) {
		case actionTypes.TOGGLE_SOURCE_DROPDOWN:
			return !state;
		case actionTypes.CHANGE_SOURCE:
			return false;
		default:
			return state;
	}
};

export const isDateDropdownOpen = (state = false, action) => {
	switch (action.type) {
		case actionTypes.TOGGLE_DATE_DROPDOWN:
			return !state;
		default:
			return state;
	}
};

export const isTimeIntervalDropdownOpen = (state = false, action) => {
	switch (action.type) {
		case actionTypes.TOGGLE_TIMEINTERVAL_DROPDOWN:
			return !state;
		case actionTypes.CHANGE_TIMEINTERVAL:
			return false;
		default:
			return state;
	}
};

export const depthIndex = (state = 10, action) => {
	switch (action.type) {
		case actionTypes.REQUEST_CONTEXT_DATA_FROM_CALENDAR_SUCCEEDED:
			return action.depthIndex;
		case actionTypes.CHANGE_DEPTH:
			return action.depthIndex;
		default:
			return state;
	}
};

export const selectedDayOnCalendar = (state = '', action) => {
	switch (action.type) {
		case actionTypes.SELECT_DAY_ON_CALENDAR:
			return action.date;
		case actionTypes.REQUEST_CALENDAR_DATA_SUCCEEDED:
			return '';
		default:
			return state;
	}
};

export const selectedNode = (state = '', action) => {
	switch (action.type) {
		case actionTypes.SELECT_NODE_ON_STREAMGRAPH:
			return action.id;
		case actionTypes.REQUEST_CONTEXT_DATA_SUCCEEDED:
		case actionTypes.CHANGE_DEPTH:
		case actionTypes.CHANGE_VIEW:
		case actionTypes.SELECT_SUB_INTERVAL:
			return '';
		case actionTypes.REQUEST_CONTEXT_DATA_FROM_CALENDAR_SUCCEEDED:
			return action.node;
		default:
			return state;
	}
};

export const selectedSourcesOnCalendar = (state = {twitter: true, gdelt: true, reddit: true}, action) => {
	switch (action.type) {
		case actionTypes.TOGGLE_SOURCE_ON_CALENDAR:
			return Object.assign({}, state, {[action.source]: !state[action.source]});
		default:
			return state;
	}
};

export const selectedSubInterval = (state = '', action) => {
	switch (action.type) {
		case actionTypes.SELECT_SUB_INTERVAL:
			return action.intervalIndex;
		case actionTypes.CHANGE_VIEW:
		case actionTypes.CHANGE_TIMEINTERVAL:
			return '';
		default:
			return state;
	}
};

export const nodes = (state = {}, action) => {
	switch (action.type) {
		case actionTypes.REQUEST_CONTEXT_DATA_FROM_CALENDAR_SUCCEEDED:
		case actionTypes.REQUEST_CONTEXT_DATA_SUCCEEDED:
			return action.data.nodes;
		default:
			return state;
	}
};

export const nodesDistanceMatrix = (state = [], action) => {
	switch (action.type) {
		case actionTypes.REQUEST_CONTEXT_DATA_FROM_CALENDAR_SUCCEEDED:
		case actionTypes.REQUEST_CONTEXT_DATA_SUCCEEDED:
			return action.data.nodesDistanceMatrix;
		default:
			return state;
	}
};

export const source = (state = 'twitter', action) => {
	switch (action.type) {
		case actionTypes.CHANGE_SOURCE:
			return action.source;
		case actionTypes.REQUEST_CONTEXT_DATA_FROM_CALENDAR_SUCCEEDED:
		case actionTypes.REQUEST_CONTEXT_DATA_SUCCEEDED:
			return action.data.source;
		default:
			return state;
	}
};

export const vertexType = (state = 'keywords', action) => {
	switch (action.type) {
		case actionTypes.REQUEST_CONTEXT_DATA_FROM_CALENDAR_SUCCEEDED:
		case actionTypes.REQUEST_CALENDAR_DATA_SUCCEEDED:
		case actionTypes.REQUEST_CONTEXT_DATA_SUCCEEDED:
			return action.data.type;
		case actionTypes.CHANGE_VERTEX_TYPE:
			return action.vertexType;
		default:
			return state;
	}
};

export const timeInterval = (state = '1D', action) => {
	switch (action.type) {
		case actionTypes.CHANGE_TIMEINTERVAL:
			return action.interval;
		case actionTypes.REQUEST_CONTEXT_DATA_FROM_CALENDAR_SUCCEEDED:
		case actionTypes.REQUEST_CONTEXT_DATA_SUCCEEDED:
			return action.data.interval;
		default:
			return state;
	}
};

export const timeIntervals = (state = [], action) => {
	switch (action.type) {
		case actionTypes.REQUEST_CONTEXT_DATA_FROM_CALENDAR_SUCCEEDED:
		case actionTypes.REQUEST_CONTEXT_DATA_SUCCEEDED:
			return action.data.timeIntervals;
		default:
			return state;
	}
};

export const view = (state = viewNames.CALENDAR, action) => {
	switch (action.type) {
		case actionTypes.CHANGE_VIEW:
			return action.viewName;
		case actionTypes.REQUEST_CONTEXT_DATA_FROM_CALENDAR_SUCCEEDED:
			return viewNames.ANOMALOUS_CONTEXT;
		default:
			return state;
	}
};
