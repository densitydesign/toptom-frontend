<tool-bar class="tool-bar {visible: isActive}">
	<div class="parameters-controls">
		<heatmap-slider class="heatmap-slider" store={opts.store}></heatmap-slider>
		<anomalies-drop-down store={opts.store}></anomalies-drop-down>
	</div>
	<div class="date-controls">
		<sources-drop-down store={opts.store}></sources-drop-down>
		<time-interval-drop-down store={opts.store}></time-interval-drop-down>
		<date-drop-down store={opts.store}></date-drop-down>
	</div>

	<style>
		:scope {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: var(--tool-bar-height);
			width: var(--tool-bar-width);
			background: var(--tool-bar-background);
			visibility: hidden;
		}
		.parameters-controls,
		.date-controls {
			display: flex;
			align-items: center;
		}
		.parameters-controls {
			margin-left: 50px;
		}
		.date-controls {
			margin-right: 50px;
		}
	</style>

	<script>
		import './heatmap-slider.tag';
		import './anomalies-drop-down.tag';
		import './time-interval-drop-down.tag';
		import './date-drop-down.tag';
		import './sources-drop-down.tag';
		import toolBarTag from './tool-bar.js';
		toolBarTag.call(this, opts);
	</script>
</tool-bar>