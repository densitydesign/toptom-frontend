import {
	stack as stackFactory,
	stackOffsetSilhouette,
	stackOrderInsideOut,
	area as areaFactory,
	line as lineFactory,
	curveBasis
} from 'd3-shape';
/*import {chroma.brewer} from 'chroma';*/
import {scaleLinear} from 'd3-scale';
import {min, max, mean} from 'd3-array';
import {select} from 'd3-selection';
import {
	minBy,
	maxBy,
	pointAtX,
	grayScale,
	anomaliesData
} from '../utils';
import {
	mainViewMargins,
	TIME_LINE_HEIGHT,
	TOOLTIP_WIDTH,
	ANOMALY_WIDTH,
	nodeColor
} from '../parameters';
import tooltipsFactory from './tooltips';

const tooltips = tooltipsFactory('.tooltips-container')
	.cssClass('stream-tooltip');
const tooltipsData = (xScale, yScale) =>
	d => {
		const height = yScale.range()[0];
		return d
			.map((el, i) => {
				const y0 = pointAtX(select(`[data-node-tooltip="${d.key}"]`).node(), xScale(i));
				const x = `${xScale(i) + mainViewMargins.left - (TOOLTIP_WIDTH / 2)}px`;
				const y = `${TIME_LINE_HEIGHT + mainViewMargins.bottom + height - y0}px`;
				return {
					amplitude: el.data[d.key].value,
					position: {bottom: y, left: x},
					keyword: el.data[d.key].keyword
				};
			})
			.filter(el => el.amplitude > 0);
	};

const offsetFocus = (id, offset) =>
	(series, order) => {
		if (series.length === 0) {
			return;
		}
		offset(series, order);
		const stream = series.filter(node => node.key === id)[0];
		const M = mean(stream.map(p => (p[1] - p[0]) / 2));
		const deltaY = stream.map(p => M - mean(p));
		series.forEach(node => {
			node.forEach((p, i) => {
				p[0] += deltaY[i];
				p[1] += deltaY[i];
			});
		});
	};

const isUnselected = (selectedNode, d) =>
	selectedNode && selectedNode !== d.key;

const shouldBeGray = (d, selectedNode, selectedAnomaly) => {
	if (selectedAnomaly) {
		return true;
	}
	return isUnselected(selectedNode, d);
};

export default selector => {
	let clickOnNodeHandler;
	let data = [];
	let width;
	let selectedNode;
	let selectedAnomaly;
	let height;

	let _data;
	let _selectedNode;
	let _selectedAnomaly;

	const area = areaFactory();
	const line = lineFactory();
	const stack = stackFactory()
		.order(stackOrderInsideOut);
	const x = scaleLinear();
	const y = scaleLinear();
	const stackMax = maxBy(d => d[1]);
	const stackMin = minBy(d => d[0]);

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

		const selection = select(selector);
		const stream = selection
			.select('.stream');
		const overlay = selection
			.select('.overlay');
		const clips = selection
			.select('defs');
		const anomalyGroup = selection
			.select('.anomalies');

		const offset = selectedNode ?
			offsetFocus(selectedNode, stackOffsetSilhouette) :
			stackOffsetSilhouette;

		stack
			.offset(offset)
			.keys(Object.keys(data[0] ? data[0] : []))
			.value((d, k) => d[k].value);
		const stackData = stack(data);

		x
			.domain([0, data.length - 1])
			.range([0, width]);
		y
			.domain([min(stackData, stackMin), max(stackData, stackMax)])
			.range([selectedNode ? height / 2 : height, 0]);

		const tData = tooltipsData(x, y);

		area
			.x((d, i) => x(i))
			.y0(d => y(d[0]))
			.y1(d => y(d[1]))
			.curve(curveBasis);

		line
			.x((d, i) => x(i))
			.y(d => y(d[0] + ((d[1] - d[0]) / 2)))
			.curve(curveBasis);

		const paths = stream
			.selectAll('.stream-path')
				.data(stackData, d => d.key);

		paths
			.exit()
				.remove();

		paths
				.attr('d', area)
				.style('fill', d => shouldBeGray(d, selectedNode, selectedAnomaly) ?
					grayScale(nodeColor(d.key)) :
					nodeColor(d.key))
				.on('click', clickOnNodeHandler);

		paths
			.enter()
			.append('path')
				.attr('class', 'stream-path')
				.attr('data-node', d => d.key)
				.attr('d', area)
				.style('fill', d => shouldBeGray(d, selectedNode, selectedAnomaly) ?
					grayScale(nodeColor(d.key)) :
					nodeColor(d.key))
				.on('mouseover', d => {
					if (!selectedNode) {
						tooltips.data(tData(d))();
					}
				})
				.on('mouseleave', () => {
					if (!selectedNode) {
						tooltips.data([])();
					}
				})
				.on('click', clickOnNodeHandler);

		const clipPaths = clips
			.selectAll('clipPath')
				.data(stackData, d => d.key);

		clipPaths
			.exit()
				.remove();

		clipPaths
			.select('path')
				.attr('d', area);

		clipPaths
			.enter()
			.append('clipPath')
				.attr('id', d => `clip-${d.key}`)
			.append('path')
				.attr('d', area);

		const tooltipPaths = stream
			.selectAll('.tooltip-path')
				.data(stackData, d => d.key);

		tooltipPaths
			.exit()
				.remove();

		tooltipPaths
				.attr('d', line);

		tooltipPaths
			.enter()
			.append('path')
				.attr('class', 'tooltip-path')
				.attr('data-node-tooltip', d => d.key)
				.attr('d', line)
				.style('fill', 'none')
				.style('stroke', 'none');

		const overlayPaths = overlay
			.selectAll('path')
				.data(stackData, d => d.key);

		overlayPaths
			.exit()
				.remove();

		overlayPaths
				.style('fill', d => isUnselected(selectedNode, d) ? 'url(#stripes)' : 'transparent')
				.attr('d', area);

		overlayPaths
			.enter()
				.append('path')
					.attr('class', 'overlay-path')
					.attr('d', area)
					.style('fill', d => isUnselected(selectedNode, d) ? 'url(#stripes)' : 'transparent');

		const anomalyRects = anomalyGroup
			.selectAll('rect')
				.data(anomaliesData(data), d => `${d.id}-${d.subIntervalIndex}`);

		anomalyRects
			.exit()
				.remove();

		anomalyRects
			.attr('x', d => x(d.subIntervalIndex) - (ANOMALY_WIDTH / 2))
			.attr('clip-path', d => `url(#clip-${d.id})`)
			.style('fill', d => `url(#anomalyGradient${d.anomaly})`)
			.style('fill-opacity', d =>
				(!selectedNode || d.id === selectedNode) ? 1 : 0);

		anomalyRects
			.enter()
			.append('rect')
				.attr('class', 'anomaly-rect')
				.attr('x', d => x(d.subIntervalIndex) - (ANOMALY_WIDTH / 2))
				.attr('y', 0)
				.attr('width', ANOMALY_WIDTH)
				.attr('height', height)
				.attr('clip-path', d => `url(#clip-${d.id})`)
				.style('fill', d => `url(#anomalyGradient${d.anomaly})`)
				.style('fill-opacity', d =>
					(!selectedNode || d.id === selectedNode) ? 1 : 0);
	};

	$.data = _ => {
		data = _;
		return $;
	};

	$.height = _ => {
		height = _;
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

	$.clickOnNodeHandler = _ => {
		clickOnNodeHandler = _;
		return $;
	};

	return $;
};
