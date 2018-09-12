<anomalous-context-view class="main-view {visible: isActive}">
	<div class="tooltips-container"></div>
	<svg class="anomalous-context-svg" riot-width={innerWidth} riot-height={innerHeight}>
		<g riot-transform={transform}>
			<!--<circle cx="0" cy="0" r="3"></circle>
			<circle riot-cx={width} cy="0" r="3"></circle>
			<circle cx="0" riot-cy={height} r="3"></circle>
			<circle riot-cx={width} riot-cy={height} r="3"></circle>-->
			<g 
				data-is="stream-graph"
				store={opts.store}
				width={width}
				height={height}>
			</g>
			<g
				data-is="keyword-frequency"
				store={opts.store}
				width={width}
				height={height}>
			</g>
			<g data-is="keyword-distribution" store={opts.store}></g>
			<g
				data-is="keyword-clusters"
				store={opts.store}
				width={width}
				height={height}>
			</g>
		</g>
	</svg>
		<style>
		:scope {
			display: flex;
			justify-content: center;
			align-items: center;
		}

		svg {
			shape-rendering: auto;
		}
		.small-tooltip {
			position: fixed;
			pointer-events: none;
			width: 60px;
			text-align: center;
			background: var(--tooltips-background);
			border: 1px solid black;
			height: auto;
			padding:0;
			margin:0.01em;
			justify-content: center;
		}
		.small-tooltip.frequency-tooltip {
			position: fixed;
			display: flex;
			align-items: center;
			justify-content: center;
			height: 0px;
			border-color: transparent;
			background: transparent;
			width: var(--tooltip-width);
		}
		.small-tooltip.stream-tooltip:after {
			content: "";
			position: absolute;
			width: 0;
			height: 0;
			/*border-width: 5px;
			border-style: solid;*/
			border-color: var(--tooltips-background) transparent transparent transparent;
			bottom: -10px;
			left: 17.5px;
		}
		.small-tooltip > div {
			background: inherit;
			width: inherit;
			height: auto;
			border-width: 0;
			border-style: inherit;
		}
		.small-tooltip.frequency-tooltip > div {
			border: 1px solid black;
			background: var(--tooltips-background);
		}
		.small-tooltip p {
			padding: 3px;
			margin: 1px 0 1px 0;
			text-overflow: ellipsis;
			white-space: wrap;
			overflow: hidden;
			font-size: 0.8rem;
			font-weight: 400;
			text-transform: uppercase;
			color: var(--text-color);
			letter-spacing: 0px;
		}
	</style>

	<script>
		import './stream-graph.tag';
		import './keyword-frequency.tag';
		import './keyword-distribution.tag';
		import './keyword-clusters.tag';
		import anomalouscontextViewTag from './anomalous-context-view.js';
		anomalouscontextViewTag.call(this, opts);
	</script>
</anomalous-context-view>