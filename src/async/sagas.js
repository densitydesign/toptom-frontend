import nprogress from 'nprogress';
import {GENERIC_ERROR, granularityMap} from '../parameters';
import actionType from '../state/action-types';
import actionCreators from '../state/action-creators';
import store from '../state/store';
import {
	querystringParamsContextSelector,
	querystringParamsCalendarSelector
} from '../state/selectors';
import {
	formatDateMinutes, //FIXME fix date everywhere so that minutes are present
	formatDateH23Minutes
} from '../date';
import {
	contextConnector,
	calendarConnector
} from './connectors';
import get from './transport';
import {call, put, takeLatest} from 'redux-saga/effects';

const getError = err =>
	typeof(err) === 'string' ? err : GENERIC_ERROR;

const {
	requestContextDataSucceeded,
	requestContextDataFailed,
	requestCalendarDataSucceeded,
	requestCalendarDataFailed,
	requestContextDataFromCalendarSucceeded,
	requestContextDataFromCalendarFailed
} = actionCreators;

export function * requestContextDataHandler(action) {
	try {
		nprogress.start();
		const {uri, querystringParams} = action;
		const data = yield call(get, uri, querystringParams);
		if (data.error) {
			throw data.error;
		}
		yield put(requestContextDataSucceeded(contextConnector(data)));
		nprogress.done();
	} catch (err) {
		yield put(requestContextDataFailed(getError(err)));
		nprogress.done();
	}
}

function * watchRequestContextData() {
	yield takeLatest(actionType.REQUEST_CONTEXT_DATA, requestContextDataHandler);
}

export function * changeTimeIntervalOrDateOrSourceHandler(action) {
	try {
		nprogress.start();
		//si chiede in base allo stato attuale i parametri per la chiamata
		const params = querystringParamsContextSelector(store.getState());
		// chiedo la versione nuova interval
		const interval = action.interval || params.interval;
		// chiedo versione nuova della source
		const source = action.source || params.source;
		const granularity = granularityMap[interval];
		const date = interval == "24h" ? formatDateMinutes(action.date || params.date) : formatDateH23Minutes(action.date || params.date);

		const uri = 'streamgraph.json';
		const data = yield call(get, uri, Object.assign(params, {interval, granularity, date, source}));
		if (data.error) {
			throw data.error;
		}
		yield put(requestContextDataSucceeded(contextConnector(data)));
		nprogress.done();
	} catch (err) {
		yield put(requestContextDataFailed(getError(err)));
		nprogress.done();
	}
}

function * watchChangeTimeIntervalOrDateOrSource() {
	yield takeLatest(
		[actionType.CHANGE_TIMEINTERVAL, actionType.CHANGE_DATE, actionType.CHANGE_SOURCE],
		changeTimeIntervalOrDateOrSourceHandler
	);
}

export function * changeCalendarMonthHandler(action) {
	try {
		nprogress.start();
		const uri = 'calendar.json';
		const params = querystringParamsCalendarSelector(store.getState());
		const date = action.date || params.date || store.getState().dropdownCalendarMonth
		const data = yield call(get, uri, Object.assign(params, {date}));
		if (data.error) {
			throw data.error;
		}
		yield put(requestCalendarDataSucceeded(calendarConnector(data)));
		nprogress.done();
	} catch (err) {
		yield put(requestCalendarDataFailed(getError(err)));
		nprogress.done();
	}
}

function * watchChangeCalendarMonth() {
	yield takeLatest(
		[actionType.CHANGE_CALENDAR_MONTH,actionType.CHANGE_VERTEX_TYPE],
		changeCalendarMonthHandler);
}

export function * seeNodeInContextHandler(action) {
	try {
		nprogress.start();
		const {source, node, depth, anomaly, granularity, interval} = action;
		const date = formatDateH23Minutes(action.date);
		const uri = 'streamgraph.json';
		const params = querystringParamsContextSelector(store.getState());
		const data = yield call(get, uri, Object.assign(params, {date, source, interval, granularity}));
		if (data.error) {
			throw data.error;
		}
		const body = contextConnector(data);
		const depthIndex =
			body
				.dendrogram
				.findIndex(el => el.depth === depth); // Risky, FIXME on data model. Return level not depth value.
		yield put(requestContextDataFromCalendarSucceeded(body, `${node}`, depthIndex, anomaly));
		nprogress.done();
	} catch (err) {
		yield put(requestContextDataFromCalendarFailed(getError(err)));
		nprogress.done();
	}
}

function * watchSeeNodeInContext() {
	yield takeLatest(
		actionType.SEE_NODE_IN_CONTEXT,
		seeNodeInContextHandler);
}

export default [
	watchRequestContextData,
	watchChangeTimeIntervalOrDateOrSource,
	watchChangeCalendarMonth,
	watchSeeNodeInContext
];
