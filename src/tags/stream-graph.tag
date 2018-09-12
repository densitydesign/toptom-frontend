<stream-graph class="stack-group">
	<defs>
		<linearGradient id="anomalyGradient1">
			<stop offset="0%" stop-color="white"/>
			<stop offset="50%" stop-color="{anomalyColor1}" stop-opacity="1"/>
			<stop offset="100%" stop-color="white"/>
		</linearGradient>
		<linearGradient id="anomalyGradient2">
			<stop offset="0%" stop-color="white"/>
			<stop offset="50%" stop-color="{anomalyColor2}" stop-opacity="1"/>
			<stop offset="100%" stop-color="white"/>
		</linearGradient>
		<linearGradient id="anomalyGradient3">
			<stop offset="0%" stop-color="white"/>
			<stop offset="50%" stop-color="{anomalyColor3}" stop-opacity="1"/>
			<stop offset="100%" stop-color="white"/>
		</linearGradient>
		<pattern id="stripes" patternUnits="userSpaceOnUse" width="10" height="10">
			<path
				d="M 0,10 l 10,-10 M -2.5,2.5 l 5,-5 M 7.5,12.5 l 5,-5"
				stroke-width="6"
				shape-rendering="auto"
				stroke="#fafbff"
				stroke-opacity="0.3"
				stroke-linecap="square"
				fill="transparent"
			></path>
		</pattern>
	</defs>
	<g class="stream"></g>
	<g class="overlay"></g>
	<g class="anomalies"></g>

	<style>

		.stream:hover{
			cursor: pointer;
		}
		.overlay {
			pointer-events: none;
		}
		.overlay-path {
			stroke-width: 0;
			stroke: black;
		}
		.anomaly-rect {
			mix-blend-mode: multiply;
			pointer-events: none;
		}
	</style>

	<script>
		import streamGraphTag from './stream-graph.js';
		streamGraphTag.call(this, opts);
	</script>
</stream-graph>rom './stream-graph.js';
		streamGraphTag.call(this, opts);
	</script>
</stream-graph>