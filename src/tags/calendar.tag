<calendar class="calendar">
	<header class="calendar-header">
		<p>{monthAndYear}</p>
		<div class="controls">
			<button class="hvr-underline-from-right" onclick={goToPreviousMonth}>
				<svg fill="#000000" height="30" viewBox="0 0 24 24" width="40" xmlns="http://www.w3.org/2000/svg">
						<path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
						<path d="M0 0h20v20H0z" fill="none"/>
				</svg>
			</button>
			<button onclick={goToNextMonth} class="hvr-underline-from-left">
				<svg fill="#000000" height="30" viewBox="0 0 24 24" width="40" xmlns="http://www.w3.org/2000/svg">
						<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
						<path d="M0 0h24v24H0z" fill="none"/>
				</svg>
			</button>
		</div>
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
				<li class="calendar-day" each={item, i in days} onclick={openDayInAgenda}>
					<svg>
						<g riot-transform="translate({centerWidth}, {centerHeight})">
							<path class="anomaly-path twitter-anomaly" d={twitterAnomalyPath(item.date)}></path>
							<path class="anomaly-path gdelt-anomaly" d={gdeltAnomalyPath(item.date)}></path>
							<path class="anomaly-path reddit-anomaly" d={redditAnomalyPath(item.date)}></path>
						</g>
					</svg>
					{item.day}
				</li>
			</ul>
		<div>
	</div>

	<style>
		:scope {
			flex-grow: 0;
			display: flex;
			flex-direction: column;
			height: 580px;
		}

		.calendar-header {
			display: flex;
			justify-content: space-between;
		}

		.week {
			max-width: calc(var(--calendar-cell-width) * 7);
		}

		.week > li {
			width: var(--calendar-cell-width);
			height: var(--calendar-cell-height);
			cursor: pointer;
			font-weight: 400;
		}

		.calendar-day > svg {
			position: absolute;
			width: var(--calendar-cell-width);
			height: var(--calendar-cell-height);
		}

		.anomaly-path {
			fill: none;
			stroke-width: 1.5px;
			stroke-linejoin: round;
			mix-blend-mode: darken;
		}

		.twitter-anomaly {
			stroke: var(--twitter-color);
		}

		.gdelt-anomaly {
			stroke: var(--gdelt-color);
		}

		.reddit-anomaly {
			stroke: var(--reddit-color);
		}

		.calendar-header > h1 {
			font-size: 4rem;
			font-weight: 800;
			letter-spacing: 0.02em;
		}


/* Underline From Left */
.hvr-underline-from-left {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px transparent;
  position: relative;
  overflow: hidden;
}
.hvr-underline-from-left:before {
  content: "";
  position: absolute;
  z-index: -1;
  left: 0;
  right: 100%;
  bottom: 0;
  background: #000;
  height: 2px;
  -webkit-transition-property: right;
  transition-property: right;
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
}
.hvr-underline-from-left:hover:before, .hvr-underline-from-left:focus:before, .hvr-underline-from-left:active:before {
  right: 10px;
  left: 10px;
}

/* Underline From Right */
.hvr-underline-from-right {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px transparent;
  position: relative;
  overflow: hidden;
}
.hvr-underline-from-right:before {
  content: "";
  position: absolute;
  z-index: -1;
  left: 100%;
  right: 0;
  bottom: 0;
  background: #000;
  height: 2px;
  -webkit-transition-property: left;
  transition-property: left;
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
}
.hvr-underline-from-right:hover:before, .hvr-underline-from-right:focus:before, .hvr-underline-from-right:active:before {
  right: 10px;
  left: 10px;
}


</style>

	<script>
		import calendarTag from './calendar.js';
		calendarTag.call(this, opts);
	</script>
</calendar>