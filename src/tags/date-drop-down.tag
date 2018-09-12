<date-drop-down>
	<h1>before</h1>
	<div class="dropdown">
		<div>
			<div class="date-container">
				<p class="date day">{day}</p>
				<p class="date month">{month}</p>
				<p class="date year">{year}</p>
				<p class="date" style="font-weight:900;">{hour}</p>
			</div>
			<button onclick={toggleDateDropdown}>
				<svg class="{hidden: !isDateDropdownClosed}" fill="#000000" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
						<path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/>
						<path d="M0 0h24v24H0z" fill="none"/>
				</svg>
				<svg class="{hidden: isDateDropdownClosed}" fill="#000000" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
						<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
						<path d="M0 0h24v24H0z" fill="none"/>
				</svg>
			</button>
		</div>
		<div class="row calendar-row {hidden: isDateDropdownClosed}">
			<dropdown-calendar store={opts.store}></dropdown-calendar>
		</div>
	</div>

	<style>
		:scope {
			display: flex;
			align-items: center;
			z-index: 100;
		}
		h1 {
			margin: 0 20px 0 20px;
			text-transform: lowercase !important;
		}
		.dropdown div,
		.dropdown .row {
			width: calc(var(--dropdown-calendar-cell-width) * 7) !important;
		}

		.dropdown .row:hover {
			background-color: #fafbff !important;
			cursor:pointer;
		}

		.calendar-row {
			position: absolute;
			top: 87px;
		}
		.date {
			width: 30px;
			padding: 0;
			display: flex;
			align-content: center;
			justify-content: center;

		}
	
		.date.year {
			width: 50px;
		}
		div.date-container {
			width: auto !important;
		}

		date-drop-down .date.day, date-drop-down .date.month, date-drop-down .date.year{border-right:1.5px solid black !important;
		}


	</style>

	<script>
		import './dropdown-calendar.tag';
		import dateDropDownTag from "./date-drop-down.js";
		dateDropDownTag.call(this, opts);
	</script>
</date-drop-down>