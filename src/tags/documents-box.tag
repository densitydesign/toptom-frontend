<documents-box class="{open: isActive}">
	<section class="container">
		<header class="documents-header">
			<h1>Cluster number {nodeId}</h1>
			<button onClick={closeDocumentsBox}>
				<svg fill="#000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
						<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
						<path d="M0 0h24v24H0z" fill="none"/>
				</svg>
			</button>
		</header>
		<div class="documents-container">
			<p class="documents-description {hidden: !isSubIntervalSelected}" >Top 20 documents between {subIntervalBegin} and {subIntervalEnd}</p>
			<ul class="documents-list">
				<li class="document" each={item, i in documents}><a href="{item.url}" target="_blank">{item.text}</a></li>
			</ul>
		</div>
	</section>

	<style>
		:scope {
			position: absolute;
			z-index: 1000;
			visibility: hidden;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 100%;
			background: rgba(255, 255, 255, 0.5);
		}
		:scope.open {
			visibility: visible;
		}
		.container {
			display: flex;
			flex-direction: column;
			height: var(--documents-height);
			width: var(--documents-width);
			background: var(--documents-background);
			border: 1.5px solid black;
			overflow: hidden;
		}
		.documents-description {
			padding-left: 30px;
		}
		.hidden {
			display: none;
		}
		.documents-header {
			flex: 0 0 auto;
			display: flex;
			justify-content: space-between;
			align-items: center;
			color:black;
		}
		.documents-header > h1 {
			padding-left: 30px;
		}
		.documents-header > button {
			background: transparent;
			border: 0;
			padding-right: 30px;
			cursor: pointer;
		}
		.documents-container {
			flex: 1 1 auto;
			overflow: scroll;
		}
		.documents-list {
			list-style: none;
			margin: 0;
			padding: 0;
			padding-left: 30px;
		}
		.documents-list li a{
			color:#7f9af6 !important;
		}
		.documents-list li a:hover{
			color:#999 !important;
			cursor: pointer;
		}
		.documents-list li a:focus{
			color:#3e3e74 !important;
		}

		.document {
			font-size: 1.1rem;
			font-weight: 400;
			padding: 10px 0 10px 0;
		}
		
	</style>

	<script>
		import documentsBoxTag from './documents-box.js';
		documentsBoxTag.call(this, opts);
	</script>
</documents-box>