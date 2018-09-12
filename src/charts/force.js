import {
	forceManyBody as forceManyBodyFactory,
	forceCollide as forceCollideFactory,
	forceX as forceXFactory,
	forceY as forceYFactory,
	forceCenter as forceCenterFactory,
	forceSimulation
} from 'd3-force';

export const FORCE_STRENGTH = -600;
const GRAVITY_STRENGTH = 0.05;
const NUMBER_OF_ITERATIONS = 200;

export const forceManyBody = forceManyBodyFactory();

export const forceCollide = forceCollideFactory()
	.iterations(3);

export const forceX = forceXFactory()
	.strength(GRAVITY_STRENGTH);

export const forceY = forceYFactory()
	.strength(GRAVITY_STRENGTH);

export const forceCenter = forceCenterFactory();

export const force = forceSimulation()
	.alphaDecay(1 - Math.pow(0.001, 1 / NUMBER_OF_ITERATIONS))
	.force('charge', forceManyBody)
	.force('collide', forceCollide)
	.force('forceCenter', forceCenter)
	.force('forcex', forceX)
	.force('forcey', forceY);
