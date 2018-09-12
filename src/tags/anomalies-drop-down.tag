<anomalies-drop-down>
	<h1>Anomalies</h1>
	<div class="dropdown">
		<div>
			<p>{currentAnomaly}</p>
			<button onclick={toggleAnomalyDropdown}>
				<svg class="{hidden: !isAnomalyDropdownClosed}" fill="#000000" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
						<path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/>
						<path d="M0 0h24v24H0z" fill="none"/>
				</svg>
				<svg class="{hidden: isAnomalyDropdownClosed}" fill="#000000" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
						<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
						<path d="M0 0h24v24H0z" fill="none"/>
				</svg>
			</button>
		</div>
		<ul class="row {hidden: isAnomalyDropdownClosed}">
			<li class="row hrv-fade {hidden: isCurrentAnomaly('')}" onclick={selectAnomaly('')}>
				<span>{anomalyName('')}</span>
			</li>
			<li class="row {hidden: isCurrentAnomaly('volume_increase')}" onclick={selectAnomaly('volume_increase')}>
				<span>{anomalyName('volume_increase')}</span>
			</li>
			<li class="row {hidden: isCurrentAnomaly('volume_decrease')}" onclick={selectAnomaly('volume_decrease')}>
				<span>{anomalyName('volume_decrease')}</span>
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
			width: var(--anomalies-drop-down-width);
		}

		.dropdown li.row:hover {
			cursor:pointer;
		}

		.dropdown li:hover {
			cursor:pointer;
		}

				/* Fade */
		.hvr-fade {
		  display: inline-block;
		  vertical-align: middle;
		  -webkit-transform: perspective(1px) translateZ(0);
		  transform: perspective(1px) translateZ(0);
		  box-shadow: 0 0 1px transparent;
		  overflow: hidden;
		  -webkit-transition-duration: 0.3s;
		  transition-duration: 0.3s;
		  -webkit-transition-property: color, background-color;
		  transition-property: color, background-color;
		}
		.hvr-fade:hover, .hvr-fade:focus, .hvr-fade:active {
		  background-color: rgba(0,0,0,.8);
		  color: white;
		}


	</style>

	<script>
		import anomaliesDropDownTag from "./anomalies-drop-down.js";
		anomaliesDropDownTag.call(this, opts);
	</script>
</anomalies-drop-down>