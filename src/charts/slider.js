import {select, event} from 'd3-selection';
import {scaleOrdinal} from 'd3-scale';
import {anomalyColor} from '../parameters';
import {dispatchChangeDepth} from '../state/dispatchers';

const levelIndex = numberOfLevels => event =>
	Math.floor((event.offsetX - 5) * (numberOfLevels / 200)) || 1;

const anomalyColorScale = scaleOrdinal()
	.domain([0, 1, 2, 3])
	.range(['transparent', anomalyColor[1], anomalyColor[2], anomalyColor[3]]);

export default selector => {
	let data = [];
	let width;
	let height;

	let _data;

	const $ = () => {
		if (data.length === 0 || data === _data) {
			return;
		}
		_data = data;

		const selection = select(selector);
		const heatmap = selection.select('.heatmap');
		const numberOfLevels = data.length;
		const base = width / numberOfLevels;

		// Todo: add x axis

		const levels = heatmap
			.selectAll('.level')
				.data(data);

		levels
			.exit()
				.remove();

		levels
				.attr('x', (d, i) => i * base)
				.style('fill', d => anomalyColorScale(d));

		levels
			.enter()
			.append('rect')
				.attr('class', 'level')
				.attr('x', (d, i) => i * base)
				.attr('y', 0)
				.attr('width', base)
				.attr('height', height)
				.style('fill', d => anomalyColorScale(d))
				.on('click', () => {
					const l = levelIndex(numberOfLevels);
					dispatchChangeDepth(l(event) - 1);
				});
	};

	$.data = _ => {
		data = _;
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

	return $;
};
