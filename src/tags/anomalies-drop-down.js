import {anomalyNames} from '../parameters';
import {
	isAnomalyDropdownOpenSelector,
	anomalySelector
} from '../state/selectors';
import {
	dispatchToggleAnomalyDropdown,
	dispatchChangeAnomaly
} from '../state/dispatchers';

const setVariables = opts => {
	this.isAnomalyDropdownClosed = !isAnomalyDropdownOpenSelector(opts.store.getState());
	this.currentAnomaly = anomalyNames[anomalySelector(opts.store.getState())];
	this.isCurrentAnomaly = anomaly =>
		anomaly === anomalySelector(opts.store.getState());
};

export default function (opts) {
	this.toggleAnomalyDropdown = () =>
		dispatchToggleAnomalyDropdown();
	this.selectAnomaly = anomaly => () =>
		dispatchChangeAnomaly(anomaly);
	this.anomalyName = anomaly => anomalyNames[anomaly];
	setVariables.call(this, opts);

	this.on('update', () => {
		setVariables.call(this, opts);
	});
}
