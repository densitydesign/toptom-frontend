import {interpolateCool} from 'd3-scale';
import seedRandom from 'seedrandom';

export const viewNames = {
	ANOMALOUS_CONTEXT: 'ANOMALOUS_CONTEXT',
	CALENDAR: 'CALENDAR'
};

export const anomalyColor = {
	0: '#999',
	1: '#ffb5c1',
	2: '#ff7482',
	3: '#ff3e59'
};

export const anomalyNames = {
	'': 'none',
	volume_increase: 'volume increase',
	volume_decrease: 'volume decrease'
};

export const sourceNames = {
	'twitter': 'Twitter',
	'gdelt': 'GDELT News',
	'reddit': 'Reddit'
};

export const timeIntervalNames = {
	'24h': '24 hours',
	'1D': '1 day',
	'2D': '2 days',
	'4D': '4 days',
	'1W': '1 week',
	'2W': '2 weeks',
	'3W': '3 weeks',
	'4W': '4 weeks',
	'1M': '1 month',
	'2M': '2 months'
};

// FIXME avoid such binding
// Must be equal to rules in variables.css
export const HEADER_HEIGHT = 50;
export const TOOL_BAR_HEIGHT = 50;
export const TIME_LINE_HEIGHT = 70;
export const TOOLTIP_WIDTH = 45;
export const CALENDAR_CELL_WIDTH = 80;
export const CALENDAR_CELL_HEIGHT = 70;

export const mainViewMargins = {
	top: 30,
	right: 50,
	bottom: 30,
	left: 50
};

export const timelineMargins = {
	top: 10,
	right: 50,
	bottom: 10,
	left: 50
};

export const windowInnerSizes = {
	width: window.innerWidth,
	height: window.innerHeight - HEADER_HEIGHT - TOOL_BAR_HEIGHT - TIME_LINE_HEIGHT
};

export const mainViewSizes = {
	width: windowInnerSizes.width - mainViewMargins.left - mainViewMargins.right,
	height: windowInnerSizes.height - mainViewMargins.top - mainViewMargins.bottom
};

export const timelineInnerSizes = {
	width: window.innerWidth,
	height: TIME_LINE_HEIGHT
};

export const timelineSizes = {
	width: timelineInnerSizes.width - timelineMargins.left - timelineMargins.right,
	height: timelineInnerSizes.height - timelineMargins.top - timelineMargins.bottom
};

export const nodeColor = nodeId =>
	interpolateCool(seedRandom(nodeId)());

export const ANOMALY_WIDTH = 100;

export const CLUSTERS_VOLUME_CUTOFF = 0.005;

export const granularityMap = {
	'24h': '1h',
	'1D': '1h',
	'2D': '2h',
	'4D': '3h',
	'1W': '12h',
	'2W': '12h',
	'3W': '12h',
	'4W': '1D',
	'1M': '1D',
	'2M': '2D'
};

export const DATABASE_NAME = 'jarvis';
export const GENERIC_ERROR = 'Error.';
