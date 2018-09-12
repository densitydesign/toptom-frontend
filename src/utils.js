import {timeParse} from 'd3-time-format';
import {min, max} from 'd3-array';
import {compose} from 'redux';
import chroma from 'chroma-js';

export const parseDate = timeParse('%Y-%m-%dT%H');

export const pick = (l, o) =>
	l.reduce((p, c) => {
		p[c] = o[c];
		return p;
	}, {});

export const minBy = accessor => data => min(data, accessor);
export const maxBy = accessor => data => max(data, accessor);

// From http://bl.ocks.org/duopixel/3824661
export const pointAtX = (path, x) => {
	let beginning = x;
	let end = path.getTotalLength();
	let target;
	let pos;
	while (true) {
		target = Math.floor((beginning + end) / 2);
		pos = path.getPointAtLength(target);
		if ((target === end || target === beginning) && pos.x !== x) {
			break;
		}
		if (pos.x > x) {
			end = target;
		} else if (pos.x < x) {
			beginning = target;
		} else {
			break;
		}
	}
	return pos.y;
};

export const range = n =>
	Array.from(new Array(n), (x, i) => i);

export const modulo = (n, m) =>
	x => {
		const v = x % (m - n);
		return v >= 0 ? v + n : v + m;
	};

const stringToArray = s =>
	s
		.slice(4, -1)
		.split(',')
		.map(el => Number(el.trim()));

const toGray = color =>
	chroma(color).brighten(2).desaturate(5);

export const grayScale = compose(
	toGray,
	stringToArray
);

export const brighten = color =>
	chroma(color).brighten(2).hex();

export const brighten1 = color =>
	chroma(color).brighten(1.5).hex();

export const anomaliesData = data =>
	data
		.map((subInterval, i) =>
			Object
				.entries(subInterval)
				.map(([id, obj]) =>
					({
						subIntervalIndex: i,
						id,
						anomaly: obj.anomalyValue
					})
				))
		.reduce((p, c) => p.concat(c), [])
		.filter(el => el.anomaly !== 0);
