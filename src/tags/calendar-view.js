import {viewNames} from '../parameters';
import {isViewActive} from '../state/lib';
import {
	dispatchChangeView,
	dispatchToggleSourceOnCalendar,
	dispatchChangeVertexType
} from '../state/dispatchers';
import {
	vertexTypeSelector,
	selectedSourcesOnCalendarSelector
} from '../state/selectors';

const setVariables = opts => {
	const state = opts.store.getState();
	this.isActive = isViewActive(state, viewNames.CALENDAR);
	this.isVertexTypeEntity = vertexTypeSelector(state) === 'entities';
	this.isVertexTypeKeyword = vertexTypeSelector(state) === 'keywords';
	const selectedSources = selectedSourcesOnCalendarSelector(state);
	this.isSourceGdeltSelected = selectedSources.gdelt;
	this.isSourceTwitterSelected = selectedSources.twitter;
	this.isSourceRedditSelected = selectedSources.reddit;
};

export default function (opts) {
	setVariables.call(this, opts);
	this.toggleGdelt = () => dispatchToggleSourceOnCalendar('gdelt');
	this.toggleTwitter = () => dispatchToggleSourceOnCalendar('twitter');
	this.toggleReddit = () => dispatchToggleSourceOnCalendar('reddit');
	this.changeVertexTypeToEntity = () => dispatchChangeVertexType('entities');
	this.changeVertexTypeToKeyword = () => dispatchChangeVertexType('keywords');
	this.changeView = () => dispatchChangeView(viewNames.ANOMALOUS_CONTEXT);

	this.on('update', () => {
		setVariables.call(this, opts);
	});
}
