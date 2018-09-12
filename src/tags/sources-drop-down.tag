<sources-drop-down>
	<h1>Source</h1>
	<div class="dropdown">
		<div>
			<p>{currentSource}</p>
			<button onclick={toggleSourceDropdown}>
				<svg class="{hidden: !isSourceDropdownClosed}" fill="#000000" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
						<path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/>
						<path d="M0 0h24v24H0z" fill="none"/>
				</svg>
				<svg class="{hidden: isSourceDropdownClosed}" fill="#000000" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
						<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
						<path d="M0 0h24v24H0z" fill="none"/>
				</svg>
			</button>
		</div>
		<ul class="row {hidden: isSourceDropdownClosed}">
			<li class="row {hidden: isCurrentSource('twitter')}" onclick={selectSource('twitter')}>
				<span>{sourceName('twitter')}</span>
			</li>
			<li class="row {hidden: isCurrentSource('gdelt')}" onclick={selectSource('gdelt')}>
				<span>{sourceName('gdelt')}</span>
			</li>
			<li class="row {hidden: isCurrentSource('reddit')}" onclick={selectSource('reddit')}>
				<span>{sourceName('reddit')}</span>
			</li>
		</ul>
	</div>

	<style>
		:scope {
			display: flex;
			align-items: center;
			z-index: 100;
		}
		h1 {
			margin: 0 20px 0 20px;
		}
		.dropdown div,
		.dropdown .row {
			width: var(--sources-drop-down-width);
		}
		button {
			cursor: pointer;
		}
	</style>

	<script>
		import sourcesDropDownTag from "./sources-drop-down.js";
		sourcesDropDownTag.call(this, opts);
	</script>
</sources-drop-down>