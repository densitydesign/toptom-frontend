<calendar-view class="main-view {visible: isActive}">
	<!--<button onclick={changeView}>Go to anomalous context</button>-->
	<div class="vertex-type-buttons-container">
		<button class="button vertex-type-button {selected: isVertexTypeEntity} hvr-fade" onclick={changeVertexTypeToEntity}>entities</button>
		<button class="button vertex-type-button {selected: isVertexTypeKeyword} hvr-fade" onclick={changeVertexTypeToKeyword}>keywords</button>
	</div>
	<div class="sources-buttons-container">
		<label class="gdelt-label">
			<button class="button source-button {selected: isSourceGdeltSelected}" onclick={toggleGdelt}>
			</button>
			gdelt
		</label>
		<label class="twitter-label">
			<button class="button source-button {selected: isSourceTwitterSelected}" onclick={toggleTwitter}>
			</button>
			twitter
		</label>
		<label class="reddit-label">
			<button class="button source-button {selected: isSourceRedditSelected}" onclick={toggleReddit}>
			</button>
			reddit
		</label>
	</div>
	<div class="calendar-container">
		<calendar store={opts.store}></calendar>
		<agenda store={opts.store}></agenda>
	</div>

	<style>
		:scope {
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
		}

		.tool-bar {
	border-bottom: 1px solid rgba(0,0,0,.1);
}

		.button {
			border: 2px solid var(--text-color);
			background: #fafbff;
		}

		.calendar .calendar-header {
			font-size: 2rem;
			font-weight: 800;
			letter-spacing: 0.02em;
		}

		.vertex-type-buttons-container {
			display: flex;
			width: 100%;
			margin-left:50px;
			margin-top:30px;
		}
		.vertex-type-button {
			display: block;
			width: 110px;
			padding: 7px 10px 7px 10px;
			text-transform: uppercase;
			font-weight: 600;
			font-size: 0.9rem;
			margin: 0;
		}
		.vertex-type-button:last-child {
			margin-left: -2px;
		}
		.sources-buttons-container {
			width: 220px;
			margin-left: 50px;
			margin-top: 30px;
			display: flex;
			flex-direction: column;
		}
		.sources-buttons-container > label {
			text-transform: uppercase;
			font-weight: 600;
			font-size: inherit;
			vertical-align: middle;
		}

		.sources-buttons-container .selected {
			background-color: black;
			color:white;
		}
		/*.source-button {
			width: 20px;
			height: 20px;
			margin: 10px 10px 10px 0;	
		}

		.source-button:before{
			border:5px solid white;
		}*/

		.source-button {
 		width: 20px;
  		height: 20px;
  		background: #fff;
  		position: relative;
 		border: 2px solid black;  
  		margin: 10px 10px 10px 0;	
  		border-radius:10px;
		}

		.source-button:after {
  		content: '';
  		position: absolute;
  		top: 0px;
  		left: 0px;
  		right: 0px;
  		bottom: 0px;
  		z-index:999;
  		border: 2px solid #fafbff;
  		border-radius:10px;
		}


		.calendar-container {
		flex-grow: 0.6;
		display: flex;
		justify-content: center;
		flex-wrap: nowrap;
		align-items: center;
		}

		.selected {
		background-color: black;
		color:white;
		}

		.gdelt-label {
			color: var(--gdelt-color);
		}

		.twitter-label {
			color: var(--twitter-color);
		}

		.reddit-label {
			color: var(--reddit-color);
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
		import './calendar.tag';
		import './agenda.tag';
		import calendarViewTag from './calendar-view.js';
		calendarViewTag.call(this, opts);
	</script>
</calendar-view>