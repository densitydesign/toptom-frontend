<header-bar>
	<header class="header">
		<bread-crumb class="bread-crumb" store={opts.store}></bread-crumb>
	</header>

	<style>
		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: var(--header-height);
			width: var(--header-width);
			background: var(--header-background);
			z-index:998;
		}

		.bread-crumb {
			flex: 1 0 auto;
			font-weight:500;
		}
		
	</style>

	<script>
		import './bread-crumb.tag';
		import headerBarTag from './header-bar.js';
		headerBarTag.call(this, opts);
	</script>
</header-bar>