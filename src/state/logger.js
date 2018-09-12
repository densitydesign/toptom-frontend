import {createLogger} from 'redux-logger';

export default createLogger({
	timestamp: false,
	collapsed: (getState, action, logEntry) => !logEntry.error
});
