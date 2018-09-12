<error-bar class="{open: isActive}">
	<header class="error-header">
		<p>{error}</p>
		<button onClick={closeErrorBar}>
			<svg fill="#fff" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
					<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
					<path d="M0 0h24v24H0z" fill="none"/>
			</svg>
		</button>
	</header>

	<style>
		:scope {
			visibility: hidden;
		}
		:scope.open {
			visibility: visible;
		}
		.error-header {
			position: absolute;
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: var(--header-height);
			width: var(--header-width);
			background: var(--error-background);
			z-index:999;
		}
		.error-header > p {
			color: white;
			padding-left: 30px;
		}
		.error-header > button {
			background: transparent;
			border: 0;
			padding-right: 30px;
			cursor: pointer;
		}
	</style>

	<script>
		import errorBarTag from './error-bar.js';
		errorBarTag.call(this, opts);
	</script>
</error-bar>