import {
	clustersChartDataSelector,
	streamSlideDataSelector,
	selectedSubIntervalSelector,
	anomalySelector,
	nodeDocumentsSelector,
	nodeDocumentsSubIntervalSelector
} from '../state/selectors';
import {dispatchOpenNodeDocuments,
		dispatchOpenNodeSubIntervalDocuments
} from '../state/dispatchers';
import clustersChartFactory from '../charts/clusters';
import streamSlideFactory from '../charts/stream-slide';

const clustersChart = clustersChartFactory('.keyword-clusters-group');
const streamSlide = streamSlideFactory('.stream-slide');

const setVariables = opts => {
	this.isActive = Boolean(selectedSubIntervalSelector(opts.store.getState()));
};

const clickOnNodeHandler = state => d => {
	const nodeId = d.nodeId.slice(1);
	const documents = nodeDocumentsSubIntervalSelector(state)(nodeId);
	const subInterval = state.selectedSubInterval;
	dispatchOpenNodeSubIntervalDocuments(nodeId, documents, subInterval);
};

export default function (opts) {
	setVariables.call(this, opts);
	this.on('update', () => {
		setVariables.call(this, opts);
		const state = opts.store.getState();

		clustersChart
			.width(opts.width)
			.height(opts.height)
			.data(clustersChartDataSelector(state))
			.selectedAnomaly(anomalySelector(state))
			.clickOnNodeHandler(clickOnNodeHandler(state));
		clustersChart();

		streamSlide
			.width(opts.width)
			.height(opts.height)
			.data(streamSlideDataSelector(state))
			.selectedAnomaly(anomalySelector(state));
		streamSlide();
	});
}
