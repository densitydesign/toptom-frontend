<dropdown-calendar class="calendar">
	<header class="calendar-header">
		<button onclick={goToPreviousMonth}>
			<svg fill="#000000" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
					<path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
					<path d="M0 0h24v24H0z" fill="none"/>
			</svg>
		</button>

		<p>{month}</p>

		<button onclick={goToNextMonth}>
			<svg fill="#000000" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
					<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
					<path d="M0 0h24v24H0z" fill="none"/>
			</svg>
		</button>
		
		<button class="hours-control {inactive: inactive}" onclick={subtractHour} disabled={inactive}>
			<svg fill="#000000" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
					<path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
					<path d="M0 0h24v24H0z" fill="none"/>
			</svg>
		</button>
		<p class={inactive: inactive}>{hours}</p>
		<button onclick={addHour} disabled={inactive} class={inactive: inactive}>
			<svg fill="#000000" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
					<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
					<path d="M0 0h24v24H0z" fill="none"/>
			</svg>
		</button>
	</header>
	<div>
		<header class="day-names">
			<ul class="week">
				<li>S</li>
				<li>M</li>
				<li>T</li>
				<li>W</li>
				<li>T</li>
				<li>F</li>
				<li>S</li>
			<ul>
		</header>
		<div>
			<ul class="week">
				<li each={item, i in days} onclick={changeDate}>{item.day}</li>
			</ul>
		<div>
	</div>

	<style>
		:scope{
			display: flex;
			flex-direction: column;
		}
		div {
			flex-direction: column;
			background-color: white;
		}
		.calendar-header p {
			font-size: 0.9rem;
			padding: 2px 1px 2px 1px;
		}
		.control {
			display: flex;
		}
		.week {
			max-width: calc(var(--dropdown-calendar-cell-width) * 7) !important;
		}

		.week > li {
			width: var(--dropdown-calendar-cell-width) !important;
			height: var(--dropdown-calendar-cell-height) !important;
			border: 0;
		}

		.calendar-header > button:first-child {
			padding-left: 0px !important;
		}

		.calendar header svg{
			padding-bottom:10%;
		}

		
		.calendar header {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
		}

		.calendar header .week{
			border-bottom:none;
		}


		.calendar ul {
			position: relative;
			top: 0;
			list-style: none;
			padding: 0;
			margin: 0;
		}
		.calendar button {
			border: 0;
		}
		.calendar .week {
			display: flex;
			flex-direction: row;
			align-items: flex-start;
			flex-wrap: wrap;
		}

		.calendar .week > li {
			flex: 0 0 auto;
			display: flex;
			justify-content: center;
			align-items: center;
			font-weight: 400;
		}
		.calendar .day-names li {
			color: var(--text-color-light);
			border-bottom:none;
		}
		.dropdown .calendar .calendar-header {
			font-size: 2rem;
			font-weight: 600;
			letter-spacing: 0.05em;
			background-color: white;
			border-bottom:1.5px solid black;
			padding:5%;
		}
		.calendar .calendar-header > button:first-child {
			padding-left: 20px;
		}

		.calendar .calendar-header {
			font-size: 2rem;
			font-weight: 300;
			letter-spacing: 0.02em;
		}

		.inactive {
		opacity: 0.5;
		}


	</style>

	<script>
		import dropdownCalendarTag from './dropdown-calendar.js';
		dropdownCalendarTag.call(this, opts);
	</script>
</dropdown-calendar>