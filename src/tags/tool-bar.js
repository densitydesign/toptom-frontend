import {viewNames} from '../parameters';
import {isViewActive} from '../state/lib';

const setVariables = opts => {
	this.isActive =
		isViewActive(opts.store.getState(), viewNames.ANOMALOUS_CONTEXT);
};

export default function (opts) {
	setVariables.call(this, opts);

	this.on('update', () => {
		setVariables.call(this, opts);
	});
}
