import actionTypes from './action-types';

export default {
	changeAnomaly: anomaly =>
		({
			type: actionTypes.CHANGE_ANOMALY,
			anomaly
		}),
	changeCalendarMonth: date =>
		({
			type: actionTypes.CHANGE_CALENDAR_MONTH,
			date
		}),
	changeDate: date =>
		({
			type: actionTypes.CHANGE_DATE,
			date
		}),
	changeDepth: depthIndex =>
		({
			type: actionTypes.CHANGE_DEPTH,
			depthIndex
		}),
	changeDropdownCalendarMonth: date =>
		({
			type: actionTypes.CHANGE_DROPDOWN_CALENDAR_MONTH,
			date
		}),
	changeSource: source =>
		({
			type: actionTypes.CHANGE_SOURCE,
			source
		}),
	changeVertexType: vertexType =>
		({
			type: actionTypes.CHANGE_VERTEX_TYPE,
			vertexType
		}),
	changeTimeInterval: interval =>
		({
			type: actionTypes.CHANGE_TIMEINTERVAL,
			interval
		}),
	changeView: viewName =>
		({
			type: actionTypes.CHANGE_VIEW,
			viewName
		}),
	closeDocumentsBox: () =>
		({
			type: actionTypes.CLOSE_DOCUMENTS_BOX
		}),
	closeErrorBar: () =>
		({
			type: actionTypes.CLOSE_ERROR_BAR
		}),
	openNodeDocuments: (nodeId, documents) =>
		({
			type: actionTypes.OPEN_NODE_DOCUMENTS,
			nodeId,
			documents
		}),
	openNodeSubIntervalDocuments: (nodeId, documents, subInterval) =>
		({
			type: actionTypes.OPEN_NODE_SUBINTERVAL_DOCUMENTS,
			nodeId,
			documents,
			subInterval
		}),
	requestCalendarData: (uri, querystringParams) =>
		({
			type: actionTypes.REQUEST_CALENDAR_DATA,
			uri,
			querystringParams
		}),
	requestCalendarDataSucceeded: data =>
		({
			type: actionTypes.REQUEST_CALENDAR_DATA_SUCCEEDED,
			data
		}),
	requestCalendarDataFailed: error =>
		({
			type: actionTypes.REQUEST_CALENDAR_DATA_FAILED,
			error
		}),
	requestContextData: (uri, querystringParams) =>
		({
			type: actionTypes.REQUEST_CONTEXT_DATA,
			uri,
			querystringParams
		}),
	requestContextDataSucceeded: data =>
		({
			type: actionTypes.REQUEST_CONTEXT_DATA_SUCCEEDED,
			data
		}),
	requestContextDataFailed: error =>
		({
			type: actionTypes.REQUEST_CONTEXT_DATA_FAILED,
			error
		}),
	requestContextDataFromCalendarSucceeded: (data, node, depthIndex, anomaly) =>
		({
			type: actionTypes.REQUEST_CONTEXT_DATA_FROM_CALENDAR_SUCCEEDED,
			data,
			node,
			depthIndex,
			anomaly
		}),
	requestContextDataFromCalendarFailed: error =>
		({
			type: actionTypes.REQUEST_CONTEXT_DATA_FROM_CALENDAR_FAILED,
			error
		}),
	seeNodeInContext: (date, source, node, depth, anomaly, interval, granularity) =>
		({
			type: actionTypes.SEE_NODE_IN_CONTEXT,
			date,
			source,
			node,
			depth,
			anomaly,
			interval,
			granularity
		}),
	selectedDayOnCalendar: date =>
		({
			type: actionTypes.SELECT_DAY_ON_CALENDAR,
			date
		}),
	selectedNodeOnStreamgraph: id =>
		({
			type: actionTypes.SELECT_NODE_ON_STREAMGRAPH,
			id
		}),
	toggleSourceOnCalendar: source =>
		({
			type: actionTypes.TOGGLE_SOURCE_ON_CALENDAR,
			source
		}),
	selectedSubInterval: intervalIndex =>
		({
			type: actionTypes.SELECT_SUB_INTERVAL,
			intervalIndex
		}),
	toggleAnomalyDropdown: () =>
		({
			type: actionTypes.TOGGLE_ANOMALY_DROPDOWN
		}),
	toggleSourceDropdown: () =>
		({
			type: actionTypes.TOGGLE_SOURCE_DROPDOWN
		}),
	toggleDateDropdown: () =>
		({
			type: actionTypes.TOGGLE_DATE_DROPDOWN
		}),
	toggleTimeIntervalDropdown: () =>
		({
			type: actionTypes.TOGGLE_TIMEINTERVAL_DROPDOWN
		})
};
