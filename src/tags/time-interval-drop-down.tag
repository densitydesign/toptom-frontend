<time-interval-drop-down>
	<h1>Time Interval</h1>
	<div class="dropdown">
		<div>
			<p>{currentTimeInterval}</p>
			<button onclick={toggleTimeIntervalDropdown}>
				<svg class="{hidden: !isTimeIntervalDropdownClosed}" fill="#000000" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
						<path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/>
						<path d="M0 0h24v24H0z" fill="none"/>
				</svg>
				<svg class="{hidden: isTimeIntervalDropdownClosed}" fill="#000000" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
						<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
						<path d="M0 0h24v24H0z" fill="none"/>
				</svg>
			</button>
		</div>
		<ul class="row {hidden: isTimeIntervalDropdownClosed}">
			<li class="row {hidden: isCurrentTimeInterval('24h')}" onclick={selectTimeInterval('24h')}>
				<span>{timeIntervalName('24h')}</span>
			</li>
			<li class="row {hidden: isCurrentTimeInterval('1D')}" onclick={selectTimeInterval('1D')}>
				<span>{timeIntervalName('1D')}</span>
			</li>
			<li class="row {hidden: isCurrentTimeInterval('2D')}" onclick={selectTimeInterval('2D')}>
				<span>{timeIntervalName('2D')}</span>
			</li>
			<li class="row {hidden: isCurrentTimeInterval('4D')}" onclick={selectTimeInterval('4D')}>
				<span>{timeIntervalName('4D')}</span>
			</li>
			<li class="row {hidden: isCurrentTimeInterval('1W')}" onclick={selectTimeInterval('1W')}>
				<span>{timeIntervalName('1W')}</span>
			</li>
			<li class="row {hidden: isCurrentTimeInterval('3W')}" onclick={selectTimeInterval('3W')}>
				<span>{timeIntervalName('3W')}</span>
			</li>
			<li class="row {hidden: isCurrentTimeInterval('4W')}" onclick={selectTimeInterval('4W')}>
				<span>{timeIntervalName('4W')}</span>
			</li>
			<li class="row {hidden: isCurrentTimeInterval('1M')}" onclick={selectTimeInterval('1M')}>
				<span>{timeIntervalName('1M')}</span>
			</li>
			<li class="row {hidden: isCurrentTimeInterval('2M')}" onclick={selectTimeInterval('2M')}>
				<span>{timeIntervalName('2M')}</span>
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
			width: var(--time-interval-drop-down-width);

		}

		.dropdown li:hover {
			background-color: #fafbff !important;
			cursor:pointer;
		}


	</style>

	<script>
		import timeIntervalDropDownTag from "./time-interval-drop-down.js";
		timeIntervalDropDownTag.call(this, opts);
	</script>
</time-interval-drop-down>