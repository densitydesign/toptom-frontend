import {formatDate} from '../date';

export const calendarConnector = data => ({
	type: data.meta.type,
	month: data.meta.date,
	body: data.dates.map(el => Object.assign(el, {date: `${el.date}T00`})) //FIXME on returned data
});

export const contextConnector = data => ({
	date: formatDate(data.meta.date),
	source: data.meta.source,
	type: data.meta.type,
	interval: data.meta.interval,
	timeIntervals: data.intervals,
	documents: data.documents,
	dendrogram: data.dendrogram,
		// FIXME in case data.dendrogram = {...}
		// .sort((a, b) => Number(a.cut) - Number(b.cut))
		// .map(([k, v]) => Object.assign({}, v, {depth: Number(k)})),
	nodesDistanceMatrix: data.topic_distances,
	nodes: Object.entries(data.nodes).reduce((p, c) => {
		const id = c[0];
		const node = c[1];
		p[id] = {
			id,
			anomalies: node.anomalies,
			childrens: node.children,
			keywords: node.keywords,
			streamVector: node.stream_vector,
			keywordsOnInterval: node.temporal_keywords,
			documentsOnInterval: node.temporal_documents,
			documents: node.topic_documents.sort((a, b) => b[1] - a[1])
		};
		return p;
	}, {})
});

