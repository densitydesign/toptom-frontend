<bread-crumb>
	<span class="nopointer level">TOPTOM</span>
	<ul>
		<li each={item, i in breadcrumbItems}>
			<svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
					<path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/>
					<path d="M0-.25h24v24H0z" fill="none"/>
			</svg>
			<span class="level uppercase hvr-underline-from-left" onclick={changeView}>{label(item)}</span>
		</li>
	</ul>


	<style>
		:scope {
			display: flex;
			align-items:center;
			margin-left: 30px;
		}
		:scope > span:first-child {
			margin-right: 35px;
			color: var(--text-color-light);
		}
		ul {
			list-style: none;
			display: flex;
			align-items:center;
			margin: 0;
			padding: 0;
		}

		ul > li:first-child > svg {
			display: none;
		}

		li {
			margin-right: 15px;
			display: flex;
			align-items:center;
		}

		span {
			font-weight: 800;
		}

		span.level {
			cursor: pointer;
		}
		span.nopointer {
			cursor: default;
			font-weight: 800;
		}

		.bold {
			text-transform: uppercase;
		}
		svg {
			fill: var(--text-color);
			margin-right: 15px;
		}

		.uppercase {
			text-transform: uppercase;
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
  margin-top:10%;
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
  right:0;
}

	</style>

	<script>
		import breadCrumbTag from './bread-crumb.js';
		breadCrumbTag.call(this, opts);
	</script>
</bread-crumb>
