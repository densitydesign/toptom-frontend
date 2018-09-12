<heatmap-slider>
	<h1>Depth</h1>
	<svg width='210' height='60'>
		<defs>
			<pattern id='slider-stripes' patternUnits='objectBoundingBox' width='0.5' height='0.166'>
				<path
					d='M 0,5 l 5,-5 M -1.25,1.25 l 2.5,-2.5 M 3.75,6.25 l 2.5,-2.5'
					stroke-width='1'
					shape-rendering='auto'
					stroke='#fafbff'
					stroke-opacity='1'
					stroke-linecap='square'
					fill='#fafbff'
				></path>
			</pattern>
		</defs>
		<g class='heatmap' transform='translate(5, 17.5)'>
			<rect x='0' y='0' width='200' height='25' class='background'></rect>
		</g>
		<g class='slider' transform='translate(5, 15)'>
			<rect riot-x='{sliderPosition}' y='0' width='10' height='30' fill='#fafbff'></rect>
		</g>
	</svg>

	<style>
		:scope {
			display: flex;
			align-items: center;

		}
		h1 {
			margin-right: 20px;
		}
		.slider > rect {
			stroke: #000;
			stroke-width: 1.5;
			cursor: pointer;
		}
		rect.background {
			fill: #efefef;
		}
	</style>

	<script>
		import heatmapSliderTag from './heatmap-slider.js'; 
		heatmapSliderTag.call(this, opts);
	</script>
</heatmap-slider>