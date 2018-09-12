import {select} from 'd3-selection';

export default selector => {
	let data = [];
	let cssClass = '';

	const $ = () => {
		const selection = select(selector);

		selection
			.selectAll('.small-tooltip')
				.remove();

		const tooltips = selection
			.selectAll(`.${cssClass}`)
				.data(data);

		tooltips
			.enter()
			.append('div')
				.attr('class', `small-tooltip ${cssClass}`)
				.style('bottom', d => d.position.bottom)
				.style('left', d => d.position.left)
			.append('div')
			.append('p')
				.text(d => d.keyword);
	};

	$.data = _ => {
		data = _;
		return $;
	};

	$.cssClass = _ => {
		cssClass = _;
		return $;
	};

	return $;
};
