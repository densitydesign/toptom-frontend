<main-content>
	<calendar-view store={opts.store}></calendar-view>
	<anomalous-context-view store={opts.store}></anomalous-context-view>

	<style>
		:scope {
			flex: 1 1 auto;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	</style>

	<script>
		import './calendar-view.tag';
		import './anomalous-context-view.tag';
		import mainContentTag from './main-content.js';
		mainContentTag.call(this, opts);
	</script>
</main-content>