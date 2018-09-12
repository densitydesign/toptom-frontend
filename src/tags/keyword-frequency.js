import frequencyChartFactory from '../charts/frequency';
import {
	frequencyChartDataSelector,
	selectedNodeSelector,
	anomalySelector,
	nodeDocumentsSubIntervalSelector
} from '../state/selectors';
import {dispatchOpenNodeSubIntervalDocuments
} from '../state/dispatchers';

const frequencyChart = frequencyChartFactory('g.keyword-frequency-group');
let currentState = {};

const clickOnNodeHandler = state => (d,id) => {
	//override state. Dirty but working
	state = currentState;
	const nodeId = state.selectedNode;
	const customInterval = id;
	const documents = nodeDocumentsSubIntervalSelector(state)(nodeId,customInterval);
	
	dispatchOpenNodeSubIntervalDocuments(nodeId, documents, customInterval);
};

export default function (opts) {
	this.on('update', () => {
		const state = opts.store.getState();
		currentState = state;
		frequencyChart
			.width(opts.width)
			.height(opts.height)
			.selectedNode(selectedNodeSelector(state))
			.selectedAnomaly(anomalySelector(state))
			.data(frequencyChartDataSelector(state))
			.clickOnNodeHandler(clickOnNodeHandler(state));
		frequencyChart();
	});
}
