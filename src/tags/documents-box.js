import {listedDocumentsSelector} from '../state/selectors';
import {dispatchCloseDocumentsBox} from '../state/dispatchers';
import {prettyFormatDayHour} from '../date';

const setVariables = opts => {
	const state = opts.store.getState();
	const {documents, nodeId, subInterval} = listedDocumentsSelector(state);
	this.documents = documents;
	this.nodeId = nodeId;
	this.subInterval = subInterval;
	this.isActive = Boolean(this.documents);
	this.isSubIntervalSelected = Boolean(this.subInterval);
	this.subIntervalBegin = "";
	this.subIntervalEnd = "";

	if (this.subInterval && state.timeIntervals.length > 0){
		this.subIntervalBegin = prettyFormatDayHour(state.timeIntervals[this.subInterval][0]);
		this.subIntervalEnd = prettyFormatDayHour(state.timeIntervals[this.subInterval][1]);
	}
};

export default function (opts) {
	setVariables.call(this, opts);

	this.on('update', () => {
		setVariables.call(this, opts);
	});

	this.closeDocumentsBox = dispatchCloseDocumentsBox;
}
