import {viewSelector} from './selectors';

export const isViewActive = (state, viewName) =>
	viewSelector(state) === viewName;
