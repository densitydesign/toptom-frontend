import {
	viewNames,
	mainViewSizes,
	mainViewMargins,
	windowInnerSizes
} from '../parameters';
import {isViewActive} from '../state/lib';

const setVariables = opts => {
	this.isActive =
		isViewActive(opts.store.getState(), viewNames.ANOMALOUS_CONTEXT);
};

export default function (opts) {
	this.innerWidth = windowInnerSizes.width;
	this.innerHeight = windowInnerSizes.height;
	this.width = mainViewSizes.width;
	this.height = mainViewSizes.height;
	this.transform = `translate(${mainViewMargins.left},${mainViewMargins.top})`;
	setVariables.call(this, opts);

	this.on('update', () => {
		setVariables.call(this, opts);
	});
}
