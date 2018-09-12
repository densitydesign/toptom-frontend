import reduxQuerySync from 'redux-query-sync';
import {update} from 'riot';
import {applyMiddleware, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import sagas from '../async/sagas';
import rootReducer from './root-reducer';
import logger from './logger';
import routes from './routes';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
	rootReducer,
	applyMiddleware(sagaMiddleware, logger)
);

sagas.map(saga => sagaMiddleware.run(saga));

reduxQuerySync({
	store,
	params: routes,
	initialTruth: 'location',
	replaceState: false
});

store.subscribe(update);

export default store;
