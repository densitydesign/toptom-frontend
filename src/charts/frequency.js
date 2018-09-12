import {select} from 'd3-selection';
import {min} from 'd3-array';
import {
	scaleOrdinal,
	scaleLinear,
	scaleSqrt
} from 'd3-scale';
import {brighten} from '../utils';
import {
	nodeColor,
	anomalyColor,
	mainViewMargins,
	TIME_LINE_HEIGHT,
	TOOLTIP_WIDTH
} from '../parameters';
import tooltipsFactory from './tooltips';

const rScale = scaleSqrt()
	.domain([0.01, 0.1])
	.clamp(true);

const colorScale = scaleLinear()
	.domain([0, 3])
	.clamp(true);

const anomalyColorScale = scaleOrdinal()
	.domain([1, 2, 3])
	.range([anomalyColor[1], anomalyColor[2], anomalyColor[3]]);

const grayColorScale = scaleLinear()
	.domain([0, 3])
	.range(['#ccc', '#eee'])
	.clamp(true);

const DELTA = 3;
const dy = (d, i, g) =>
	-rScale(d[1]) + g
		.map(el => (2 * rScale(el[1])) + DELTA)
		.slice(0, i + 1)
		.reduce((p, c) => p + c, 0);

const tooltips = tooltipsFactory('.tooltips-container')
	.cssClass('frequency-tooltip');
const setTooltipsPositions = (subIntervalLength, height) =>
	(keywords, index) =>
		keywords
			.map((k, i, a) => ({
				keyword: k[0],
				position: {
					bottom: `${TIME_LINE_HEIGHT + mainViewMargins.bottom + height - (height * 3 / 5) - dy(k, i, a) - 1}px`,
					left: `${mainViewMargins.left - (TOOLTIP_WIDTH / 2) + (index * subIntervalLength) - 1}px`
				}
			}));
const tooltipsData = (subIntervalLength, height) =>
	data =>
		data
			.map(setTooltipsPositions(subIntervalLength, height))
			.reduce((p, c) => p.concat(c), []);

export default selector => {
	let clickOnNodeHandler;
	let data = [];
	let selectedNode;
	let selectedAnomaly;
	let width;
	let height;

	let _data;
	let _selectedNode;
	let _selectedAnomaly;

	const $ = () => {
		if (
			data === _data &&
			selectedNode === _selectedNode &&
			selectedAnomaly === _selectedAnomaly
		) {
			return;
		}
		_data = data;
		_selectedNode = selectedNode;
		_selectedAnomaly = selectedAnomaly;

		const keywordsData = data.keywordsOnInterval;
		const anomaliesData = data.anomalies;
		const selection = select(selector);
		const subIntervalLength = width / (keywordsData.length - 1);

		const tData = tooltipsData(subIntervalLength, height);

		rScale
			.range([
				min([subIntervalLength, 55]) / 4,
				min([subIntervalLength, 55]) / 2 * 0.95
			]);

		colorScale
			.range([
				nodeColor(selectedNode),
				brighten(nodeColor(selectedNode))
			]);

		const setColor = (d, i) => {
			if (!selectedAnomaly) {
				return colorScale(i);
			} else if (selectedAnomaly && anomaliesData[d[2]]) {
				return anomalyColorScale(anomaliesData[d[2]]);
			}
			return grayColorScale(i);
		};

		tooltips.data(tData(keywordsData))();

		const group = selection
			.selectAll('g.frequency-on-subinterval')
				.data(keywordsData);

		group
			.exit()
				.remove();

		const updateGroup = group
			.selectAll('g.keyword-group')
				.data(d => d);

		updateGroup
			.exit()
				.remove();

		updateGroup
			.attr('transform', (d, i, g) =>
			`translate(0, ${dy(d, i, g.map(el => select(el).datum()))})`);

		updateGroup
			.select('circle')
				.attr('r', d => rScale(d[1]))
				.style('fill', setColor);

		updateGroup
			.enter()
			.append('g')
				.attr('class', 'keyword-group')
				.attr('transform', (d, i, g) =>
				`translate(0, ${dy(d, i, g.map(el => select(el).datum()))})`)
			.append('circle')
				.attr('r', d => rScale(d[1]))
				.style('fill', setColor);

		const enterGroup = group
			.enter()
			.append('g')
				.on('click', clickOnNodeHandler)
				.attr('class', 'frequency-on-subinterval')
				.attr('transform', (d, i) =>
					`translate(${i * subIntervalLength}, ${height * 3 / 5})`)
					.attr('filter', 'url(#gooey-effect)');

		const subintervalGroup = enterGroup
			.selectAll('g.keyword-group')
				.data(d => d)
			.enter()
			.append('g')
				.attr('class', 'keyword-group')
				.attr('transform', (d, i, g) =>
					`translate(0, ${dy(d, i, g.map(el => select(el).datum()))})`);

		subintervalGroup
			.append('circle')
				.attr('r', d => rScale(d[1]))
				.style('fill', setColor);
	};

	$.data = _ => {
		data = _;
		return $;
	};

	$.selectedNode = _ => {
		selectedNode = _;
		return $;
	};

	$.selectedAnomaly = _ => {
		selectedAnomaly = _;
		return $;
	};

	$.width = _ => {
		width = _;
		return $;
	};

	$.height = _ => {
		height = _;
		return $;
	};

	$.clickOnNodeHandler = _ => {
		clickOnNodeHandler = _;
		return $;
	};

	return $;
};
