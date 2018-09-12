import {
	viewNames,
	timelineSizes,
	timelineMargins,
	timelineInnerSizes,
	mainViewSizes
} from '../parameters';
import {
	timeIntervalsWithAnomaliesSelector,
	timeLineLabelsSelector,
	selectedSubIntervalSelector
} from '../state/selectors';
import {dispatchSelectSubInterval} from '../state/dispatchers';
import {isViewActive} from '../state/lib';

const setVariables = opts => {
	this.isActive =
		isViewActive(opts.store.getState(), viewNames.ANOMALOUS_CONTEXT);
	this.isSelected = index =>
		`${index}` === selectedSubIntervalSelector(opts.store.getState());
	this.intervals = timeIntervalsWithAnomaliesSelector(opts.store.getState());
	this.intervalWidth = mainViewSizes.width / (this.intervals.length - 1);
	this.intervalTransform = i => `translate(${(this.intervalWidth * i) - (this.intervalWidth / 2)}, 10)`;
	this.labels = timeLineLabelsSelector(opts.store.getState());
};

export default function (opts) {
	this.innerWidth = timelineInnerSizes.width;
	this.innerHeight = timelineInnerSizes.height;
	this.width = timelineSizes.width;
	this.height = timelineSizes.height;
	this.transform = `translate(${timelineMargins.left},${timelineMargins.top})`;
	setVariables.call(this, opts);

	this.selectSubInterval = e =>
		dispatchSelectSubInterval(`${e.item.i}`);

	this.on('update', () => {
		setVariables.call(this, opts);
	});
}
