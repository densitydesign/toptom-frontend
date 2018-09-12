import {viewNames} from '../parameters';
import {breadcrumbsSelector} from '../state/selectors';
import {dispatchChangeView} from '../state/dispatchers';

const setVariables = opts => {
	this.breadcrumbItems = breadcrumbsSelector(opts.store.getState());
};

const label = item => item.replace('_', ' ');

export default function (opts) {
	this.label = label;
	this.changeView = e => {
		const key = e.item.item;
		switch (key) {
			case viewNames.CALENDAR:
			case viewNames.ANOMALOUS_CONTEXT:
				dispatchChangeView(key);
				break;
			default:
				break;
		}
	};
	setVariables.call(this, opts);

	this.on('update', () => {
		setVariables.call(this, opts);
	});
}
