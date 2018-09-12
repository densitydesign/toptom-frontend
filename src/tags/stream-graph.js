import {anomalyColor} from '../parameters';
import streamgraphFactory from '../charts/streamgraph';
import {
	streamGraphDataSelector,
	selectedNodeSelector,
	anomalySelector,
	selectedNodeDocumentsSelector
} from '../state/selectors';
import {
	dispatchOpenNodeDocuments,
	dispatchSelectNodeOnStreamgraph
} from '../state/dispatchers';

const streamgraph = streamgraphFactory('.stack-group');

const clickOnNodeHandler = state => d => {
	const selectedNode = selectedNodeSelector(state);
	if (d.key === selectedNode) {
		const documents = selectedNodeDocumentsSelector(state);
		dispatchOpenNodeDocuments(selectedNode, documents);
	} else {
		dispatchSelectNodeOnStreamgraph(d.key);
	}
};

export default function (opts) {
	this.anomalyColor1 = anomalyColor[1];
	this.anomalyColor2 = anomalyColor[2];
	this.anomalyColor3 = anomalyColor[3];
	this.on('update', () => {
		const state = opts.store.getState();
		streamgraph
			.width(opts.width)
			.height(opts.height)
			.selectedNode(selectedNodeSelector(state))
			.selectedAnomaly(anomalySelector(state))
			.data(streamGraphDataSelector(state))
			.clickOnNodeHandler(clickOnNodeHandler(state));
		streamgraph();
	});
}
