<time-line class="{visible: isActive}">
	<svg riot-width={innerWidth} riot-height={innerHeight}>
		<g riot-transform={transform}>
			<g each={item, i in intervals} riot-transform={intervalTransform(i)} onclick={selectSubInterval}>
				<text riot-dx={intervalWidth / 2} dy="-10">{labels[i].top}</text>
				<rect
					riot-width={intervalWidth}
					height="10"
					style="fill: var(--anomaly-{item.anomaly}-color)"
					class="{selected: isSelected(i)}">
				</rect>
				<text riot-dx={intervalWidth / 2} dy="30">{labels[i].bottom}</text>
			</g>
		</g>
	</svg>

	<style>
		:scope {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: var(--time-line-height);
			width: var(--time-line-width);
			visibility: hidden;
		}
		rect {
			stroke-width: 1.5px;
			stroke: #000;
		}


		rect.selected,
		rect:hover {
			fill: #000 !important;
			cursor: pointer;
		}

		text {
			font-size: 0.9rem;
			font-weight: 600;
			text-anchor: middle;
		}

	</style>

	<script>
		import timeLineTag from './time-line.js';
		timeLineTag.call(this, opts);
	</script>
</time-line>