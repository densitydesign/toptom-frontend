import {errorMessageSelector} from '../state/selectors';
import {dispatchCloseErrorBar} from '../state/dispatchers';

const setVariables = opts => {
	const state = opts.store.getState();
	this.error = errorMessageSelector(state);
	this.isActive = Boolean(this.error);
};

export default function (opts) {
	setVariables.call(this, opts);

	this.on('update', () => {
		setVariables.call(this, opts);
	});

	this.closeErrorBar = dispatchCloseErrorBar;
}
