<keyword-clusters class="{visible: isActive}">
	<g class="stream-slide"></g>
	<g class="keyword-clusters-group">
		<defs>
			<filter id="gooey-effect-cluster">
				<feGaussianBlur in="SourceGraphic" stdDeviation="10" color-interpolation-filters="sRGB" result="blur"></feGaussianBlur>
				<feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="gooey"></feColorMatrix>
			</filter>
		</defs>
		<g class="background-vertices" filter="url(#gooey-effect-cluster)"></g>
		<g class="foreground-vertices"></g>
		<g class="vertex-labels"></g>
	</g>

	<style>
		:scope {
			visibility: hidden;
		}
		.vertex text {
			text-anchor: middle;
			text-transform: uppercase;
			font-weight: 600;
			pointer-events: none;
		}

		.keyword-clusters:hover {
			cursor: pointer;
		}

		rect.bar {
			stroke-width: 1.5px;
			stroke: #fafbff;
		}
		.visible {
			visibility: visible;
		}

	</style>

	<script>
		import keywordClustersTag from './keyword-clusters.js';
		keywordClustersTag.call(this, opts);
	</script>
</keyword-clusters>