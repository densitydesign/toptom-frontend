<agenda class="{open: isActive}">
	<header class="agenda-header">
		<h1>{day}</h1>
	</header>
	<ul class="agenda-hours">
		<li class="agenda-hour" each={item, i in anomalies}>
			<p class="hour">{item.hour}:00</p>
			<ul class="hourly-vertices">
				<li each={anomaly, j in item.anomalies.slice(0, 3)}>
					<button class="hvr-float" style="border-color: var(--{anomaly.source}-color)" onclick={goToNodeInContextView}>{anomaly.name || anomaly.keyword}</button> <!-- FIXME on returned data, keyword or name not both -->
				<li>
			</ul>
		</li>
	</ul>

	<style>
		:scope {
			display: none;
			flex-direction: column;
			height: 570px;
			width: 322px;
		}

		:scope.open {
			display: flex;
			margin-left:100px;
		}

		.agenda-header {
			display: flex;
			justify-content: center;
		}
		.agenda-header > h1 {
			font-weight: 800;
			font-size: 2rem;
			padding-left: 70px;
		}
		.agenda-hours {
			list-style: none;
			margin: 0;
			padding: 0;
		}
		.agenda-hour {
			display: flex;
			align-items: center;
		}
		.hourly-vertices {
			margin: 0;
			padding: 0;
			list-style: none;
			flex: 1;
			display: flex;
			border-bottom: 1.5px solid black;
		}

		.hourly-vertices li{
			padding-bottom:6px;
		}

		.hour {
			width: 50px;
			margin-right: 20px;
			flex: 0 0 auto;
			text-align: right;
			font-size: 1.1rem;
			letter-spacing:0.01em;
		}
			.hourly-vertices button {
			width: 80px;
			height: 25px;
			background: white;
			border: 2px solid black;
			margin: 0 2px 2px 2px;
			flex: 0 0 auto;
			font-size: 0.7rem;
			text-transform: uppercase;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

					/* Float */
			.hvr-float {
			  display: inline-block;
			  vertical-align: middle;
			  -webkit-transform: perspective(1px) translateZ(0);
			  transform: perspective(1px) translateZ(0);
			  box-shadow: 0 0 1px transparent;
			  -webkit-transition-duration: 0.3s;
			  transition-duration: 0.3s;
			  -webkit-transition-property: transform;
			  transition-property: transform;
			  -webkit-transition-timing-function: ease-out;
			  transition-timing-function: ease-out;
			}
			.hvr-float:hover, .hvr-float:focus, .hvr-float:active {
			  -webkit-transform: translateY(-3px);
			  transform: translateY(-3px);
			  font-weight: 800;
}


		.calendar button{
			background-color: white;
		}

		.calendar{
			background-color:#fafbff;
		}
		

	</style>

	<script>
		import agendaTag from './agenda.js';
		agendaTag.call(this, opts);
	</script>
</agenda>