<keyword-frequency>
	<g class="keyword-frequency-group">
		<defs>
			<filter id="gooey-effect">
				<feGaussianBlur in="SourceGraphic" stdDeviation="5" color-interpolation-filters="sRGB" result="blur"></feGaussianBlur>
				<feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="gooey"></feColorMatrix>
			</filter>
		</defs>
	</g>

	<style>
	.frequency-on-subinterval:hover {
		cursor: pointer;
		}
	</style>

	<script>
		import keywordFrequencyTag from './keyword-frequency.js';
		keywordFrequencyTag.call(this, opts);
	</script>
</keyword-frequency>