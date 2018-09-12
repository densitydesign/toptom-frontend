import {sourceNames} from '../parameters';
import {
	isSourceDropdownOpenSelector,
	sourceSelector
} from '../state/selectors';
import {
	dispatchToggleSourceDropdown,
	dispatchChangeSource
} from '../state/dispatchers';

const setVariables = opts => {
	this.isSourceDropdownClosed = !isSourceDropdownOpenSelector(opts.store.getState());
	this.currentSource = sourceNames[sourceSelector(opts.store.getState())];
	this.isCurrentSource = source =>
		source === sourceSelector(opts.store.getState());
};

export default function (opts) {
	this.toggleSourceDropdown = () =>
		dispatchToggleSourceDropdown();
	this.selectSource = source => () =>
		dispatchChangeSource(source);
	this.sourceName = source => sourceNames[source];
	setVariables.call(this, opts);

	this.on('update', () => {
		setVariables.call(this, opts);
	});
}