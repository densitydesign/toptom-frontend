import {select, event} from 'd3-selection';
import {drag} from 'd3-drag';
import {scaleLinear} from 'd3-scale';
import sliderFactory from '../charts/slider';
import {
	sliderDataSelector,
	depthIndexSelector,
	numberOfLevelsSelector
} from '../state/selectors';
import {dispatchChangeDepth} from '../state/dispatchers';

const slider = sliderFactory('.heatmap-slider > svg')
	.width(200)
	.height(25);

const x = scaleLinear()
	.domain([0, 200])
	.range([0, 200])
	.clamp(true);

const xCoordinate = event =>
	Math.floor(x(x.invert(event.x)));

const levelIndex = (event, numberOfLevels) =>
	Math.floor(xCoordinate(event) * numberOfLevels / 200) || 1;

const sliderPosition = state => {
	const numberOfLevels = numberOfLevelsSelector(state);
	return numberOfLevels ?
		Math.floor(depthIndexSelector(state) * 200 / numberOfLevels) - 2 :
		0;
};

export default function (opts) {
	this.sliderPosition = sliderPosition(opts.store.getState());
	this.on('mount', () => {
		const slider = select('.slider > rect');
		slider
			.call(drag()
				//.on('start.interrupt', () => slider.interrupt())
				.on('start drag', () => slider.attr('x', xCoordinate(event) - 5))
				.on('end', () => {
					const l = levelIndex(event, numberOfLevelsSelector(opts.store.getState()));
					dispatchChangeDepth(l - 1);
				})
			);
	});

	// Add keyboard events to the body.
	select('body').on('keydown', function() {
		let l = depthIndexSelector(opts.store.getState())*1;
		if(event.key == "ArrowUp" && l > 0) {
			dispatchChangeDepth(l - 1);
		}
		else if(event.key == "ArrowDown" && l < numberOfLevelsSelector(opts.store.getState()) - 1 ) {
			dispatchChangeDepth(l + 1);
		}
	});

	this.on('update', () => {
		this.sliderPosition = sliderPosition(opts.store.getState());
		slider
			.data(sliderDataSelector(opts.store.getState()));
		slider();
	});
}
