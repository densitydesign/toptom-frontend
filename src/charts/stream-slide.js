import {
	stack as stackFactory
} from 'd3-shape';
import {select} from 'd3-selection';
import {sum} from 'd3-array';
import {scaleLinear} from 'd3-scale';
import {
	nodeColor,
	anomalyColor
} from '../parameters';

const stack = stackFactory();
const yScale = scaleLinear();

const color = (d, selectedAnomaly) =>
	selectedAnomaly ?
		anomalyColor[d[0].data[d.key].anomalyValue] :
		nodeColor(d.key);

export default selector => {
	let data;
	let _data;
	let selectedAnomaly;
	let _selectedAnomaly;
	let width;
	let height;

	const $ = () => {
		if (
			data === _data &&
			selectedAnomaly === _selectedAnomaly
		) {
			return;
		}
		_data = data;
		_selectedAnomaly = selectedAnomaly;

		yScale
			.domain([0, sum(Object.values(data), d => d.value)])
			.range([height / 4, height * 3 / 4]);
		stack
			.keys(Object.keys(data))
			.value((d, k) => d[k].value);
		const series = stack([data]);
		const selection = select(selector);

		const bar = selection
			.selectAll('.bar')
			.data(series, d => d.key);

		bar
			.exit()
				.remove();

		bar
			.enter()
			.append('rect')
			.attr('class', 'bar')
			.merge(bar)
				.attr('x', 0)
				.attr('y', d => yScale(d[0][0]))
				.attr('width', 10)
				.attr('height', d => yScale(d[0][1]) - yScale(d[0][0]))
				.style('fill', d => color(d, selectedAnomaly));

	};

	$.data = _ => {
		data = _;
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

	return $;
}
