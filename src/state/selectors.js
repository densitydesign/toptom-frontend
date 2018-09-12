import {createSelector} from 'reselect';
import {max} from 'd3-array';
import {
	viewNames,
	CLUSTERS_VOLUME_CUTOFF,
	granularityMap,
	DATABASE_NAME
} from '../parameters';
import {
	pick,
	anomaliesData
} from '../utils';
import {
	formatHourLabel,
	formatDayMonthLabel,
	formatFullHour
} from '../date';

export const anomalySelector = state =>
	state.anomaly;

export const calendarDataSelector = state =>
	state.calendarData;

export const calendarMonthSelector = state =>
	state.calendarMonth;

export const dateSelector = state =>
	state.date;

export const dendrogramSelector = state =>
	state.dendrogram;

export const dropdownCalendarMonthSelector = state =>
	state.dropdownCalendarMonth;

export const numberOfLevelsSelector = createSelector(
	dendrogramSelector,
	dendrogram => dendrogram.length
);

export const depthIndexSelector = state =>
	state.depthIndex;

export const errorMessageSelector = state =>
	state.errorMessage;

export const isAnomalyDropdownOpenSelector = state =>
	state.isAnomalyDropdownOpen;

export const isSourceDropdownOpenSelector = state =>
	state.isSourceDropdownOpen;

export const isDateDropdownOpenSelector = state =>
	state.isDateDropdownOpen;

export const isTimeIntervalDropdownOpenSelector = state =>
	state.isTimeIntervalDropdownOpen;

export const listedDocumentsSelector = state =>
	state.listedDocuments;

export const selectedNodeSelector = state =>
	state.selectedNode;

export const selectedSubIntervalSelector = state =>
	state.selectedSubInterval;

export const sourceSelector = state =>
	state.source;

export const vertexTypeSelector = state =>
	state.vertexType;

export const nodesSelector = state =>
	state.nodes;

export const selectedDayOnCalendarSelector = state =>
	state.selectedDayOnCalendar;

export const selectedNodeObjSelector = createSelector(
	selectedNodeSelector,
	nodesSelector,
	(selectedNode, nodes) => selectedNode ?
		nodes[selectedNode] :
		undefined
);

export const selectedNodeKeywordSelector = createSelector(
	selectedNodeObjSelector,
	selectedNodeObj => selectedNodeObj ?
		selectedNodeObj.keywords[0][0] :
		''
);

export const selectedSourcesOnCalendarSelector = state =>
	state.selectedSourcesOnCalendar;

export const nodesDistanceMatrixSelector = state =>
	state.nodesDistanceMatrix;

export const timeIntervalSelector = state =>
	state.timeInterval;

export const timeIntervalsSelector = state =>
	state.timeIntervals;

export const viewSelector = state =>
	state.view;

export const nodeIdsAtDepthSelector = createSelector(
	dendrogramSelector,
	depthIndexSelector,
	(dendrogram, depthIndex) => {
		try {
			return dendrogram[depthIndex].nodes;
		} catch (err) {
			return [];
		}
	}
);

export const numberOfNodesSelector = createSelector(
	nodesSelector,
	nodes => Object.keys(nodes).length
);

export const nodesAtDepthSelector = createSelector(
	nodesSelector,
	nodeIdsAtDepthSelector,
	(nodes, nodeIds) => pick(nodeIds, nodes)
);

export const streamGraphDataSelector = createSelector(
	timeIntervalsSelector,
	nodesAtDepthSelector,
	anomalySelector,
	selectedSubIntervalSelector,
	(timeIntervals, nodesAtDepth, anomaly, selectedSubInterval) =>
		selectedSubInterval ?
			[] :
			timeIntervals
				.map((interval, i) =>
					Object.entries(nodesAtDepth)
						.reduce((p, c) => {
							const id = c[0];
							const node = c[1];
							const value = node.streamVector[i];
							const keyword = node.keywordsOnInterval[i][0] ?
								node.keywordsOnInterval[i][0][0] :
								'';
							const anomalyValue = anomaly ?
								(node.anomalies[anomaly][i] || 0) :
								0;
							p[id] = {value, keyword, anomalyValue};
							return p;
						}, {})
				)
);

export const anomaliesOnTimelineSelector = createSelector(
	timeIntervalsSelector,
	nodesAtDepthSelector,
	anomalySelector,
	(timeIntervals, nodesAtDepth, anomaly) =>
		timeIntervals
			.map((interval, i) =>
				Object.entries(nodesAtDepth)
					.reduce((p, c) => {
						const id = c[0];
						const node = c[1];
						const value = node.streamVector[i];
						const keyword = node.keywordsOnInterval[i][0] ?
							node.keywordsOnInterval[i][0][0] :
							'';
						const anomalyValue = anomaly ?
							(node.anomalies[anomaly][i] || 0) :
							0;
						p[id] = {value, keyword, anomalyValue};
						return p;
					}, {})
			)
);

export const sliderDataSelector = createSelector(
	dendrogramSelector,
	anomalySelector,
	(dendrogram, anomaly) => {
		try {
			return anomaly ?
				dendrogram.map(el => el.anomalies[anomaly]) :
				dendrogram.map(el => max(Object.values(el.anomalies)));
		} catch (err) {
			return [];
		}
	}
);

export const frequencyChartDataSelector = createSelector(
	selectedNodeObjSelector,
	anomalySelector,
	selectedSubIntervalSelector,
	(selectedNodeObj, anomaly, selectedSubInterval) =>
		(selectedNodeObj && !selectedSubInterval) ?
		{
			keywordsOnInterval: selectedNodeObj
				.keywordsOnInterval
				.map((el, i) =>
					el
						.map(([k, v]) => [k, v, i])
						.slice(0, 4)
				),
			anomalies: selectedNodeObj.anomalies[anomaly]
		} :
		{
			keywordsOnInterval: [],
			anomalies: {}
		}
);

export const timeLineLabelsSelector = createSelector(
	timeIntervalSelector,
	timeIntervalsSelector,
	(timeInterval, timeIntervals) => {
		let labels;
		const currentTopLabels = [];
		switch (timeInterval) {
			case '24h':
			case '1D':
				labels = timeIntervals
					.reduce((p, c) => {
						p.push({
							bottom: formatHourLabel(c[0]),
							top: ''
						});
						return p;
					}, []);
				break;
			case '2D':
			case '4D':
			case '1W':
			case '2W':
			case '3W':
				labels = timeIntervals
					.reduce((p, c, i) => {
						const topLabel = formatDayMonthLabel(c[0]);
						p.push({
							bottom: formatHourLabel(c[0]),
							top: topLabel === currentTopLabels[i - 1] ? '' : topLabel
						});
						currentTopLabels.push(topLabel);
						return p;
					}, []);
				break;
			case '4W':
			case '1M':
			case '2M':
				labels = timeIntervals
					.reduce((p, c) => {
						p.push({
							bottom: '',
							top: formatDayMonthLabel(c[0])
						});
						return p;
					}, []);
				break;
			default:
				labels = timeIntervals
					.reduce((p, c) => {
						p.push({
							bottom: formatHourLabel(c[0]),
							top: formatDayMonthLabel(c[0])
						});
						return p;
					}, []);
				break;
		}
		return labels;
	}
);

export const selectedSubIntervalLabelSelector = createSelector(
	timeIntervalSelector,
	timeIntervalsSelector,
	selectedSubIntervalSelector,
	(timeInterval, timeIntervals, selectedSubInterval) => {
		if (selectedSubInterval === '' || timeIntervals.length === 0) {
			return '';
		}
		const subInterval = timeIntervals[Number(selectedSubInterval)];
		let label;
		switch (timeInterval) {
			case '1D':
			case '24h':
				label = formatFullHour(subInterval[0]);
				break;
			default:
				label = subInterval[0];
				break;
		}
		return label;
	}
);

export const breadcrumbsSelector = createSelector(
	viewSelector,
	selectedNodeKeywordSelector,
	selectedSubIntervalLabelSelector,
	(view, selectedNodeKeyword, selectedSubIntervalLabel) => {
		let path;
		switch (view) {
			case viewNames.JARVIS:
				path = [];
				break;
			case viewNames.CALENDAR:
				path = [viewNames.CALENDAR];
				break;
			case viewNames.ANOMALOUS_CONTEXT:
				path = [
					viewNames.CALENDAR,
					viewNames.ANOMALOUS_CONTEXT,
					selectedNodeKeyword || selectedSubIntervalLabel
				];
				break;
			default:
				path = [];
		}
		return path.filter(Boolean);
	}
);

export const streamSlideDataSelector = createSelector(
	nodesAtDepthSelector,
	selectedSubIntervalSelector,
	anomalySelector,
	(nodesAtDepth, selectedSubInterval, anomaly) => Object
			.values(nodesAtDepth)
			.map(node => ({
				nodeAnomaly: anomaly ?
					node.anomalies[anomaly][selectedSubInterval] || 0 :
					undefined,
				nodeId: node.id,
				value: node.streamVector[Number(selectedSubInterval)]
			}))
			.filter(el => el.value > 0)
			.reduce((p, c) => {
				p[c.nodeId] = {
					value: c.value,
					anomalyValue: c.nodeAnomaly
				};
				return p;
			}, {})
);

export const clustersChartDataSelector = createSelector(
	nodesAtDepthSelector,
	selectedSubIntervalSelector,
	anomalySelector,
	streamSlideDataSelector,
	(nodesAtDepth, selectedSubInterval, anomaly, streamSlideData) => {
		if (selectedSubInterval === '') {
			return [];
		}
		const nodes = Object.entries(nodesAtDepth)
			.map(([nodeId, nodeObj]) =>
				nodeObj.keywordsOnInterval[selectedSubInterval]
					.map(([keyword, volume], i, a) =>
						({
							nodeAnomaly: anomaly ?
								nodeObj.anomalies[anomaly][selectedSubInterval] || 0 :
								undefined,
							nodeId: `•${nodeId}`,
							id: keyword,
							rootId: a[0][0],
							keyword,
							volume: volume * streamSlideData[nodeId].value
						})
					)
			)
			.reduce((p, c) => p.concat(c), [])
			.filter(el => el.volume > CLUSTERS_VOLUME_CUTOFF);
		const repeatedKeywords = Object
			.entries(nodes
				.reduce((p, c) => {
					p[c.keyword] = (p[c.keyword] || 0) + 1;
					return p;
				}, {})
			)
			.filter(([k, v]) => v > 1)
			.map(([k, v]) => k);
		nodes
			.forEach(el => {
				if (repeatedKeywords.indexOf(el.id) >= 0) {
					el.id = `${el.nodeId}-${el.id}`;
				}
				if (repeatedKeywords.indexOf(el.rootId) >= 0) {
					el.rootId = `${el.nodeId}-${el.rootId}`;
				}
			});
		return nodes;
	}
);

export const querystringParamsContextSelector = createSelector(
	timeIntervalSelector,
	dateSelector,
	vertexTypeSelector,
	sourceSelector,
	(timeInterval, date, vertexType, source) =>
		({
			db: DATABASE_NAME,
			date,
			interval: timeInterval,
			source,
			type: vertexType,
			granularity: granularityMap[timeInterval]
		})
);

export const querystringParamsCalendarSelector = createSelector(
	calendarMonthSelector,
	vertexTypeSelector,
	(calendarMonth, vertexType) =>
		({
			db: DATABASE_NAME,
			date: calendarMonth,
			type: vertexType
		})
);

export const agendaDataSelector = createSelector(
	selectedDayOnCalendarSelector,
	selectedSourcesOnCalendarSelector,
	calendarDataSelector,
	(selectedDayOnCalendar, selectedSourcesOnCalendar, calendarData) => {
		if (
			!selectedDayOnCalendar ||
			calendarData.length === 0 ||
			!calendarData.find(el => el.date === selectedDayOnCalendar)
		) {
			return [];
		}
		const anomalies = calendarData
			.find(el => el.date === selectedDayOnCalendar)
			.anomalies;
		const anomaliesOnSource = Object
			.values(anomalies)
			.filter(el => selectedSourcesOnCalendar[el.source])
			.sort((a, b) => b.anomaly_level - a.anomaly_level);
		const anomaliesObj = anomaliesOnSource
			.reduce((p, c) => {
				const hour = c.hour;
				if (p[hour]) {
					p[hour].push(c);
				} else {
					p[hour] = [c];
				}
				return p;
			}, {});
		return Object
			.entries(anomaliesObj)
			.map(([k, v]) => ({hour: Number(k), anomalies: v}))
			.sort((a, b) => a.hour - b.hour);
	}
);

export const calendarDayAnomalySelector = createSelector(
	calendarDataSelector,
	selectedSourcesOnCalendarSelector,
	(calendarData, selectedSourcesOnCalendar) => calendarData
		.reduce((p, c) => {
			p[c.date] = ({
				twitter: (c.twitter && selectedSourcesOnCalendar.twitter) ?
					c.twitter :
					[],
				gdelt: (c.gdelt && selectedSourcesOnCalendar.gdelt) ?
					c.gdelt :
					[],
				reddit: (c.reddit && selectedSourcesOnCalendar.reddit) ?
					c.reddit :
					[]
			});
			return p;
		}, {})
);

export const documentsSelector = state =>
	state.documents;

export const selectedNodeDocumentsSelector = createSelector(
	selectedNodeSelector,
	nodesSelector,
	documentsSelector,
	(selectedNode, nodes, documents) =>
		nodes[selectedNode]
			.documents
			.map(([id, value]) => documents[id])
);

export const nodeDocumentsSelector = createSelector(
	nodesSelector,
	documentsSelector,
	(nodes, documents) => nodeId =>
		nodes[nodeId]
			.documents
			.map(([id, value]) => documents[id])
);

export const nodeDocumentsSubIntervalSelector = createSelector(
	nodesSelector,
	documentsSelector,
	selectedSubIntervalSelector,
	(nodes, documents, subinterval) => (nodeId, custominterval) =>
		nodes[nodeId]
			.documentsOnInterval[subinterval ? subinterval : custominterval]
			.map(([id, value]) => documents[id])
);

export const timeIntervalsWithAnomaliesSelector = createSelector(
	timeIntervalsSelector,
	anomaliesOnTimelineSelector,
	(timeIntervals, anomaliesOnTimeline) => {
		const anomalies = anomaliesData(anomaliesOnTimeline);
		return timeIntervals.map((el, i) => {
			const anomalyObj = anomalies.find(obj => obj.subIntervalIndex === i);
			return {
				interval: el,
				anomaly: anomalyObj ? anomalyObj.anomaly : 0
			};
		});
	}
);
